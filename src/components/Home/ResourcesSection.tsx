import {
  FaBook,
  FaBullseye,
  FaEnvelope,
  FaLightbulb,
  FaQuestionCircle,
} from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'

export default function ResourcesSection() {
  const navigate = useNavigate()

  return (
    <section className="rounded-xl border border-[var(--border-color)] bg-[var(--bg-secondary)] p-6">
      <h2 className="mb-3 text-lg font-semibold text-[var(--text-primary)]">
        Recursos e Suporte
      </h2>
      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
        <button
          onClick={() => navigate('/faq')}
          className="group block rounded-lg border border-[var(--border-color)] p-3 text-left transition duration-150 ease-in-out hover:border-indigo-600 hover:bg-indigo-600/10 hover:shadow-md hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-indigo-300/30 cursor-pointer opacity-95 hover:opacity-100"
          aria-label="Abrir FAQ"
        >
          <div className="mb-1 flex items-center gap-2 text-sm font-medium">
            <FaQuestionCircle className="text-blue-600 transition-colors group-hover:text-indigo-400" />
            <span className="text-[var(--text-primary)] transition-colors group-hover:text-[var(--text-primary)]">FAQ</span>
          </div>
          <p className="text-xs text-[var(--text-muted)] group-hover:text-[var(--text-primary)]">Perguntas frequentes e respostas</p>
        </button>

        <button
          onClick={() => navigate('/contato')}
          className="group block rounded-lg border border-[var(--border-color)] p-3 text-left transition duration-150 ease-in-out hover:border-indigo-600 hover:bg-indigo-600/10 hover:shadow-md hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-indigo-300/30 cursor-pointer opacity-95 hover:opacity-100"
          aria-label="Abrir contato"
        >
          <div className="mb-1 flex items-center gap-2 text-sm font-medium">
            <FaEnvelope className="text-green-600 transition-colors group-hover:text-green-400" />
            <span className="text-[var(--text-primary)] transition-colors group-hover:text-[var(--text-primary)]">Contato</span>
          </div>
          <p className="text-xs text-[var(--text-muted)] group-hover:text-[var(--text-primary)]">Entre em contato conosco</p>
        </button>

        <button
          onClick={() => navigate('/dashboard')}
          className="group block rounded-lg border border-[var(--border-color)] p-3 text-left transition duration-150 ease-in-out hover:border-indigo-600 hover:bg-indigo-600/10 hover:shadow-md hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-indigo-300/30 cursor-pointer opacity-95 hover:opacity-100"
          aria-label="Abrir guias"
        >
          <div className="mb-1 flex items-center gap-2 text-sm font-medium">
            <FaBook className="text-purple-600 transition-colors group-hover:text-purple-400" />
            <span className="text-[var(--text-primary)] transition-colors group-hover:text-[var(--text-primary)]">Guias</span>
          </div>
          <p className="text-xs text-[var(--text-muted)] group-hover:text-[var(--text-primary)]">Aprenda a usar a plataforma</p>
        </button>

        <button
          onClick={() => navigate('/dicas')}
          className="group block rounded-lg border border-[var(--border-color)] p-3 text-left transition duration-150 ease-in-out hover:border-indigo-600 hover:bg-indigo-600/10 hover:shadow-md hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-indigo-300/30 cursor-pointer opacity-95 hover:opacity-100"
          aria-label="Abrir dicas"
        >
          <div className="mb-1 flex items-center gap-2 text-sm font-medium">
            <FaLightbulb className="text-yellow-400 transition-colors group-hover:text-yellow-300" />
            <span className="text-[var(--text-primary)] transition-colors group-hover:text-[var(--text-primary)]">Dicas</span>
          </div>
          <p className="text-xs text-[var(--text-muted)] group-hover:text-[var(--text-primary)]">Melhore seu bem-estar diário</p>
        </button>

        <button
          onClick={() => navigate('/objetivos')}
          className="group block rounded-lg border border-[var(--border-color)] p-3 text-left transition duration-150 ease-in-out hover:border-indigo-600 hover:bg-indigo-600/10 hover:shadow-md hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-indigo-300/30 cursor-pointer opacity-95 hover:opacity-100"
          aria-label="Abrir objetivos"
        >
          <div className="mb-1 flex items-center gap-2 text-sm font-medium">
            <FaBullseye className="text-indigo-400 transition-colors group-hover:text-indigo-300" />
            <span className="text-[var(--text-primary)] transition-colors group-hover:text-[var(--text-primary)]">Objetivos</span>
          </div>
          <p className="text-xs text-[var(--text-muted)] group-hover:text-[var(--text-primary)]">Defina e acompanhe metas</p>
        </button>
      </div>
    </section>
  )
}
