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
          const full = await get(`https://uppath.onrender.com/users/${id}`, headers)
          const normalized = { ...(full as any), id: id }
          return normalized as UserData
        } catch (e) {
          console.warn('Could not fetch full user by id, returning first match', e)
          const normalizedFirst = { ...first, id }
          return normalizedFirst as UserData
        }
      }

      return {
      ...first,
      id: first.idUser ?? null
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

  async function login(emailOrCpfCnpj: string, password: string) {
    let loginEmail = emailOrCpfCnpj

    // Se não for email, busca o email correspondente ao CPF/CNPJ
    if (!emailOrCpfCnpj.includes('@')) {
      const DB_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID
      const COLLECTION_USERS = import.meta.env.VITE_APPWRITE_COLLECTION_USERS
      const COLLECTION_COMPANIES = import.meta.env
        .VITE_APPWRITE_COLLECTION_COMPANIES
      const cpfCnpjClean = emailOrCpfCnpj.replace(/\D/g, '')

      try {
        // Busca em usuários
        const responseUsers = await db.listDocuments(DB_ID, COLLECTION_USERS)
        console.log('--- Usuários encontrados ---')
        responseUsers.documents.forEach((doc) => {
          const d = doc as unknown as Record<string, unknown>
          console.log({
            email: d.email,
            cpf: d.cpf,
            cpf_normalizado:
              typeof d.cpf === 'string' ? d.cpf.replace(/\D/g, '') : d.cpf,
          })
        })
        console.log('Buscando por CPF/CNPJ:', cpfCnpjClean)
        const userDoc = responseUsers.documents.find((doc) => {
          const d = doc as unknown as Record<string, unknown>
          return (
            d.cpf &&
            typeof d.cpf === 'string' &&
            d.cpf.replace(/\D/g, '') === cpfCnpjClean
          )
        })

        if (userDoc) {
          const userData = userDoc as unknown as Record<string, unknown>
          loginEmail = userData.email as string
        } else if (COLLECTION_COMPANIES) {
          // Busca em empresas
          const responseCompanies = await db.listDocuments(
            DB_ID,
            COLLECTION_COMPANIES,
          )
          console.log('--- Empresas encontradas ---')
          responseCompanies.documents.forEach((doc) => {
            const d = doc as unknown as Record<string, unknown>
            console.log({
              email_contato: d.email_contato,
              cnpj: d.cnpj,
              cnpj_normalizado:
                typeof d.cnpj === 'string' ? d.cnpj.replace(/\D/g, '') : d.cnpj,
            })
          })
          const companyDoc = responseCompanies.documents.find((doc) => {
            const d = doc as unknown as Record<string, unknown>
            return (
              d.cnpj &&
              typeof d.cnpj === 'string' &&
              d.cnpj.replace(/\D/g, '') === cpfCnpjClean
            )
          })

          if (companyDoc) {
            const companyData = companyDoc as unknown as Record<string, unknown>
            loginEmail = companyData.email_contato as string
          } else {
            throw new Error('CPF/CNPJ não encontrado')
          }
        } else {
          throw new Error('CPF não encontrado')
        }
      } catch (error) {
        throw new Error('CPF/CNPJ não encontrado')
      }
    }

    try {
      const res = await post('https://uppath.onrender.com/login', {
        email,
        password,
      })

      const r = res as any
      const token = r?.token ?? r?.accessToken ?? r?.access_token ?? null

      if (token) {
        localStorage.setItem('authToken', String(token))
        try {
          const minimal = { email }
          localStorage.setItem('userData', JSON.stringify(minimal))
        } catch {

        }
      }
      let data: any = null
      try {
        data = await fetchUserData(email)
      } catch (e) {
      }

      

      if (data) {
      const normalized = {
        id: data.idUser,
        name: data.name,
        email: data.email,
        birthDate: data.birthDate,
        occupation: data.occupation,
        nivelCarreira: data.nivelCarreira,
        gender: data.gender,
        admin: data.admin === 1,
        idEmpresa: data.idEmpresa ?? null,
        dateRegistered: data.dateRegistered ?? null,
      }

      localStorage.setItem('userData', JSON.stringify(normalized))

      const su: SimpleUser = {
        name: normalized.name,
        email: normalized.email,
      }

      setUser(su)
      setUserData(normalized)
      }

    } catch (err) {
      throw err
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
