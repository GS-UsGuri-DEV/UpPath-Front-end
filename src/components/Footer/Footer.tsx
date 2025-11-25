import {
  FaArrowUp,
  FaEnvelope,
  FaFacebookF,
  FaHeart,
  FaInstagram,
  FaLinkedinIn,
  FaMapMarkerAlt,
  FaPhone,
  FaTwitter,
} from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { contactInfo } from '../../data/contactData'
import useTheme from '../../hooks/useTheme'

export default function Footer() {
  const currentYear = new Date().getFullYear()
  const { isDark } = useTheme()

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="relative overflow-hidden border-t border-[var(--border-color)] bg-gradient-to-br from-[var(--bg-secondary)] to-[var(--bg-tertiary)]">
      {/* Decorative gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/5 via-purple-500/5 to-pink-500/5" />

      <div className="relative">
        <div className="container mx-auto px-4 py-8">
          {/* Main Content */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {/* Sobre */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <img
                  src={isDark ? '/icon/icon-dark.svg' : '/icon/icon-light.svg'}
                  alt="UpPath"
                  className="h-8 w-8"
                />
                <h3 className="text-lg font-bold text-[var(--text-primary)]">UpPath</h3>
              </div>
              <p className="text-xs leading-relaxed text-[var(--text-muted)]">
                {contactInfo.tagline}
              </p>

              {/* Social Media */}
              <div>
                <p className="mb-2 text-xs font-semibold tracking-wider text-[var(--text-secondary)] uppercase">
                  Siga-nos
                </p>
                <div className="flex gap-2">
                  <a
                    href={contactInfo.socialMedia.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative rounded-lg bg-blue-600 p-2 text-white shadow-md transition-all duration-300 hover:scale-110 hover:bg-blue-700 hover:shadow-xl"
                    aria-label="Facebook"
                  >
                    <FaFacebookF size={14} />
                    <span className="absolute -top-8 left-1/2 -translate-x-1/2 rounded bg-gray-900 px-2 py-1 text-xs whitespace-nowrap text-white opacity-0 transition-opacity group-hover:opacity-100">
                      Facebook
                    </span>
                  </a>
                  <a
                    href={contactInfo.socialMedia.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative rounded-lg bg-sky-500 p-2 text-white shadow-md transition-all duration-300 hover:scale-110 hover:bg-sky-600 hover:shadow-xl"
                    aria-label="Twitter"
                  >
                    <FaTwitter size={14} />
                    <span className="absolute -top-8 left-1/2 -translate-x-1/2 rounded bg-gray-900 px-2 py-1 text-xs whitespace-nowrap text-white opacity-0 transition-opacity group-hover:opacity-100">
                      Twitter
                    </span>
                  </a>
                  <a
                    href={contactInfo.socialMedia.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative rounded-lg bg-gradient-to-br from-purple-600 via-pink-600 to-orange-500 p-2 text-white shadow-md transition-all duration-300 hover:scale-110 hover:shadow-xl"
                    aria-label="Instagram"
                  >
                    <FaInstagram size={14} />
                    <span className="absolute -top-8 left-1/2 -translate-x-1/2 rounded bg-gray-900 px-2 py-1 text-xs whitespace-nowrap text-white opacity-0 transition-opacity group-hover:opacity-100">
                      Instagram
                    </span>
                  </a>
                  <a
                    href={contactInfo.socialMedia.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative rounded-lg bg-blue-700 p-2 text-white shadow-md transition-all duration-300 hover:scale-110 hover:bg-blue-800 hover:shadow-xl"
                    aria-label="LinkedIn"
                  >
                    <FaLinkedinIn size={14} />
                    <span className="absolute -top-8 left-1/2 -translate-x-1/2 rounded bg-gray-900 px-2 py-1 text-xs whitespace-nowrap text-white opacity-0 transition-opacity group-hover:opacity-100">
                      LinkedIn
                    </span>
                  </a>
                </div>
              </div>
            </div>

            {/* Links Rápidos */}
            <div>
              <h3 className="mb-3 text-base font-bold text-[var(--text-primary)]">Links Rápidos</h3>
              <ul className="space-y-2 text-xs">
                <li>
                  <Link
                    to="/"
                    className="group flex items-center gap-2 text-[var(--text-muted)] transition-all duration-200 hover:translate-x-1 hover:text-indigo-600"
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-indigo-600 opacity-0 transition-opacity group-hover:opacity-100" />
                    Início
                  </Link>
                </li>
                <li>
                  <Link
                    to="/dashboard"
                    className="group flex items-center gap-2 text-[var(--text-muted)] transition-all duration-200 hover:translate-x-1 hover:text-indigo-600"
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-indigo-600 opacity-0 transition-opacity group-hover:opacity-100" />
                    Dashboard
                  </Link>
                </li>
                <li>
                  <Link
                    to="/cursos"
                    className="group flex items-center gap-2 text-[var(--text-muted)] transition-all duration-200 hover:translate-x-1 hover:text-indigo-600"
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-indigo-600 opacity-0 transition-opacity group-hover:opacity-100" />
                    Cursos e Trilhas
                  </Link>
                </li>
                <li>
                  <Link
                    to="/faq"
                    className="group flex items-center gap-2 text-[var(--text-muted)] transition-all duration-200 hover:translate-x-1 hover:text-indigo-600"
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-indigo-600 opacity-0 transition-opacity group-hover:opacity-100" />
                    FAQ
                  </Link>
                </li>
                <li>
                  <Link
                    to="/contato"
                    className="group flex items-center gap-2 text-[var(--text-muted)] transition-all duration-200 hover:translate-x-1 hover:text-indigo-600"
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-indigo-600 opacity-0 transition-opacity group-hover:opacity-100" />
                    Contato
                  </Link>
                </li>
              </ul>
            </div>

            {/* Suporte */}
            <div>
              <h3 className="mb-3 text-base font-bold text-[var(--text-primary)]">Suporte</h3>
              <ul className="space-y-2 text-xs">
                <li>
                  <Link
                    to="/faq"
                    className="group flex items-center gap-2 text-[var(--text-muted)] transition-all duration-200 hover:translate-x-1 hover:text-indigo-600"
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-indigo-600 opacity-0 transition-opacity group-hover:opacity-100" />
                    Perguntas Frequentes
                  </Link>
                </li>
                <li>
                  <a
                    href={`mailto:${contactInfo.supportEmail}`}
                    className="group flex items-center gap-2 text-[var(--text-muted)] transition-all duration-200 hover:translate-x-1 hover:text-indigo-600"
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-indigo-600 opacity-0 transition-opacity group-hover:opacity-100" />
                    Suporte Técnico
                  </a>
                </li>
                <li>
                  <Link
                    to="/contato"
                    className="group flex items-center gap-2 text-[var(--text-muted)] transition-all duration-200 hover:translate-x-1 hover:text-indigo-600"
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-indigo-600 opacity-0 transition-opacity group-hover:opacity-100" />
                    Fale Conosco
                  </Link>
                </li>
              </ul>
            </div>

            {/* Contato */}
            <div>
              <h3 className="mb-3 text-base font-bold text-[var(--text-primary)]">Contato</h3>
              <ul className="space-y-2 text-xs text-[var(--text-muted)]">
                <li className="group flex items-start gap-2 transition-all duration-200 hover:translate-x-1">
                  <div className="rounded-lg bg-indigo-100 p-1.5 dark:bg-indigo-900/30">
                    <FaEnvelope className="flex-shrink-0 text-xs text-indigo-600" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold tracking-wider text-[var(--text-secondary)] uppercase">
                      Email
                    </p>
                    <a
                      href={`mailto:${contactInfo.email}`}
                      className="transition-colors hover:text-indigo-600"
                    >
                      {contactInfo.email}
                    </a>
                  </div>
                </li>
                <li className="group flex items-start gap-2 transition-all duration-200 hover:translate-x-1">
                  <div className="rounded-lg bg-indigo-100 p-1.5 dark:bg-indigo-900/30">
                    <FaPhone className="flex-shrink-0 text-xs text-indigo-600" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold tracking-wider text-[var(--text-secondary)] uppercase">
                      Telefone
                    </p>
                    <span>{contactInfo.phone}</span>
                  </div>
                </li>
                <li className="group flex items-start gap-2 transition-all duration-200 hover:translate-x-1">
                  <div className="rounded-lg bg-indigo-100 p-1.5 dark:bg-indigo-900/30">
                    <FaMapMarkerAlt className="flex-shrink-0 text-xs text-indigo-600" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold tracking-wider text-[var(--text-secondary)] uppercase">
                      Endereço
                    </p>
                    <span>
                      {contactInfo.address.street}, {contactInfo.address.city} -{' '}
                      {contactInfo.address.state}
                    </span>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          {/* Divider */}
          <div className="my-6 h-px bg-gradient-to-r from-transparent via-[var(--border-color)] to-transparent" />

          {/* Bottom Section */}
          <div className="flex flex-col items-center justify-between gap-3 md:flex-row">
            <p className="flex items-center gap-2 text-xs text-[var(--text-muted)]">
              &copy; {currentYear} UpPath. Feito com
              <FaHeart className="animate-pulse text-red-500" />
              por nossa equipe.
            </p>

            <div className="flex items-center gap-3">
              <Link
                to="/integrantes"
                className="text-xs text-[var(--text-muted)] transition-colors hover:text-indigo-600"
              >
                Equipe
              </Link>
              <span className="text-[var(--text-muted)]">•</span>
              <Link
                to="/privacidade"
                className="text-xs text-[var(--text-muted)] transition-colors hover:text-indigo-600"
              >
                Privacidade
              </Link>
              <span className="text-[var(--text-muted)]">•</span>
              <Link
                to="/termos"
                className="text-xs text-[var(--text-muted)] transition-colors hover:text-indigo-600"
              >
                Termos
              </Link>
            </div>
          </div>
        </div>

        {/* Scroll to Top Button */}
        <button
          onClick={scrollToTop}
          className="fixed right-6 bottom-6 z-40 rounded-full bg-gradient-to-br from-indigo-600 to-purple-600 p-3 text-white shadow-lg transition-all duration-300 hover:scale-110 hover:shadow-2xl active:scale-95"
          aria-label="Voltar ao topo"
        >
          <FaArrowUp size={16} />
        </button>
      </div>
    </footer>
  )
}
