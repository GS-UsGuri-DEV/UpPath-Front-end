import type { MiniChartProps } from '../../types/graphicsDashboard'

/**
 * MiniChart - Gráfico sparkline para evolução de métricas
 */
export default function MiniChart({ values, color }: MiniChartProps) {
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
  const maxVal = 10
  const width = 120
  const height = 40
  const step = width / Math.max(values.length - 1, 1)
  const points = values.map((v, i) => `${i * step},${height - (v / maxVal) * height}`).join(' ')

  // Create array with indices for stable keys in time-series data
  const indexedValues = values.map((v, i) => ({ value: v, position: i }))

  return (
    <svg width={width} height={height} className="opacity-30">
      <polyline
        points={points}
        fill="none"
        stroke={accent}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {indexedValues.map(({ value, position }) => (
        <circle
          key={`point-${position}`}
          cx={position * step}
          cy={height - (value / maxVal) * height}
          r={2}
          fill={accent}
        />
      ))}
    </svg>
  )
}
