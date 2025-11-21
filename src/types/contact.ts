// Tipos para contato
export interface ContactInfoItem {
  icon: string
  title: string
  content: string | string[]
}

export interface FormData {
  nome: string
  email: string
  assunto: string
  mensagem: string
}

export interface ContactFormProps {
  onSubmitSuccess?: () => void
}
