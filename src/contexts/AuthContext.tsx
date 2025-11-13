import { createContext, useState, useEffect, useCallback, type ReactNode } from 'react';
import { account, db } from '../shared/appwrite';
import type { Models } from 'appwrite';

interface UserData {
  email: string;
  is_admin: boolean;
  id_empresa?: string | number | null;
  nome_completo?: string;
}

interface AuthContextType {
  user: Models.User<Models.Preferences> | null;
  userData: UserData | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  checkAuth: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export { AuthContext };

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<Models.User<Models.Preferences> | null>(null);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);

  async function fetchUserData(email: string) {
    const DB_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID;
    const COLLECTION_USERS = import.meta.env.VITE_APPWRITE_COLLECTION_USERS;

    if (!DB_ID || !COLLECTION_USERS) {
      console.warn('Database config missing');
      return null;
    }

    try {
      const response = await db.listDocuments(DB_ID, COLLECTION_USERS);
      interface UserDoc extends Models.Document {
        email: string;
        is_admin?: boolean;
        id_empresa?: string | number | null;
        nome_completo?: string;
      }
      const userDoc = response.documents.find((doc: Models.Document) => (doc as UserDoc).email === email) as UserDoc | undefined;

      if (userDoc) {
        return {
          email: userDoc.email,
          is_admin: userDoc.is_admin || false,
          id_empresa: userDoc.id_empresa,
          nome_completo: userDoc.nome_completo,
        };
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
    return null;
  }

  const checkAuth = useCallback(async () => {
    try {
      const currentUser = await account.get();
      setUser(currentUser);
      const data = await fetchUserData(currentUser.email);
      setUserData(data);
    } catch {
      setUser(null);
      setUserData(null);
    } finally {
      setLoading(false);
    }
  }, []);

  async function login(email: string, password: string) {
    await account.createEmailPasswordSession(email, password);
    const currentUser = await account.get();
    setUser(currentUser);
    const data = await fetchUserData(email);
    setUserData(data);
  }

  async function logout() {
    await account.deleteSession('current');
    setUser(null);
    setUserData(null);
  }

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  return (
    <AuthContext.Provider value={{ user, userData, loading, login, logout, checkAuth }}>
      {children}
    </AuthContext.Provider>
  );
}
