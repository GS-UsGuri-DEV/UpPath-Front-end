/**
 * Tipos para componentes de redes sociais
 * @module types/social
 */

import type { ReactNode } from 'react'

/**
 * Estrutura de um link de rede social
 * Contém ícone e cores customizadas
 * @example
 * const linkedin: SocialLink = {
 *   icon: <LinkedInIcon />,
 *   url: 'https://linkedin.com/company/uppath',
 *   bgColor: '#0077b5',
 *   hoverColor: '#005582'
 * }
 */
export type SocialLink = {
  /** Ícone React do serviço (LinkedIn, GitHub, Instagram, etc.) */
  icon: ReactNode
  /** URL completa do perfil ou página */
  url: string
  /** Cor de fundo padrão do botão (hex) */
  bgColor: string
  /** Cor de fundo ao passar o mouse (hex) */
  hoverColor: string
}
