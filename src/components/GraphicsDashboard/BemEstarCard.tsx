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
  bgColor,
  value,
  values,
  media,
  tendencia,
  status,
}: BemEstarCardProps) {
  return (
    <div
      className={`bemestar-card group relative overflow-hidden border-2 ${bgColor} bg-gradient-to-br from-${color}-50 to-white p-6 shadow-sm transition-all hover:shadow-md`}
      style={{ borderRadius: '1rem', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}
    >
      <div className="bemestar-sparkline absolute top-4 right-4">
        <MiniChart values={values} color={color} />
      </div>
      <div className="relative z-10">
        <div className="mb-2 flex items-center gap-2">
          <div className={`rounded-full ${bgColor} p-2`}>
            <div className={`h-3 w-3 rounded-full bg-${color}-500`} />
          </div>
          <span className="text-sm font-medium text-gray-600">{label}</span>
          <TrendIcon trend={tendencia} />
        </div>
        <div className="mb-3 flex items-baseline gap-2">
          <span className={`text-4xl font-bold text-${color}-600`}>
            {value}
          </span>
          <span className="text-gray-500">/10</span>
        </div>
        <div
          className={`mb-3 h-2 w-full overflow-hidden rounded-full ${bgColor}`}
        >
          <div
            className={`h-full bg-${color}-500 transition-all duration-500`}
            style={{ width: `${(value / 10) * 100}%` }}
          />
        </div>
        <div className="flex items-center justify-between text-xs text-gray-600">
          <span>Média: {media}</span>
          <span
            className={
              'bemestar-status ' +
              (status === 'Melhorando'
                ? 'text-green-600'
                : status === 'Piorando'
                  ? 'text-red-600'
                  : 'text-gray-500')
            }
          >
            {status}
          </span>
        </div>
      </div>
    </div>
  )
}
