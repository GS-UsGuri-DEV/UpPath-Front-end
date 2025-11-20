import { useState } from 'react'

interface FormData {
  nome: string
  email: string
  assunto: string
  mensagem: string
}

interface ContactFormProps {
  onSubmitSuccess?: () => void
}

export default function ContactForm({ onSubmitSuccess }: ContactFormProps) {
  const [formData, setFormData] = useState<FormData>({
    nome: '',
    email: '',
    assunto: '',
    mensagem: '',
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitMessage, setSubmitMessage] = useState('')

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitMessage('')

    setTimeout(() => {
      setSubmitMessage(
        'Mensagem enviada com sucesso! Entraremos em contato em breve.',
      )
      setIsSubmitting(false)
      setFormData({ nome: '', email: '', assunto: '', mensagem: '' })
      onSubmitSuccess?.()
    }, 1500)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="mb-1 block text-sm font-medium text-[var(--text-secondary)]">
          Nome:
        </label>
        <input
          type="text"
          name="nome"
          value={formData.nome}
          onChange={handleChange}
          required
          className="w-full rounded-lg border border-[var(--input-border)] bg-[var(--input-bg)] px-4 py-2 text-[var(--text-primary)] focus:ring-2 focus:ring-[var(--accent-primary)] focus:outline-none"
          placeholder="Seu nome completo"
        />
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium text-[var(--text-secondary)]">
          Email:
        </label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          className="w-full rounded-lg border border-[var(--input-border)] bg-[var(--input-bg)] px-4 py-2 text-[var(--text-primary)] focus:ring-2 focus:ring-[var(--accent-primary)] focus:outline-none"
          placeholder="seu.email@exemplo.com"
        />
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium text-[var(--text-secondary)]">
          Assunto:
        </label>
        <input
          type="text"
          name="assunto"
          value={formData.assunto}
          onChange={handleChange}
          required
          className="w-full rounded-lg border border-[var(--input-border)] bg-[var(--input-bg)] px-4 py-2 text-[var(--text-primary)] focus:ring-2 focus:ring-[var(--accent-primary)] focus:outline-none"
          placeholder="Assunto da mensagem"
        />
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium text-[var(--text-secondary)]">
          Mensagem:
        </label>
        <textarea
          name="mensagem"
          value={formData.mensagem}
          onChange={handleChange}
          required
          rows={5}
          className="w-full rounded-lg border border-[var(--input-border)] bg-[var(--input-bg)] px-4 py-2 text-[var(--text-primary)] focus:ring-2 focus:ring-[var(--accent-primary)] focus:outline-none"
          placeholder="Digite sua mensagem aqui..."
        />
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full rounded-lg bg-[var(--accent-primary)] py-3 font-semibold text-white transition-all hover:bg-[var(--accent-primary-hover)] disabled:opacity-50"
      >
        {isSubmitting ? 'ENVIANDO...' : 'ENVIAR MENSAGEM'}
      </button>

      {submitMessage && (
        <div className="rounded-lg bg-[var(--accent-success-bg)] p-3 text-sm text-[var(--accent-success)]">
          {submitMessage}
        </div>
      )}
    </form>
  )
}
