/**
 * Tipos para página de perguntas frequentes (FAQ)
 * @module types/faq
 */

/**
 * Item individual de FAQ
 * @example
 * const faq: FAQItem = {
 *   question: 'Como faço para criar uma conta?',
 *   answer: 'Clique no botão Cadastrar no topo da página...',
 *   category: 'Conta'
 * }
 */
export type FAQItem = {
  /** Pergunta/título do item */
  question: string
  /** Resposta detalhada */
  answer: string
  /** Categoria do item (Conta, Cursos, Pagamento, etc.) */
  category: string
}

/**
 * Props do componente FAQItem (acordeão expansível)
 */
export type FAQItemProps = {
  /** Texto da pergunta */
  question: string
  /** Texto da resposta */
  answer: string
  /** Estado de expansão do acordeão */
  isExpanded: boolean
  /** Callback para alternar expansão */
  onToggle: () => void
}

/**
 * Props do componente FAQCategory
 * Agrupa múltiplos FAQItems por categoria
 */
export type FAQCategoryProps = {
  /** Nome da categoria */
  category: string
  /** Número sequencial da categoria (para estilização) */
  categoryNumber: number
  /** Itens desta categoria */
  items: FAQItem[]
  /** Índices dos itens expandidos */
  expandedItems: number[]
  /** Callback para alternar um item específico */
  onToggleItem: (index: number) => void
  /** Todos os itens de FAQ (para contexto) */
  allItems: FAQItem[]
}

/**
 * Props do componente SearchBar
 */
export type SearchBarProps = {
  /** Valor atual da busca */
  value: string
  /** Callback executado quando o valor muda */
  onChange: (value: string) => void
  /** Texto de placeholder do input */
  placeholder?: string
}
