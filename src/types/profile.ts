// Tipos para perfil de usuário
export interface UploadProfileImageProps {
  onUploadSuccess: (url: string) => void
}

export interface ProfileCardProps {
  profileImage: string
  displayName: string
  displayEmail: string
}

export interface QuickAccessSectionProps {
  showCadastro: boolean
}
