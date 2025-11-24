/**
 * Tipos para componente de loading/spinner
 * @module types/spinner
 */

/**
 * Props do componente Spinner
 * Indicador visual de carregamento
 * @example
 * <Spinner text="Carregando dados..." size={48} className="my-spinner" />
 */
export type SpinnerProps = {
  /** Texto exibido abaixo do spinner (ex: 'Carregando...') */
  text?: string
  /** Classes CSS adicionais para customização */
  className?: string
  /** Tamanho do spinner em pixels (padrão: 40) */
  size?: number
}
