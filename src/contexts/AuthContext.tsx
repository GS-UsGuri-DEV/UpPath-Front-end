import type { Models } from 'appwrite'
import {
  createContext,
  useCallback,
  useEffect,
  useState,
  type ReactNode,
} from 'react'
import { account, db } from '../shared/appwrite'
import type { AuthContextType, UserData } from '../types/auth'

const AuthContext = createContext<AuthContextType | undefined>(undefined)
export { AuthContext }

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<Models.User<Models.Preferences> | null>(null)
  const [userData, setUserData] = useState<UserData | null>(null)
  const [loading, setLoading] = useState(true)

  async function fetchUserData(email: string) {
    const DB_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID
    const COLLECTION_USERS = import.meta.env.VITE_APPWRITE_COLLECTION_USERS
    const COLLECTION_COMPANIES = import.meta.env
      .VITE_APPWRITE_COLLECTION_COMPANIES

    if (!DB_ID || !COLLECTION_USERS) {
      console.warn('Database config missing')
      return null
    }

    try {
      // Primeiro tenta buscar na collection de usuários
      const responseUsers = await db.listDocuments(DB_ID, COLLECTION_USERS)
      const userDoc = responseUsers.documents.find((doc: Models.Document) => {
        const d = doc as unknown as Record<string, unknown>
        return typeof d.email === 'string' && d.email === email
      }) as UserData | undefined

      if (userDoc) {
        return { ...userDoc, tipo_conta: 'usuario' }
      }

      // Se não encontrou em usuários, busca em empresas
      if (COLLECTION_COMPANIES) {
        const responseCompanies = await db.listDocuments(
          DB_ID,
          COLLECTION_COMPANIES,
        )
        const companyDoc = responseCompanies.documents.find(
          (doc: Models.Document) => {
            const d = doc as unknown as Record<string, unknown>
            return (
              typeof d.email_contato === 'string' && d.email_contato === email
            )
          },
        ) as UserData | undefined

        if (companyDoc) {
          return { ...companyDoc, tipo_conta: 'empresa' }
        }
      }
    } catch (error) {
      console.error('Error fetching user data:', error)
    }
    return null
  }

  const checkAuth = useCallback(async () => {
    try {
      const currentUser = await account.get()
      setUser(currentUser)
      const data = await fetchUserData(currentUser.email)
      setUserData(data)
    } catch {
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
      await account.createEmailPasswordSession(loginEmail, password)
    } catch (err) {
      const msg = String((err as Error)?.message ?? String(err ?? ''))
      if (
        msg.includes(
          'Creation of a session is prohibited when a session is active',
        )
      ) {
        await account.deleteSession('current')
        await account.createEmailPasswordSession(loginEmail, password)
      } else {
        throw err
      }
    }

    const currentUser = await account.get()
    setUser(currentUser)
    const data = await fetchUserData(loginEmail)
    setUserData(data)
    return data
  }

  async function logout() {
    await account.deleteSession('current')
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
