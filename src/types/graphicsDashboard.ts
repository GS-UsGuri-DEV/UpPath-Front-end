export interface Recomendacao {
  tipo: string
  motivo: string
  data_recomendacao: string
}

export interface RecomendacoesCardProps {
  recomendacoes: Recomendacao[]
}
export interface Trilha {
  nome_trilha: string
  progresso_percentual: number
  status: string
}

export interface TrilhasCardProps {
  trilhas: Trilha[]
}

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
  color: string
  bgColor: string
  value: number
  values: number[]
  media: string
  tendencia: TrendType
  status: string
}

export interface BemEstarGridProps {
  cards: BemEstarCardProps[]
}
