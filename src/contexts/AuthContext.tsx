import { createContext, useCallback, useEffect, useState, type ReactNode } from 'react'
import { get, post } from '../api/client'
import type { AuthContextType, SimpleUser, UserData } from '../types/auth'
import type { UserResponse, EmpresaResponse } from '../types/api'

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

      const r = res as
        | UserResponse
        | UserResponse[]
        | { data?: UserResponse[]; users?: UserResponse[] }
      let items: UserResponse[] = []
      if (Array.isArray(r)) {
        items = r
      } else if (r && 'data' in r && Array.isArray(r.data)) {
        items = r.data
      } else if (r && 'users' in r && Array.isArray(r.users)) {
        items = r.users
      } else if (r) {
        items = [r as UserResponse]
      }

      if (items.length === 0) {
        return null
      }

      const lowerEmail = String(email ?? '').toLowerCase()
      const matcher = (it: UserResponse) => {
        if (!it) {
          return false
        }
        const candidates = [it.email]
        for (const c of candidates) {
          if (!c) {
            continue
          }
          if (String(c).toLowerCase() === lowerEmail) {
            return true
          }
        }
        return false
      }

      const first = items.find(matcher) ?? items[0]
      if (!first) {
        return null
      }
      const id = first.idUser
      if (id != null) {
        try {
          const full = await get(`https://uppath.onrender.com/users/${id}`, headers)
          const normalized = { ...(full as UserResponse), id }
          return normalized as UserData
        } catch (_e) {
          // Could not fetch full user by id, returning first match
          const normalizedFirst = { ...first, id }
          return normalizedFirst as UserData
        }
      }

      return {
        ...first,
        id: first.idUser ?? null,
      } as UserData
    } catch (_error) {
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
          const parsedObj = parsed as Record<string, unknown>
          const su: SimpleUser = {
            name:
              (parsedObj?.nome_completo as string | undefined) ??
              (parsedObj?.name as string | undefined),
            email: (parsedObj?.email as string | undefined) ?? undefined,
          }
          setUser(su)
        } catch (_e) {
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
    } catch (_e) {
      setUser(null)
      setUserData(null)
    } finally {
      setLoading(false)
    }
  }, [])

  async function login(emailOrCnpj: string, password: string, tipo?: 'usuario' | 'empresa') {
    const identifier = String(emailOrCnpj ?? '').trim()

    // Detectar se é CNPJ (apenas números, 14 dígitos)
    const digitsOnly = identifier.replace(/\D/g, '')
    const isCNPJ = digitsOnly.length === 14
    const loginType = tipo ?? (isCNPJ ? 'empresa' : 'usuario')

    try {
      if (loginType === 'empresa' || isCNPJ) {
        // Backend não tem endpoint de login para empresas ainda
        // Solução temporária: validar credenciais localmente
        try {
          const empresasRes = await get('https://uppath.onrender.com/empresas')
          const empresas = Array.isArray(empresasRes) ? (empresasRes as EmpresaResponse[]) : []

          // Buscar empresa por CNPJ
          const empresa = empresas.find((e) => {
            const cnpjEmpresa = String(e.cnpj ?? '').replace(/\D/g, '')
            return cnpjEmpresa === digitsOnly
          })

          if (!empresa) {
            throw new Error('Empresa não encontrada. Verifique o CNPJ.')
          }

          // Validar senha (comparação direta pois backend não criptografa)
          if (empresa.senha !== password) {
            throw new Error('Senha incorreta.')
          }

          // Gerar token temporário (simulado localmente)
          const tempToken = btoa(`empresa:${empresa.idEmpresa}:${Date.now()}`)
          localStorage.setItem('authToken', tempToken)

          const userData = {
            idEmpresa: empresa.idEmpresa,
            name: empresa.name,
            cnpj: empresa.cnpj,
            email: empresa.email,
            tipo_conta: 'empresa' as const,
            admin: true,
          }

          localStorage.setItem('userData', JSON.stringify(userData))
          setUser({ name: empresa.name, email: empresa.email })
          setUserData(userData as unknown as UserData)

          return userData as unknown as UserData
        } catch (err) {
          throw err
        }
      } else {
        // Login de usuário usa email + password
        const endpoint = 'https://uppath.onrender.com/login'
        const payload = {
          email: identifier,
          password,
        }

        const res = await post(endpoint, payload)

        const r = res as Record<string, unknown>
        const token = r?.token ?? r?.accessToken ?? r?.access_token ?? null

        if (token) {
          localStorage.setItem('authToken', String(token))
        }

        // Fetch user data
        let data: UserData | null = null
        try {
          data = await fetchUserData(identifier)
        } catch (_e) {
          // fetchUserData failed
        }

        let result: UserData | null = null

        if (data) {
          const dataObj = data as Record<string, unknown>
          const normalized = {
            id: dataObj.idUser as number,
            name: dataObj.name as string,
            nome_completo:
              (dataObj.nome_completo as string | undefined) ??
              (dataObj.name as string | undefined) ??
              undefined,
            email: dataObj.email as string,
            birthDate: dataObj.birthDate as string | undefined,
            occupation: dataObj.occupation as string | undefined,
            nivelCarreira: dataObj.nivelCarreira as string | undefined,
            gender: dataObj.gender as string | undefined,
            admin: dataObj.admin === 1,
            idEmpresa: (dataObj.idEmpresa as number | undefined) ?? null,
            dateRegistered: (dataObj.dateRegistered as string | undefined) ?? null,
            tipo_conta: dataObj.admin === 1 ? ('empresa' as const) : ('usuario' as const),
          }

          localStorage.setItem('userData', JSON.stringify(normalized))

          const su: SimpleUser = {
            name: normalized.name,
            email: normalized.email,
          }

          setUser(su)
          setUserData(normalized)
          result = normalized as unknown as UserData
        } else {
          // If we can't fetch full user data, store minimal info
          const minimal = { email: identifier }
          localStorage.setItem('userData', JSON.stringify(minimal))
          setUser({ name: undefined, email: identifier })
        }

        return result
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err)

      // Check for common error patterns
      if (/401|unauthorized/i.test(message)) {
        throw new Error(
          loginType === 'empresa' ? 'CNPJ ou senha incorretos' : 'Email ou senha incorretos',
        )
      }
      if (/400|bad request/i.test(message)) {
        throw new Error('Dados de login inválidos. Verifique as informações.')
      }
      if (/404|not found/i.test(message)) {
        throw new Error(
          loginType === 'empresa' ? 'Empresa não encontrada' : 'Usuário não encontrado',
        )
      }

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
    <AuthContext.Provider value={{ user, userData, loading, login, logout, checkAuth }}>
      {children}
    </AuthContext.Provider>
  )
}
