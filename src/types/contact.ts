// Tipos para contato
export type ContactInfoItem = {
  icon: string
  title: string
  content: string | string[]
}

export type FormData = {
  nome: string
  email: string
  assunto: string
  mensagem: string
}

export type ContactFormProps = {
  onSubmitSuccess?: () => void
}
