/**
 * Tipos para página de perfil do usuário
 * @module types/profile
 */

/**
 * Props do componente de upload de imagem de perfil
 */
export type UploadProfileImageProps = {
  /** Callback executado após upload bem-sucedido
   * @param url - URL da imagem recém carregada
   */
  onUploadSuccess: (url: string) => void
}

/**
 * Props do componente de card de perfil
 * Exibe foto e informações básicas do usuário
 */
export type ProfileCardProps = {
  /** URL da imagem de perfil */
  profileImage: string
  /** Nome a ser exibido no card */
  displayName: string
  /** Email a ser exibido no card */
  displayEmail: string
}

/**
 * Props da seção de acesso rápido
 */
export type QuickAccessSectionProps = {
  /** Define se deve mostrar botão/link de cadastro */
  showCadastro: boolean
}
