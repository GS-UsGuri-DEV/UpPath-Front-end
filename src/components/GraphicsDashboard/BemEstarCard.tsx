import type { BemEstarCardProps } from '../../types/graphicsDashboard'
import MiniChart from './MiniChart'
import TrendIcon from './TrendIcon'

/**
 * BemEstarCard - Card individual para métrica de bem-estar
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
      className={`group relative overflow-hidden rounded-xl border-2 ${bgColor} bg-gradient-to-br from-${color}-50 to-white p-6 shadow-sm transition-all hover:shadow-md`}
    >
      <div className="absolute top-4 right-4">
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
              tendencia === 'down'
                ? 'font-semibold text-green-600'
                : tendencia === 'up'
                  ? 'font-semibold text-red-600'
                  : ''
            }
          >
            {status}
          </span>
        </div>
      </div>
    </div>
  )
}
