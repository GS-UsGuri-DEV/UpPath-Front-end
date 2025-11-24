export type ApiResponse<T> = {
  success: boolean
  data: T
  message?: string
  error?: string
}

export type BemEstarEntry = {
  data_registro: string
  nivel_estresse: number
  nivel_motivacao: number
  qualidade_sono: number
}

export type Trilha = {
  nome_trilha: string
  progresso_percentual: number
  status: string
}

export type Recomendacao = {
  tipo: string
  id_referencia: number
  motivo: string
  data_recomendacao: string
}

export type UserDashboard = {
  id_usuario: number
  bem_estar: BemEstarEntry[]
  trilhas: Trilha[]
  recomendacoes: Recomendacao[]
}
