import {
  createContext,
  useCallback,
  useEffect,
  useState,
  type ReactNode,
} from 'react'
import { post, get } from '../api/client'
import type { AuthContextType, UserData, SimpleUser } from '../types/auth'

const AuthContext = createContext<AuthContextType | undefined>(undefined)
export { AuthContext }

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<SimpleUser | null>(null)
  const [userData, setUserData] = useState<UserData | null>(null)
  const [loading, setLoading] = useState(true)

  async function fetchUserData(email: string) {
    try {
      const token = localStorage.getItem('authToken')
      const headers = token ? { Authorization: `Bearer ${token}` } : undefined

      const res = await get(
        `https://uppath.onrender.com/users?email=${encodeURIComponent(email)}`,
        headers,
      )

      const r: any = res
      let items: any[] = []
      if (Array.isArray(r)) items = r
      else if (r?.data && Array.isArray(r.data)) items = r.data
      else if (r?.users && Array.isArray(r.users)) items = r.users
      else if (r) items = [r]

      if (items.length === 0) return null

      const lowerEmail = String(email ?? '').toLowerCase()
      const matcher = (it: any) => {
        if (!it) return false
        const candidates = [it.email]
        for (const c of candidates) {
          if (!c) continue
          if (String(c).toLowerCase() === lowerEmail) return true
        }
        return false
      }

      let first = items.find(matcher) ?? items[0]
      const id = first.idUser
      if (id != null) {
        try {
          const full = await get(
            `https://uppath.onrender.com/users/${id}`,
            headers,
          )
          const normalized = { ...(full as any), id: id }
          return normalized as UserData
        } catch (e) {
          console.warn(
            'Could not fetch full user by id, returning first match',
            e,
          )
          const normalizedFirst = { ...first, id }
          return normalizedFirst as UserData
        }
      }

      return {
        ...first,
        id: first.idUser ?? null,
      } as UserData
    } catch (error) {
      return null
    }
  }

  const checkAuth = useCallback(async () => {
    try {
      const token = localStorage.getItem('authToken')
      const stored = localStorage.getItem('userData')
      if (stored) {
        try {
          const parsed = JSON.parse(stored) as UserData
          setUserData(parsed)
          const su: SimpleUser = {
            name: (parsed as any)?.nome_completo ?? (parsed as any)?.name,
            email: (parsed as any)?.email ?? undefined,
          }
          setUser(su)
        } catch (e) {
          if (token) {
            setUser({ name: undefined, email: undefined })
            setUserData(null)
          } else {
            setUser(null)
            setUserData(null)
          }
        }
      } else if (token) {
        setUser({ name: undefined, email: undefined })
        setUserData(null)
      } else {
        setUser(null)
        setUserData(null)
      }
    } catch (e) {
      setUser(null)
      setUserData(null)
    } finally {
      setLoading(false)
    }
  }, [])

  async function login(emailOrCnpj: string, password: string) {
    // Only accept email + password for login. Do not attempt CNPJ mapping.
    const loginEmail = String(emailOrCnpj ?? '').trim()

    try {
      // Prepare compatibility payloads. The backend expects nested fields
      // under `autenticar.login.*` (see response violations), so try that
      // shape first, then fall back to other formats.
      // Sempre envia o payload aninhado com email e password, como o backend espera para empresa e usuário.
      const nestedPayload = {
        autenticar: {
          login: {
            email: loginEmail,
            password,
          },
        },
      }

      console.info('[Auth] login payload ->')
      console.debug(nestedPayload)
      let res: any = null
      try {
        res = await post('https://uppath.onrender.com/login', nestedPayload)
        console.info('[Auth] login response ->')
        console.debug(res)
      } catch (err) {
        // Se falhar, não tenta mais fallbacks — erro real do backend
        console.error('[Auth] login error ->', err)
        throw err
      }

      const r = res as any
      const token = r?.token ?? r?.accessToken ?? r?.access_token ?? null

      if (token) {
        localStorage.setItem('authToken', String(token))
        try {
          const minimal = { email: loginEmail }
          localStorage.setItem('userData', JSON.stringify(minimal))
        } catch (e) {
          console.warn('Could not persist minimal userData', e)
        }
      }
      let data: any = null
      try {
        data = await fetchUserData(loginEmail)
      } catch (e) {
        console.warn('fetchUserData failed', e)
      }

      let result: UserData | null = null

      if (data) {
        const normalized = {
          id: data.idUser,
          name: data.name,
          nome_completo: data.nome_completo ?? data.name ?? undefined,
          email: data.email,
          birthDate: data.birthDate,
          occupation: data.occupation,
          nivelCarreira: data.nivelCarreira,
          gender: data.gender,
          admin: data.admin === 1,
          idEmpresa: data.idEmpresa ?? null,
          dateRegistered: data.dateRegistered ?? null,
          // By default this is a user account; company logins go through the
          // fallback branch below which sets `tipo_conta: 'empresa'`.
          tipo_conta: 'usuario',
        }

        localStorage.setItem('userData', JSON.stringify(normalized))

        const su: SimpleUser = {
          name: normalized.name,
          email: normalized.email,
        }

        setUser(su)
        setUserData(normalized)
        result = normalized as unknown as UserData
      }

      return result
    } catch (err) {
      // Map common backend errors to user-friendly messages
      console.error('[Auth] login error ->', err)
      const message = err instanceof Error ? err.message : String(err)
      if (/401|unauthor/i.test(message)) {
        throw new Error('Email ou senha incorretos')
      }
      // If backend provided a message, forward it, otherwise generic
      throw new Error(message || 'Erro ao autenticar')
    }
  }

  async function logout() {
    localStorage.removeItem('authToken')
    localStorage.removeItem('userData')
    setUser(null)
    setUserData(null)
  }

  useEffect(() => {
    checkAuth()
  }, [checkAuth])

  return (
    <AuthContext.Provider
      value={{ user, userData, loading, login, logout, checkAuth }}
    >
      {children}
    </AuthContext.Provider>
  )
}
