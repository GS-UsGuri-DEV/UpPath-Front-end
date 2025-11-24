/**
 * Tipos relacionados ao dashboard da empresa
 * @module types/empresa
 */

/**
 * Dados de um funcionário vinculado à empresa
 * Suporta campos em camelCase e snake_case para compatibilidade API/DB
 * @example
 * const funcionario: Funcionario = {
 *   $id: 'abc123',
 *   nome_completo: 'João Silva',
 *   email: 'joao@empresa.com',
 *   ocupacao: 'Desenvolvedor',
 *   nivel_carreira: 'Pleno',
 *   data_cadastro: '2024-01-15',
 *   id_empresa: 42
 * }
 */
export type Funcionario = {
  /** ID único do documento no Appwrite */
  $id: string
  /** ID numérico do usuário (formato legado) */
  idUser?: number
  /** ID do usuário (alternativo) */
  id?: number
  /** Nome completo do funcionário */
  nome_completo: string
  /** Nome (formato alternativo camelCase) */
  name?: string
  /** Email do funcionário */
  email: string
  /** Ocupação/cargo (snake_case) */
  ocupacao?: string
  /** Ocupação/cargo (camelCase) */
  occupation?: string
  /** Nível de carreira (snake_case): iniciante, júnior, pleno, sênior */
  nivel_carreira?: string
  /** Nível de carreira (camelCase) */
  nivelCarreira?: string
  /** Data de cadastro na plataforma */
  data_cadastro: string
  /** Data de registro (formato alternativo) */
  dateRegistered?: string
  /** ID da empresa vinculada (snake_case) */
  id_empresa?: number
  /** ID da empresa vinculada (camelCase) */
  idEmpresa?: number
}

/**
 * Registro de bem-estar de um funcionário
 * Métricas diárias coletadas via questionário
 * @example
 * const registro: BemEstarData = {
 *   id_usuario: 'user123',
 *   nivel_estresse: 7,
 *   nivel_motivacao: 6,
 *   qualidade_sono: 5,
 *   data_registro: '2024-11-24',
 *   email: 'user@example.com'
 * }
 */
export type BemEstarData = {
  /** ID do usuário (string do Appwrite) */
  id_usuario?: string
  /** ID do usuário (formato numérico) */
  idUser?: number
  /** ID alternativo */
  id?: number
  /** Nível de estresse (escala 0-10) */
  nivel_estresse: number
  /** Nível de motivação (escala 0-10) */
  nivel_motivacao: number
  /** Qualidade do sono (escala 0-10) */
  qualidade_sono: number
  /** Data do registro (snake_case) */
  data_registro?: string
  /** Data do registro (formato alternativo) */
  data?: string
  /** Email do usuário (para referência cruzada) */
  email?: string
}

/**
 * Dados da empresa
 * Informações cadastrais e de configuração
 * @example
 * const empresa: EmpresaData = {
 *   $id: 'empresa456',
 *   nome_empresa: 'Tech Corp Ltda',
 *   cnpj: '12345678901234',
 *   email_contato: 'contato@techcorp.com',
 *   data_cadastro: '2023-06-10'
 * }
 */
export type EmpresaData = {
  /** ID do documento no Appwrite */
  $id?: string
  /** ID numérico da empresa (snake_case) */
  idEmpresa?: number
  /** ID da empresa (alternativo) */
  id?: number
  /** Nome fantasia ou razão social */
  nome_empresa: string
  /** Nome (formato camelCase) */
  name?: string
  /** CNPJ com 14 dígitos (apenas números) */
  cnpj: string
  /** Email de contato corporativo (snake_case) */
  email_contato?: string
  /** Email (formato curto) */
  email?: string
  /** Data de cadastro na plataforma */
  data_cadastro?: string
}

/**
 * Médias agregadas de bem-estar da empresa
 * Calculadas a partir de todos os registros dos funcionários
 * Usadas em dashboards executivos e relatórios
 * @example
 * const medias: MediasBemEstar = {
 *   estresse: 6.5,
 *   motivacao: 7.2,
 *   sono: 6.8
 * }
 */
export type MediasBemEstar = {
  /** Média de nível de estresse (0-10) */
  estresse: number
  /** Média de nível de motivação (0-10) */
  motivacao: number
  /** Média de qualidade do sono (0-10) */
  sono: number
}

/**
 * Wrapper genérico para documentos do Appwrite
 * Adiciona metadados padrão do Appwrite a qualquer tipo
 * @template T - Tipo base do documento (default: Record genérico)
 * @example
 * type UserDoc = AppwriteDocument<{ name: string, email: string }>
 */
export type AppwriteDocument<T = Record<string, unknown>> = T & {
  /** ID único do documento */
  $id: string
  /** ID da coleção no Appwrite */
  $collectionId: string
  /** ID do banco de dados no Appwrite */
  $databaseId: string
  /** Timestamp de criação (ISO 8601) */
  $createdAt: string
  /** Timestamp de última atualização (ISO 8601) */
  $updatedAt: string
  /** Array de permissões de acesso */
  $permissions: string[]
}

/**
 * Resposta paginada de listagem do Appwrite
 * Estrutura padrão retornada por queries de lista
 * @template T - Tipo base dos documentos (default: Record genérico)
 * @example
 * const response: AppwriteListResponse<Funcionario> = {
 *   total: 42,
 *   documents: [...]
 * }
 */
export type AppwriteListResponse<T = Record<string, unknown>> = {
  /** Total de documentos que correspondem à query (sem limite de paginação) */
  total: number
  /** Array de documentos da página atual com metadados do Appwrite */
  documents: Array<AppwriteDocument<T>>
}
