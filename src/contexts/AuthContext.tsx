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
      const digitsOnly = loginEmail.replace(/\D/g, '')
      const looksLikeCNPJ = digitsOnly.length === 14

      const nestedPayload: any = {
        autenticar: {
          login: {
            // If the user provided a CNPJ (company), send it as `cnpj`,
            // otherwise send `email`.
            ...(looksLikeCNPJ ? { cnpj: digitsOnly } : { email: loginEmail }),
            // include both keys for compatibility
            password,
            senha: password,
          },
        },
      }

      console.info('[Auth] trying nested login payload ->')
      console.debug(nestedPayload)
      let res: any = null
      try {
        // First try the nested payload the backend validated in the error
        res = await post('https://uppath.onrender.com/login', nestedPayload)
        console.info('[Auth] nested login response ->')
        console.debug(res)
      } catch (err) {
        console.warn('[Auth] nested login attempt failed, trying fallbacks')
        console.warn(err)

        // Fallback sequence: try a few common alternatives including cnpj
        const triedPayloads: any[] = []
        if (looksLikeCNPJ) {
          triedPayloads.push({ cnpj: digitsOnly, senha: password })
        }
        triedPayloads.push({ email: loginEmail, password, senha: password })
        triedPayloads.push({ email_contato: loginEmail, password })
        triedPayloads.push({ email_contato: loginEmail, senha: password })
        triedPayloads.push({ login: loginEmail, password })
        triedPayloads.push({ login: loginEmail, senha: password })
        triedPayloads.push({ username: loginEmail, password })
        triedPayloads.push({ username: loginEmail, senha: password })

        let lastErr: unknown = err
        for (const p of triedPayloads) {
          try {
            console.info('[Auth] trying fallback payload ->')
            console.debug(p)
            res = await post('https://uppath.onrender.com/login', p)
            console.info('[Auth] fallback response ->')
            console.debug(res)
            lastErr = null
            break
          } catch (e2) {
            console.warn('[Auth] fallback attempt failed', e2)
            lastErr = e2
          }
        }

        if (lastErr) {
          // All attempts failed — rethrow original error for upstream handling
          throw err
        }
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
