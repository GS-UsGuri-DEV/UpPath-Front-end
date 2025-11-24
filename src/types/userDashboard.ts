/**
 * Tipos para dados do dashboard do usuário
 * @module types/userDashboard
 */

// Re-exporta tipos compartilhados para evitar duplicação
export type { Recomendacao, Trilha } from './graphicsDashboard'
import type { Recomendacao, Trilha } from './graphicsDashboard'

/**
 * Wrapper genérico para respostas da API
 * Padroniza estrutura de sucesso/erro
 * @template T - Tipo dos dados retornados
 * @example
 * const response: ApiResponse<UserDashboard> = {
 *   success: true,
 *   data: { id_usuario: 1, bem_estar: [...], ... }
 * }
 */
export type ApiResponse<T> = {
  /** Indica se a requisição foi bem-sucedida */
  success: boolean
  /** Dados retornados pela API */
  data: T
  /** Mensagem de sucesso (opcional) */
  message?: string
  /** Mensagem de erro (opcional) */
  error?: string
}

/**
 * Registro individual de bem-estar do usuário
 * Criado diariamente através do questionário
 * @example
 * const entry: BemEstarEntry = {
 *   data_registro: '2024-11-24',
 *   nivel_estresse: 7,
 *   nivel_motivacao: 6,
 *   qualidade_sono: 5
 * }
 */
export type BemEstarEntry = {
  /** Data do registro (formato YYYY-MM-DD) */
  data_registro: string
  /** Nível de estresse (escala 0-10) */
  nivel_estresse: number
  /** Nível de motivação (escala 0-10) */
  nivel_motivacao: number
  /** Qualidade do sono (escala 0-10) */
  qualidade_sono: number
}

/**
 * Dados completos do dashboard do usuário
 * Agregação de todas as informações exibidas na tela inicial
 * @example
 * const dashboard: UserDashboard = {
 *   id_usuario: 123,
 *   bem_estar: [{ data_registro: '2024-11-24', ... }],
 *   trilhas: [{ nome_trilha: 'Full Stack', ... }],
 *   recomendacoes: [{ tipo: 'curso', ... }]
 * }
 */
export type UserDashboard = {
  /** ID do usuário proprietário do dashboard */
  id_usuario: number
  /** Histórico de registros de bem-estar */
  bem_estar: BemEstarEntry[]
  /** Trilhas de aprendizado ativas (re-usa tipo de graphicsDashboard) */
  trilhas: Trilha[]
  /** Recomendações personalizadas (re-usa tipo de graphicsDashboard) */
  recomendacoes: Recomendacao[]
}
