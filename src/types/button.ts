/**
 * Tipos para componentes de botão
 * @module types/button
 */

import type { ReactNode } from 'react'

/**
 * Props base compartilhadas por todos os botões
 * @example
 * const baseProps: ButtonBaseProps = {
 *   children: 'Clique aqui',
 *   className: 'btn-primary',
 *   disabled: false,
 *   'aria-label': 'Botão de ação'
 * }
 */
export type ButtonBaseProps = {
  /** Conteúdo interno do botão (texto, ícones, etc.) */
  children: ReactNode
  /** Classes CSS adicionais para estilização */
  className?: string
  /** Desabilita interação com o botão */
  disabled?: boolean
  /** Label de acessibilidade para leitores de tela */
  'aria-label'?: string
}

/**
 * Props para botões que abrem links externos
 * Sempre abre em nova aba por segurança
 * @example
 * <BtnExterno href="https://example.com" target="_blank">
 *   Visitar site
 * </BtnExterno>
 */
export type BtnExternoProps = {
  /** URL completa do link externo */
  href: string
  /** Target fixo em '_blank' para abrir em nova aba */
  target: '_blank'
} & ButtonBaseProps
