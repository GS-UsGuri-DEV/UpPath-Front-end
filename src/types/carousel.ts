/**
 * Tipos para componente de carrossel genérico
 * @module types/carousel
 */

import type { ReactNode } from 'react'

/**
 * API de controle do carrossel (prev/next)
 * Fornecida ao render function de controles personalizados
 */
export type ControlsAPI = {
  /** Função para ir ao slide anterior */
  prev: () => void
  /** Função para ir ao próximo slide */
  next: () => void
  /** Índice do slide atual (0-based) */
  index: number
  /** Total de slides */
  total: number
}

/**
 * API de indicadores do carrossel (paginadores)
 * Fornecida ao render function de indicadores personalizados
 */
export type IndicatorsAPI = {
  /** Função para ir diretamente a um slide específico */
  goTo: (index: number) => void
  /** Índice do slide atual (0-based) */
  index: number
  /** Total de slides */
  total: number
}

/**
 * Props do componente CarrosselBase
 * Componente genérico e reutilizável de carrossel
 * @example
 * <CarrosselBase
 *   total={5}
 *   startIndex={0}
 *   autoMs={3000}
 *   renderItem={(index) => <div>Slide {index}</div>}
 *   renderControls={(api) => (
 *     <>
 *       <button onClick={api.prev}>Anterior</button>
 *       <button onClick={api.next}>Próximo</button>
 *     </>
 *   )}
 * />
 */
export type CarrosselBaseProps = {
  /** Número total de slides */
  total: number
  /** Índice inicial a exibir (padrão: 0) */
  startIndex?: number
  /** Intervalo de auto-play em ms (null desabilita auto-play) */
  autoMs?: number | null
  /** Classes CSS para o container principal */
  className?: string
  /** Classes CSS para o viewport interno */
  viewportClassName?: string
  /** Callback executado quando o índice muda */
  onChangeIndex?: (index: number) => void
  /** Função que renderiza cada slide dado seu índice */
  renderItem: (index: number) => ReactNode
  /** Função que renderiza controles personalizados (opcional) */
  renderControls?: (api: ControlsAPI) => ReactNode
  /** Função que renderiza indicadores personalizados (opcional) */
  renderIndicators?: (api: IndicatorsAPI) => ReactNode
}
