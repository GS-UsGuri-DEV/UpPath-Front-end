import { Link } from 'react-router-dom'
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
} from 'react-icons/fa'
import { contactInfo } from '../../data/contactData'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t border-[var(--border-color)] bg-[var(--bg-secondary)] py-12">
      <div className="container mx-auto px-4">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Sobre */}
          <div>
            <h3 className="mb-4 text-lg font-semibold text-[var(--text-primary)]">
              UpPath
            </h3>
            <p className="mb-4 text-sm text-[var(--text-muted)]">
              {contactInfo.tagline}
            </p>
            <div className="flex gap-3">
              <a
                href={contactInfo.socialMedia.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full bg-blue-600 p-2 text-white transition-transform hover:scale-110 hover:bg-blue-700"
                aria-label="Facebook"
              >
                <FaFacebookF size={16} />
              </a>
              <a
                href={contactInfo.socialMedia.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full bg-sky-500 p-2 text-white transition-transform hover:scale-110 hover:bg-sky-600"
                aria-label="Twitter"
              >
                <FaTwitter size={16} />
              </a>
              <a
                href={contactInfo.socialMedia.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full bg-gradient-to-br from-purple-600 via-pink-600 to-orange-500 p-2 text-white transition-transform hover:scale-110"
                aria-label="Instagram"
              >
                <FaInstagram size={16} />
              </a>
              <a
                href={contactInfo.socialMedia.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full bg-blue-700 p-2 text-white transition-transform hover:scale-110 hover:bg-blue-800"
                aria-label="LinkedIn"
              >
                <FaLinkedinIn size={16} />
              </a>
            </div>
          </div>

          {/* Links Rápidos */}
          <div>
            <h3 className="mb-4 text-lg font-semibold text-[var(--text-primary)]">
              Links Rápidos
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  to="/"
                  className="text-[var(--text-muted)] transition-colors hover:text-[var(--text-primary)]"
                >
                  Início
                </Link>
              </li>
              <li>
                <Link
                  to="/dashboard"
                  className="text-[var(--text-muted)] transition-colors hover:text-[var(--text-primary)]"
                >
                  Dashboard
                </Link>
              </li>
              <li>
                <Link
                  to="/cursos"
                  className="text-[var(--text-muted)] transition-colors hover:text-[var(--text-primary)]"
                >
                  Cursos e Trilhas
                </Link>
              </li>
              <li>
                <Link
                  to="/faq"
                  className="text-[var(--text-muted)] transition-colors hover:text-[var(--text-primary)]"
                >
                  FAQ
                </Link>
              </li>
              <li>
                <Link
                  to="/contato"
                  className="text-[var(--text-muted)] transition-colors hover:text-[var(--text-primary)]"
                >
                  Contato
                </Link>
              </li>
            </ul>
          </div>

          {/* Suporte */}
          <div>
            <h3 className="mb-4 text-lg font-semibold text-[var(--text-primary)]">
              Suporte
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  to="/faq"
                  className="text-[var(--text-muted)] transition-colors hover:text-[var(--text-primary)]"
                >
                  Perguntas Frequentes
                </Link>
              </li>
              <li>
                <a
                  href={`mailto:${contactInfo.supportEmail}`}
                  className="text-[var(--text-muted)] transition-colors hover:text-[var(--text-primary)]"
                >
                  Suporte Técnico
                </a>
              </li>
              <li>
                <Link
                  to="/contato"
                  className="text-[var(--text-muted)] transition-colors hover:text-[var(--text-primary)]"
                >
                  Fale Conosco
                </Link>
              </li>
            </ul>
          </div>

          {/* Contato */}
          <div>
            <h3 className="mb-4 text-lg font-semibold text-[var(--text-primary)]">
              Contato
            </h3>
            <ul className="space-y-3 text-sm text-[var(--text-muted)]">
              <li className="flex items-start gap-2">
                <FaEnvelope className="mt-1 flex-shrink-0 text-indigo-600" />
                <a
                  href={`mailto:${contactInfo.email}`}
                  className="transition-colors hover:text-[var(--text-primary)]"
                >
                  {contactInfo.email}
                </a>
              </li>
              <li className="flex items-start gap-2">
                <FaPhone className="mt-1 flex-shrink-0 text-indigo-600" />
                <span>{contactInfo.phone}</span>
              </li>
              <li className="flex items-start gap-2">
                <FaMapMarkerAlt className="mt-1 flex-shrink-0 text-indigo-600" />
                <span>
                  {contactInfo.address.street}, {contactInfo.address.city} -{' '}
                  {contactInfo.address.state}
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 border-t border-[var(--border-color)] pt-8 text-center">
          <p className="text-sm text-[var(--text-muted)]">
            &copy; {currentYear} UpPath. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  )
}
