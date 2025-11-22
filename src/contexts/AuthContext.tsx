import type { Models } from 'appwrite'
import {
  createContext,
  useCallback,
  useEffect,
  useState,
  type ReactNode,
} from 'react'
import { account, db } from '../shared/appwrite'
import { post } from '../api/client'
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

    if (!DB_ID || !COLLECTION_USERS) {
      console.warn('Database config missing')
      return null
    }

    try {
      const response = await db.listDocuments(DB_ID, COLLECTION_USERS)
      const userDoc = response.documents.find((doc: Models.Document) => {
        const d = doc as any
        return d.email === email
      }) as UserData | undefined

      return userDoc ?? null
    } catch (error) {
      console.error('Error fetching user data:', error)
      return null
    }
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

  async function login(email: string, password: string) {
    try {
      const res = await post('https://uppath.onrender.com/login', {
        email,
        password,
      })

      const r = res as any
      const token =
        r?.token ?? r?.accessToken ?? r?.access_token ?? null

      const externalUser = r?.user ?? r?.data ?? null

      if (token) {
        localStorage.setItem('authToken', String(token))
      }

  
      await account.createEmailPasswordSession(email, password)

      const currentUser = await account.get()
      setUser(currentUser)

      const data = await fetchUserData(email)
      setUserData(data ?? externalUser ?? null)

    } catch (err) {
      throw err
    }
  }

  async function logout() {
    try {
      await account.deleteSession('current')
    } catch {}

    localStorage.removeItem('authToken')

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
