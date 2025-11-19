import { FaPhoneAlt } from 'react-icons/fa'
import ContactForm from '../../components/Contato/ContactForm'
import ContactInfo from '../../components/Contato/ContactInfo'
import SocialLinks from '../../components/Contato/SocialLinks'

export default function Contato() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-indigo-50 py-12">
      <div className="mx-auto max-w-7xl px-6">
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="mb-4 text-4xl font-bold text-gray-800">
            Entre em Contato
          </h1>
          <p className="text-lg text-gray-600">
            Estamos aqui para ajudar você a transformar sua carreira
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          {/* Form Section */}
          <div className="rounded-xl bg-white p-8 shadow-lg">
            <div className="mb-6 flex items-center gap-3">
              <div className="rounded-full bg-indigo-100 p-3">
                <FaPhoneAlt className="text-2xl text-indigo-600" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-800">
                  Fale Conosco
                </h2>
                <p className="text-sm text-gray-600">
                  Preencha o formulário abaixo
                </p>
              </div>
            </div>

            <ContactForm />

            {/* Social Media */}
            <div className="mt-8">
              <p className="mb-4 text-center text-sm font-medium text-gray-600">
                Siga-nos nas redes sociais
              </p>
              <SocialLinks />
            </div>
          </div>

          {/* Contact Info Section */}
          <div className="flex flex-col justify-center space-y-6">
            <ContactInfo />

            {/* Info Card */}
            <div className="rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 p-8 text-white shadow-lg">
              <h3 className="mb-4 text-2xl font-bold">
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
    </div>
  )
}
