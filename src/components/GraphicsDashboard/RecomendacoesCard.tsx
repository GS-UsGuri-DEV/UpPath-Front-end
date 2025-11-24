import { MdOutlineLightbulb } from 'react-icons/md'
import type { RecomendacoesCardProps } from '../../types/graphicsDashboard'

export default function RecomendacoesCard({ recomendacoes }: RecomendacoesCardProps) {
  if (!recomendacoes || recomendacoes.length === 0) {
    return <p className="text-sm text-[var(--text-muted)]">Nenhuma recomendação disponível</p>
  }
  return (
    <div
      className="rounded-xl border border-[var(--border-color)] bg-[var(--bg-secondary)] p-6"
      role="region"
      aria-label="Recomendações do usuário"
    >
      <div className="mb-4 flex items-center gap-2">
        <span className="text-xl text-[var(--accent-warning)]" aria-hidden>
          <MdOutlineLightbulb />
        </span>
        <h3 className="text-lg font-semibold text-[var(--text-primary)]">Recomendações</h3>
      </div>
      <div className="space-y-3">
        {recomendacoes
          .slice(0, 3)
          .map((rec: import('../../types/graphicsDashboard').Recomendacao, idx: number) => (
            <div
              key={idx}
              className="rounded-lg border border-[var(--border-color)] bg-[var(--bg-primary)] p-3"
              tabIndex={0}
              aria-label={`Recomendação ${rec.tipo}, motivo: ${rec.motivo}`}
            >
              <div className="mb-1 flex items-center justify-between">
                <span className="text-sm font-medium text-[var(--text-primary)]">{rec.tipo}</span>
                <span className="text-xs text-[var(--text-muted)]">
                  {new Date(rec.data_recomendacao).toLocaleDateString('pt-BR')}
                </span>
              </div>
              <p className="text-xs text-[var(--text-secondary)]">{rec.motivo}</p>
            </div>
          ))}
      </div>
    </div>
  )
}
