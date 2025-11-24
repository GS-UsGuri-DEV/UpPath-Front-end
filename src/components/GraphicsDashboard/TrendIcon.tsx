import type { TrendIconProps } from '../../types/graphicsDashboard'

/**
 * TrendIcon - Ícone visual para tendência da métrica
 */
export default function TrendIcon({ trend }: TrendIconProps) {
  if (trend === 'up') {
    return (
      <span className="text-xl" style={{ color: 'var(--accent-success)' }}>
        ↑
      </span>
    )
  }
  if (trend === 'down') {
    return (
      <span className="text-xl" style={{ color: 'var(--accent-danger)' }}>
        ↓
      </span>
    )
  }
  return <span className="text-xl text-[var(--text-muted)]">→</span>
}
