/**
 * Tipos para redes sociais (versão simplificada)
 * @module types/socialNetwork
 */

/**
 * Estrutura simplificada de uma rede social
 * Usado em listas de links sociais
 * @example
 * const github: SocialNetwork = {
 *   href: 'https://github.com/uppath',
 *   icon: '/icons/github.svg',
 *   alt: 'GitHub da UpPath'
 * }
 */
export type SocialNetwork = {
  /** URL completa do perfil */
  href: string
  /** Caminho do ícone SVG ou PNG */
  icon: string
  /** Texto alternativo para acessibilidade */
  alt: string
}
