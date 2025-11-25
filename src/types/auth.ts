/**
 * Tipos relacionados à autenticação e gerenciamento de usuários
 * @module types/auth
 */

/**
 * Resposta da API para dados de usuário
 * Estrutura específica retornada pelos endpoints de usuário
 */
export type UserResponse = {
  /** ID único do usuário */
  id_usuario?: number | string
  /** ID da empresa vinculada (null se independente) */
  id_empresa?: number | string | null
  /** Nome completo */
  nome_completo?: string
  /** CPF (11 dígitos) */
  cpf?: string
  /** Email (usado para login) */
  email?: string
  /** Nível de carreira */
  nivel_carreira?: string
  /** Ocupação profissional */
  ocupacao?: string
  /** Gênero */
  genero?: string
  /** Data de nascimento */
  data_nascimento?: string
  /** Data de cadastro */
  data_cadastro?: string
  /** Flag de admin */
  is_admin?: boolean
  /** ID do Appwrite (se usado) */
  $id?: string
  /** Campos adicionais da API */
  [key: string]: unknown
}

/**
 * Resposta da API para dados de empresa
 * Estrutura específica retornada pelos endpoints de empresa
 */
export type CompanyResponse = {
  /** ID único da empresa */
  id_empresa?: number | string
  /** Nome da empresa */
  nome_empresa?: string
  /** CNPJ (14 dígitos) */
  cnpj?: string
  /** Email de contato */
  email_contato?: string
  /** Data de cadastro */
  data_cadastro?: string
  /** ID do Appwrite (se usado) */
  $id?: string
  /** Campos adicionais da API */
  [key: string]: unknown
}

/**
 * Estrutura completa e flexível de dados do usuário
 * Permite qualquer campo adicional retornado pela API
 * @deprecated Prefira usar UserResponse para dados estruturados
 */
export type UserData = UserResponse | Record<string, unknown>

/**
 * Versão simplificada dos dados do usuário
 * Usado para exibição rápida (header, menu, etc.)
 * @example
 * const user: SimpleUser = {
 *   name: 'João Silva',
 *   email: 'joao@example.com'
 * }
 */
export type SimpleUser = {
  /** Nome do usuário (opcional pois pode estar carregando) */
  name?: string
  /** Email do usuário (opcional pois pode estar carregando) */
  email?: string
}

/**
 * Contexto de autenticação disponível globalmente via React Context
 * Gerencia estado do usuário e operações de login/logout
 * @example
 * const { user, login, logout } = useAuth()
 */
export type AuthContextType = {
  /** Dados simplificados do usuário autenticado (null se não autenticado) */
  user: SimpleUser | null
  /** Dados completos e brutos do usuário vindos da API */
  userData: UserData | null
  /** Indica se está carregando dados de autenticação */
  loading: boolean
  /**
   * Realiza login do usuário ou empresa
   * @param email - Email cadastrado
   * @param password - Senha
   * @param tipo - Tipo de conta ('usuario' ou 'empresa')
   * @returns Dados completos do usuário ou null em caso de erro
   * @throws {Error} Se credenciais inválidas
   */
  login: (email: string, password: string, tipo?: 'usuario' | 'empresa') => Promise<UserData | null>
  /**
   * Realiza logout e limpa sessão
   */
  logout: () => Promise<void>
  /**
   * Verifica autenticação atual (usado ao carregar app)
   */
  checkAuth: () => Promise<void>
}

/**
 * Dados do formulário de login
 * Estrutura mínima necessária para autenticação
 * @example
 * const formData: LoginFormData = {
 *   email: 'usuario@example.com',
 *   password: 'senha123'
 * }
 */
export type LoginFormData = {
  /** Email do usuário */
  email: string
  /** Senha em texto plano (será hasheada no backend) */
  password: string
}

/**
 * Dados do formulário de cadastro de empresa
 * Campos alinhados com schema do banco de dados
 * @example
 * const empresa: CompanyFormData = {
 *   nome_empresa: 'Tech Corp',
 *   cnpj: '12345678901234',
 *   email_contato: 'contato@techcorp.com'
 * }
 */
export type CompanyFormData = {
  /** ID da empresa (auto-gerado, usado em edição) */
  id_empresa?: number | string
  /** Nome fantasia ou razão social */
  nome_empresa: string
  /** CNPJ com 14 dígitos (apenas números) */
  cnpj: string
  /** Email corporativo para contato */
  email_contato: string
  /** Data de cadastro (ISO 8601 ou formato do DB) */
  data_cadastro?: string
}

/**
 * Dados do formulário de cadastro de usuário
 * Campos alinhados com schema do banco de dados
 * Validações: CPF 11 dígitos, idade mínima, senha forte
 */
export type UserFormData = {
  /** ID do usuário (auto-gerado, usado em edição) */
  id_usuario?: number | string
  /** ID da empresa vinculada (null se usuário independente) */
  id_empresa?: number | string | null
  /** Nome completo do usuário */
  nome_completo: string
  /** CPF com 11 dígitos (apenas números) */
  cpf?: string
  /** Email válido (usado para login) */
  email: string
  /** Senha em texto plano (mínimo 8 caracteres) */
  senha: string
  /** Nível de carreira (iniciante, júnior, pleno, sênior) */
  nivel_carreira?: string
  /** Ocupação profissional atual */
  ocupacao?: string
  /** Gênero (masculino, feminino, outro, prefiro não informar) */
  genero?: string
  /** Data de nascimento (formato YYYY-MM-DD ou DD/MM/YYYY) */
  data_nascimento?: string
  /** Data de cadastro (ISO 8601) */
  data_cadastro?: string
  /** Define se usuário tem privilégios de admin */
  is_admin?: boolean
}

/**
 * Dados unificados de signup (cadastro)
 * Union type que diferencia cadastro de empresa vs usuário
 * @example
 * // Cadastro de empresa
 * const signup: SignupFormData = {
 *   type: 'empresa',
 *   nome_empresa: 'Tech Corp',
 *   cnpj: '12345678901234',
 *   email_contato: 'contato@tech.com',
 *   senha: 'senha123',
 *   confirmPassword: 'senha123'
 * }
 *
 * // Cadastro de usuário
 * const signup: SignupFormData = {
 *   type: 'usuario',
 *   nome_completo: 'João Silva',
 *   email: 'joao@example.com',
 *   senha: 'senha123',
 *   confirmPassword: 'senha123'
 * }
 */
export type SignupFormData =
  | ({ type: 'empresa' } & CompanyFormData & {
        /** Senha para criar conta */
        senha?: string
        /** Confirmação de senha (deve ser igual a senha) */
        confirmPassword?: string
      })
  | ({ type: 'usuario' } & UserFormData & {
        /** Senha para criar conta */
        senha?: string
        /** Confirmação de senha (deve ser igual a senha) */
        confirmPassword?: string
      })
