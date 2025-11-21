import type { BemEstarCardProps } from '../../types/graphicsDashboard'
import MiniChart from './MiniChart'
import TrendIcon from './TrendIcon'

/**
 * BemEstarCard - Card individual para métrica de bem-estar
 * @param label Nome da métrica
 * @param color Cor principal do card
 * @param bgColor Cor de fundo do card
 * @param value Valor atual
 * @param values Array de valores históricos
 * @param media Média dos valores
 * @param tendencia Tendência ('up', 'down', 'neutral')
 * @param status Texto de status
 */
export default function BemEstarCard({
  label,
  color,
  value,
  values,
  media,
  tendencia,
  status,
}: BemEstarCardProps) {
  const getAccentVar = (c: string) => {
    switch (c) {
      case 'green':
        return 'var(--accent-success)'
      case 'red':
        return 'var(--accent-danger)'
      case 'orange':
      case 'yellow':
        return 'var(--accent-warning)'
      case 'indigo':
      case 'blue':
      default:
        return 'var(--accent-primary)'
    }
  }
  const accent = getAccentVar(color)
  return (
    <div
      className={`bemestar-card group relative overflow-hidden border-2 border-[var(--border-color)] bg-[var(--bg-secondary)] p-6 shadow-sm transition-all hover:shadow-md`}
      style={{ borderRadius: '1rem', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}
    >
      <div className="bemestar-sparkline absolute top-4 right-4">
        <MiniChart values={values} color={color} />
      </div>
      <div className="relative z-10">
        <div className="mb-2 flex items-center gap-2">
          <div className={`rounded-full bg-[var(--bg-tertiary)] p-2`}>
            <div
              className="h-3 w-3 rounded-full"
              style={{ backgroundColor: accent }}
            />
          </div>
          <span className="text-sm font-medium text-[var(--text-muted)]">
            {label}
          </span>
          <TrendIcon trend={tendencia} />
        </div>
        <div className="mb-3 flex items-baseline gap-2">
          <span className="text-4xl font-bold" style={{ color: accent }}>
            {value}
          </span>
          <span className="text-[var(--text-muted)]">/10</span>
        </div>
        <div className="mb-3 h-2 w-full overflow-hidden rounded-full bg-[var(--bg-tertiary)]">
          <div
            className="h-full transition-all duration-500"
            style={{
              width: `${(value / 10) * 100}%`,
              backgroundColor: accent,
            }}
          />
        </div>
        <div className="flex items-center justify-between text-xs text-[var(--text-muted)]">
          <span>Média: {media}</span>
          <span
            className={
              'bemestar-status ' +
              (status === 'Melhorando'
                ? 'text-[var(--accent-success)]'
                : status === 'Piorando'
                  ? 'text-[var(--accent-danger)]'
                  : 'text-[var(--text-muted)]')
            }
          >
            {status}
          </span>
        </div>
      </div>
    </div>
  )
}
