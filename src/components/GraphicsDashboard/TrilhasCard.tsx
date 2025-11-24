import { FiBook } from 'react-icons/fi'
import type { TrilhasCardProps } from '../../types/graphicsDashboard'

export default function TrilhasCard({ trilhas }: TrilhasCardProps) {
  if (!trilhas || trilhas.length === 0) {
    return <p className="text-sm text-[var(--text-muted)]">Nenhuma trilha encontrada</p>
  }
  return (
    <div
      className="rounded-xl border border-[var(--border-color)] bg-[var(--bg-secondary)] p-6"
      role="region"
      aria-label="Trilhas do usuário"
    >
      <div className="mb-4 flex items-center gap-2">
        <span className="text-xl text-indigo-600" aria-hidden>
          <FiBook />
        </span>
        <h3 className="text-lg font-semibold text-[var(--text-primary)]">Trilhas</h3>
      </div>
      <div className="space-y-3">
        {trilhas.map((trilha) => (
          <div
            key={trilha.nome_trilha}
            className="rounded-lg border border-[var(--border-color)] bg-[var(--bg-primary)] p-3"
            tabIndex={0}
            aria-label={`Trilha ${trilha.nome_trilha}, progresso ${trilha.progresso_percentual}%`}
          >
            <div className="mb-2 flex items-center justify-between">
              <span className="font-medium">{trilha.nome_trilha}</span>
              <span className="text-sm text-[var(--text-muted)]">{trilha.status}</span>
            </div>
            <div className="h-2 w-full overflow-hidden rounded-full bg-[var(--bg-tertiary)]">
              <div
                className="h-full bg-[var(--accent-indigo)] transition-all"
                style={{ width: `${trilha.progresso_percentual}%` }}
                aria-valuenow={trilha.progresso_percentual}
                aria-valuemin={0}
                aria-valuemax={100}
                role="progressbar"
                aria-label={`Progresso da trilha ${trilha.nome_trilha}`}
              />
            </div>
            <div className="mt-1 text-right text-xs text-[var(--text-muted)]">
              {trilha.progresso_percentual}%
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
