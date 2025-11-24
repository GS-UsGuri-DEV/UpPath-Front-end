// API response types
export type ApiHeaders = Record<string, string>

export type ApiErrorResponse = {
  error?: string
  message?: string
  status?: number
  statusText?: string
}

export type LoginResponse = {
  token?: string
  accessToken?: string
  access_token?: string
  user?: UserResponse
  data?: unknown
}

export type UserResponse = {
  idUser?: number
  id?: number
  name?: string
  nome_completo?: string
  email?: string
  birthDate?: string
  data_nascimento?: string
  occupation?: string
  ocupacao?: string
  nivelCarreira?: string
  nivel_carreira?: string
  gender?: string
  genero?: string
  admin?: number | boolean
  idEmpresa?: number | null
  id_empresa?: number | null
  dateRegistered?: string
  data_cadastro?: string
  senha?: string
  cpf?: string
}

export type EmpresaResponse = {
  idEmpresa?: number
  id?: number
  name?: string
  nome_empresa?: string
  cnpj?: string
  email?: string
  email_contato?: string
  senha?: string
  data_cadastro?: string
}

export type NormalizedUser = {
  id: number
  name: string
  nome_completo?: string
  email: string
  birthDate?: string
  occupation?: string
  nivelCarreira?: string
  gender?: string
  admin: boolean
  idEmpresa: number | null
  dateRegistered: string | null
  tipo_conta: 'usuario' | 'empresa'
}

export type NormalizedEmpresa = {
  idEmpresa: number
  name: string
  cnpj: string
  email: string
  tipo_conta: 'empresa'
  admin: boolean
}
