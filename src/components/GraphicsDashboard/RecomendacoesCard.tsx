import { MdOutlineLightbulb } from 'react-icons/md'
import type { RecomendacoesCardProps } from '../../types/graphicsDashboard'

export default function RecomendacoesCard({
  recomendacoes,
}: RecomendacoesCardProps) {
  if (!recomendacoes || recomendacoes.length === 0) {
    return (
      <p className="text-sm text-gray-500">Nenhuma recomendação disponível</p>
    )
  }
  return (
    <div
      className="rounded-xl border bg-white p-6"
      role="region"
      aria-label="Recomendações do usuário"
    >
      <div className="mb-4 flex items-center gap-2">
        <span className="text-xl text-yellow-500" aria-hidden>
          <MdOutlineLightbulb />
        </span>
        <h3 className="text-lg font-semibold">Recomendações</h3>
      </div>
      <div className="space-y-3">
        {recomendacoes.slice(0, 3).map((rec: import('../../types/graphicsDashboard').Recomendacao, idx: number) => (
          <div
            key={idx}
            className="rounded-lg border p-3"
            tabIndex={0}
            aria-label={`Recomendação ${rec.tipo}, motivo: ${rec.motivo}`}
          >
            <div className="mb-1 flex items-center justify-between">
              <span className="text-sm font-medium">{rec.tipo}</span>
              <span className="text-xs text-gray-500">
                {new Date(rec.data_recomendacao).toLocaleDateString('pt-BR')}
              </span>
            </div>
            <p className="text-xs text-gray-600">{rec.motivo}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
