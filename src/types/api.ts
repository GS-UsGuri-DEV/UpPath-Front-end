/**
 * Tipos relacionados à API e comunicação com backend
 * @module types/api
 */

/**
 * Headers padrão para requisições HTTP
 * Mapeamento chave-valor para headers customizados
 * @example
 * const headers: ApiHeaders = {
 *   'Content-Type': 'application/json',
 *   'Authorization': 'Bearer token123'
 * }
 */
export type ApiHeaders = Record<string, string>

/**
 * Estrutura padronizada de resposta de erro da API
 * Campos opcionais para máxima flexibilidade entre diferentes endpoints
 */
export type ApiErrorResponse = {
  /** Mensagem de erro breve */
  error?: string
  /** Mensagem de erro detalhada */
  message?: string
  /** Código HTTP do erro (400, 401, 404, 500, etc.) */
  status?: number
  /** Texto descritivo do status HTTP */
  statusText?: string
}

/**
 * Resposta do endpoint de login/autenticação
 * Suporta diferentes formatos de token e inclusão de dados do usuário
 */
export type LoginResponse = {
  /** Token JWT no formato padrão */
  token?: string
  /** Token de acesso (camelCase) */
  accessToken?: string
  /** Token de acesso (snake_case) */
  access_token?: string
  /** Dados completos do usuário autenticado */
  user?: UserResponse
  /** Dados adicionais da resposta */
  data?: unknown
}

/**
 * Resposta completa de dados do usuário da API
 * Suporta campos em camelCase e snake_case para compatibilidade
 * Campos opcionais para máxima flexibilidade
 */
export type UserResponse = {
  /** ID do usuário (formato principal) */
  idUser?: number
  /** ID do usuário (formato alternativo) */
  id?: number
  /** Nome do usuário (formato curto) */
  name?: string
  /** Nome completo do usuário */
  nome_completo?: string
  /** Email do usuário */
  email?: string
  /** Data de nascimento (camelCase) */
  birthDate?: string
  /** Data de nascimento (snake_case) */
  data_nascimento?: string
  /** Ocupação (camelCase) */
  occupation?: string
  /** Ocupação (snake_case) */
  ocupacao?: string
  /** Nível de carreira (camelCase) */
  nivelCarreira?: string
  /** Nível de carreira (snake_case) */
  nivel_carreira?: string
  /** Gênero (camelCase) */
  gender?: string
  /** Gênero (snake_case) */
  genero?: string
  /** Indica se é administrador (pode ser 0/1 ou boolean) */
  admin?: number | boolean
  /** ID da empresa vinculada (camelCase) */
  idEmpresa?: number | null
  /** ID da empresa vinculada (snake_case) */
  id_empresa?: number | null
  /** Data de registro (camelCase) */
  dateRegistered?: string
  /** Data de cadastro (snake_case) */
  data_cadastro?: string
  /** Senha hasheada (não deve ser exposta no frontend) */
  senha?: string
  /** CPF do usuário */
  cpf?: string
}

/**
 * Resposta completa de dados da empresa da API
 * Suporta campos em camelCase e snake_case
 */
export type EmpresaResponse = {
  /** ID da empresa (formato principal) */
  idEmpresa?: number
  /** ID da empresa (formato alternativo) */
  id?: number
  /** Nome da empresa (formato curto) */
  name?: string
  /** Nome completo da empresa */
  nome_empresa?: string
  /** CNPJ da empresa (14 dígitos) */
  cnpj?: string
  /** Email (formato curto) */
  email?: string
  /** Email de contato */
  email_contato?: string
  /** Senha hasheada */
  senha?: string
  /** Data de cadastro */
  data_cadastro?: string
}

/**
 * Dados normalizados do usuário para uso interno
 * Estrutura consistente com campos obrigatórios definidos
 * @example
 * const user: NormalizedUser = {
 *   id: 123,
 *   name: 'João Silva',
 *   email: 'joao@example.com',
 *   admin: false,
 *   idEmpresa: null,
 *   dateRegistered: '2024-01-15',
 *   tipo_conta: 'usuario'
 * }
 */
export type NormalizedUser = {
  /** ID único do usuário */
  id: number
  /** Nome do usuário */
  name: string
  /** Nome completo (opcional) */
  nome_completo?: string
  /** Email do usuário */
  email: string
  /** Data de nascimento */
  birthDate?: string
  /** Ocupação profissional */
  occupation?: string
  /** Nível de carreira (iniciante, júnior, pleno, sênior) */
  nivelCarreira?: string
  /** Gênero */
  gender?: string
  /** Se é administrador */
  admin: boolean
  /** ID da empresa vinculada (null se não vinculado) */
  idEmpresa: number | null
  /** Data de registro na plataforma */
  dateRegistered: string | null
  /** Tipo de conta */
  tipo_conta: 'usuario' | 'empresa'
}

/**
 * Dados normalizados da empresa para uso interno
 * Estrutura consistente com campos obrigatórios
 */
export type NormalizedEmpresa = {
  /** ID único da empresa */
  idEmpresa: number
  /** Nome da empresa */
  name: string
  /** CNPJ da empresa */
  cnpj: string
  /** Email da empresa */
  email: string
  /** Tipo de conta (sempre 'empresa') */
  tipo_conta: 'empresa'
  /** Privilégios administrativos */
  admin: boolean
}
