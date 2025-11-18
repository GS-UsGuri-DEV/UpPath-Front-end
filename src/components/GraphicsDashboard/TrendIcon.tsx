import type { TrendIconProps } from '../../types/graphicsDashboard'

/**
 * TrendIcon - Ícone visual para tendência da métrica
 */
export default function TrendIcon({ trend }: TrendIconProps) {
  if (trend === 'up') return <span className="text-xl text-green-500">↑</span>
  if (trend === 'down') return <span className="text-xl text-red-500">↓</span>
  return <span className="text-xl text-gray-400">→</span>
}
