export type Recomendacao = {
  tipo: string
  motivo: string
  data_recomendacao: string
}

export type RecomendacoesCardProps = {
  recomendacoes: Recomendacao[]
}
export type Trilha = {
  nome_trilha: string
  progresso_percentual: number
  status: string
}

export type TrilhasCardProps = {
  trilhas: Trilha[]
}

export type MiniChartProps = {
  values: number[]
  color: string
}

export type TrendType = 'up' | 'down' | 'neutral'

export type TrendIconProps = {
  trend: TrendType
}

export type BemEstarCardProps = {
  label: string
  color: string
  bgColor: string
  value: number
  values: number[]
  media: string
  tendencia: TrendType
  status: string
}

export type BemEstarGridProps = {
  cards: BemEstarCardProps[]
}
