import type { MiniChartProps } from '../../types/graphicsDashboard'

/**
 * MiniChart - Gráfico sparkline para evolução de métricas
 */
export default function MiniChart({ values, color }: MiniChartProps) {
  const maxVal = 10
  const width = 120
  const height = 40
  const step = width / Math.max(values.length - 1, 1)
  const points = values
    .map((v, i) => `${i * step},${height - (v / maxVal) * height}`)
    .join(' ')

  return (
    <svg width={width} height={height} className="opacity-30">
      <polyline
        points={points}
        fill="none"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {values.map((v, i) => (
        <circle
          key={i}
          cx={i * step}
          cy={height - (v / maxVal) * height}
          r={2}
          fill={color}
        />
      ))}
    </svg>
  )
}
