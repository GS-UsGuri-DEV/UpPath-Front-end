/**
 * Tipos para página de contato
 * @module types/contact
 */

/**
 * Item de informação de contato exibido na página
 * @example
 * const item: ContactInfoItem = {
 *   icon: 'phone',
 *   title: 'Telefone',
 *   content: '(11) 98765-4321'
 * }
 */
export type ContactInfoItem = {
  /** Identificador do ícone (nome ou caminho) */
  icon: string
  /** Título da informação (Email, Telefone, Endereço) */
  title: string
  /** Conteúdo (pode ser string simples ou array de strings) */
  content: string | string[]
}

/**
 * Dados do formulário de contato
 * Validações: email válido, todos os campos obrigatórios
 * @example
 * const formData: FormData = {
 *   nome: 'João Silva',
 *   email: 'joao@example.com',
 *   assunto: 'Dúvida sobre plataforma',
 *   mensagem: 'Gostaria de saber mais sobre...'
 * }
 */
export type FormData = {
  /** Nome completo do remetente */
  nome: string
  /** Email válido para resposta */
  email: string
  /** Assunto/título da mensagem */
  assunto: string
  /** Conteúdo da mensagem */
  mensagem: string
}

/**
 * Props do componente ContactForm
 */
export type ContactFormProps = {
  /** Callback executado após envio bem-sucedido do formulário */
  onSubmitSuccess?: () => void
}
