export interface Trilha {
  nome_trilha: string
  progresso_percentual: number
  status: string
}

export interface TrilhasCardProps {
  trilhas: Trilha[]
}
// Tipos para componentes gráficos do Dashboard

export interface MiniChartProps {
  values: number[]
  color: string
}

export type TrendType = 'up' | 'down' | 'neutral'

export interface TrendIconProps {
  trend: TrendType
}

export interface BemEstarCardProps {
  label: string
  color: string // Ex: 'red', 'green', 'blue'
  bgColor: string // Ex: 'bg-red-100', 'bg-green-100', 'bg-blue-100'
  value: number
  values: number[]
  media: string
  tendencia: TrendType
  status: string
}

export interface BemEstarGridProps {
  cards: BemEstarCardProps[]
}
