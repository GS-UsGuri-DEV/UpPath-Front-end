import type { Models } from 'appwrite'

export type UserData = Models.Document & Record<string, unknown>

export interface AuthContextType {
  user: Models.User<Models.Preferences> | null
  userData: UserData | null
  loading: boolean
  login: (email: string, password: string) => Promise<void>
  logout: () => Promise<void>
  checkAuth: () => Promise<void>
}
export interface LoginFormData {
  email: string
  password: string
}

export interface CompanyFormData {
  id_empresa?: number | string
  nome_empresa: string
  cnpj: string
  email_contato: string
  data_cadastro?: string
}

export interface UserFormData {
  id_usuario?: number | string
  id_empresa?: number | string | null
  nome_completo: string
  cpf?: string
  email: string
  senha: string
  nivel_carreira?: string
  ocupacao?: string
  genero?: string
  data_nascimento?: string
  data_cadastro?: string
  is_admin?: boolean
}

export type SignupFormData =
  | ({ type: 'empresa' } & CompanyFormData)
  | ({ type: 'usuario' | 'admin' } & UserFormData & {
        senha?: string
        confirmPassword?: string
      })
