import { FaPhoneAlt } from 'react-icons/fa'
import ContactForm from '../../components/Contato/ContactForm'
import ContactInfo from '../../components/Contato/ContactInfo'
import SocialLinks from '../../components/Contato/SocialLinks'
import Footer from '../../components/Footer'

export default function Contato() {
  return (
    <div className="min-h-screen bg-[var(--bg-primary)]">
      <div className="mx-auto max-w-7xl px-6 py-12 pb-24">
        <div className="mb-12 text-center">
          <h1 className="mb-4 text-3xl font-bold text-[var(--text-primary)] sm:text-4xl">
            Entre em Contato
          </h1>
          <p className="text-lg text-[var(--text-muted)]">
            Estamos aqui para ajudar você a transformar sua carreira
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          <div className="rounded-xl border border-[var(--border-color)] bg-[var(--bg-secondary)] p-8 shadow-lg">
            <div className="mb-6 flex items-center gap-3">
              <div className="rounded-full bg-[var(--bg-tertiary)] p-3">
                <FaPhoneAlt className="text-2xl text-[var(--accent-indigo)]" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-[var(--text-primary)]">
                  Fale Conosco
                </h2>
                <p className="text-sm text-[var(--text-muted)]">
                  Preencha o formulário abaixo
                </p>
              </div>
            </div>

            <ContactForm />

            <div className="mt-8">
              <p className="mb-4 text-center text-sm font-medium text-[var(--text-muted)]">
                Siga-nos nas redes sociais
              </p>
              <SocialLinks />
            </div>
          </div>

          <div className="flex flex-col justify-center space-y-6">
            <ContactInfo />

            <div className="rounded-xl border border-[var(--border-color)] bg-[var(--bg-secondary)] p-8 text-[var(--text-secondary)] shadow-lg">
              <h3 className="mb-4 text-2xl font-bold text-[var(--text-primary)]">
                Por que escolher o UpPath?
              </h3>
              <ul className="space-y-3 text-sm">
                <li className="flex items-start gap-2">
                  <span className="mt-1 text-lg">✓</span>
                  <span>Trilhas de aprendizado personalizadas com IA</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1 text-lg">✓</span>
                  <span>Monitoramento de bem-estar emocional</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1 text-lg">✓</span>
                  <span>Integração com principais plataformas de ensino</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1 text-lg">✓</span>
                  <span>Suporte dedicado para seu desenvolvimento</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
