import type { TrilhasCardProps } from '../../types/graphicsDashboard'

export default function TrilhasCard({ trilhas }: TrilhasCardProps) {
  if (!trilhas || trilhas.length === 0) {
    return <p className="text-sm text-gray-500">Nenhuma trilha encontrada</p>
  }
  return (
    <div
      className="rounded-xl border bg-white p-6"
      role="region"
      aria-label="Trilhas do usuário"
    >
      <div className="mb-4 flex items-center gap-2">
        <span className="text-xl text-indigo-600" aria-hidden>
          📚
        </span>
        <h3 className="text-lg font-semibold">Trilhas</h3>
      </div>
      <div className="space-y-3">
        {trilhas.map((trilha, idx) => (
          <div
            key={idx}
            className="rounded-lg border p-3"
            tabIndex={0}
            aria-label={`Trilha ${trilha.nome_trilha}, progresso ${trilha.progresso_percentual}%`}
          >
            <div className="mb-2 flex items-center justify-between">
              <span className="font-medium">{trilha.nome_trilha}</span>
              <span className="text-sm text-gray-600">{trilha.status}</span>
            </div>
            <div className="h-2 w-full overflow-hidden rounded-full bg-gray-200">
              <div
                className="h-full bg-indigo-600 transition-all"
                style={{ width: `${trilha.progresso_percentual}%` }}
                aria-valuenow={trilha.progresso_percentual}
                aria-valuemin={0}
                aria-valuemax={100}
                role="progressbar"
                aria-label={`Progresso da trilha ${trilha.nome_trilha}`}
              />
            </div>
            <div className="mt-1 text-right text-xs text-gray-600">
              {trilha.progresso_percentual}%
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
