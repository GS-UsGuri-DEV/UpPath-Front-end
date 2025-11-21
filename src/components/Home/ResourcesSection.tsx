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
        <div className="rounded border border-[var(--border-color)] p-3 transition-colors hover:border-[var(--border-color)]">
          <div className="mb-1 flex items-center gap-2 text-sm font-medium">
            <FaQuestionCircle className="text-blue-600" /> FAQ
          </div>
          <p className="text-xs text-gray-600">
            Perguntas frequentes e respostas
          </p>
        </div>
        <button
          onClick={() => navigate('/contato')}
          className="rounded border p-3 text-left transition-colors hover:border-indigo-400 hover:bg-indigo-50"
        >
          <div className="mb-1 flex items-center gap-2 text-sm font-medium">
            <FaEnvelope className="text-green-600" /> Contato
          </div>
          <p className="text-xs text-gray-600">Entre em contato conosco</p>
        </button>
        <button
          onClick={() => navigate('/dashboard')}
          className="rounded border p-3 text-left transition-colors hover:border-indigo-400 hover:bg-indigo-50"
        >
          <div className="mb-1 flex items-center gap-2 text-sm font-medium">
            <FaBook className="text-purple-600" /> Guias
          </div>
          <p className="text-xs text-[var(--text-muted)]">
            Aprenda a usar a plataforma
          </p>
        </button>
        <div className="rounded border border-[var(--border-color)] p-3 transition-colors hover:border-[var(--border-color)]">
          <div className="mb-1 flex items-center gap-2 text-sm font-medium">
            <FaLightbulb /> Dicas
          </div>
          <p className="text-xs text-[var(--text-muted)]">
            Melhore seu bem-estar diário
          </p>
        </div>
        <div className="rounded border border-[var(--border-color)] p-3 transition-colors hover:border-[var(--border-color)]">
          <div className="mb-1 flex items-center gap-2 text-sm font-medium">
            <FaBullseye /> Objetivos
          </div>
          <p className="text-xs text-[var(--text-muted)]">
            Defina e acompanhe metas
          </p>
        </div>
      </div>
    </section>
  )
}
