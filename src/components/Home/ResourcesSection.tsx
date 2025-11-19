import { FaBook, FaBullseye, FaLightbulb } from 'react-icons/fa'

export default function ResourcesSection() {
  return (
    <section className="rounded-xl border border-[var(--border-color)] bg-[var(--bg-secondary)] p-6">
      <h2 className="mb-3 text-lg font-semibold text-[var(--text-primary)]">
        Recursos e Suporte
      </h2>
      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
        <div className="rounded border border-[var(--border-color)] p-3 transition-colors hover:border-[var(--border-color)]">
          <div className="mb-1 flex items-center gap-2 text-sm font-medium">
            <FaBook /> Guias
          </div>
          <p className="text-xs text-[var(--text-muted)]">
            Aprenda a usar a plataforma
          </p>
        </div>
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
