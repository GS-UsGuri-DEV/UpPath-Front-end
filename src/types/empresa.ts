// Types for company dashboard

export type Funcionario = {
  $id: string
  idUser?: number
  id?: number
  nome_completo: string
  name?: string
  email: string
  ocupacao?: string
  occupation?: string
  nivel_carreira?: string
  nivelCarreira?: string
  data_cadastro: string
  dateRegistered?: string
  id_empresa?: number
  idEmpresa?: number
}

export type BemEstarData = {
  id_usuario?: string
  idUser?: number
  id?: number
  nivel_estresse: number
  nivel_motivacao: number
  qualidade_sono: number
  data_registro?: string
  data?: string
  email?: string
}

export type EmpresaData = {
  $id?: string
  idEmpresa?: number
  id?: number
  nome_empresa: string
  name?: string
  cnpj: string
  email_contato?: string
  email?: string
  data_cadastro?: string
}

export type MediasBemEstar = {
  estresse: number
  motivacao: number
  sono: number
}

export type AppwriteDocument<T = Record<string, unknown>> = T & {
  $id: string
  $collectionId: string
  $databaseId: string
  $createdAt: string
  $updatedAt: string
  $permissions: string[]
}

export type AppwriteListResponse<T = Record<string, unknown>> = {
  total: number
  documents: Array<AppwriteDocument<T>>
}
