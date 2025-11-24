// Tipos para perfil de usuário
export type UploadProfileImageProps = {
  onUploadSuccess: (url: string) => void
}

export type ProfileCardProps = {
  profileImage: string
  displayName: string
  displayEmail: string
}

export type QuickAccessSectionProps = {
  showCadastro: boolean
}
