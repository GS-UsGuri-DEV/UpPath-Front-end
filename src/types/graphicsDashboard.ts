/**
 * Tipos para componentes de dashboard e visualizações gráficas
 * @module types/graphicsDashboard
 */

/**
 * Estrutura de uma recomendação/sugestão para o usuário
 * Gerada pelo sistema com base no perfil e histórico
 * @example
 * const rec: Recomendacao = {
 *   tipo: 'curso',
 *   motivo: 'Baseado no seu interesse em React',
 *   data_recomendacao: '2024-11-24T10:30:00Z',
 *   id_referencia: 123
 * }
 */
export type Recomendacao = {
  /** Tipo de recomendação (curso, artigo, trilha, etc.) */
  tipo: string
  /** Justificativa da recomendação */
  motivo: string
  /** Data/hora de criação da recomendação (ISO 8601) */
  data_recomendacao: string
  /** ID de referência do item recomendado (curso, artigo, etc.) */
  id_referencia?: number
}

/**
 * Props do componente RecomendacoesCard
 * Exibe lista de recomendações personalizadas em card
 */
export type RecomendacoesCardProps = {
  /** Array de recomendações a exibir */
  recomendacoes: Recomendacao[]
}

/**
 * Estrutura de uma trilha de aprendizado
 * Representa um caminho educacional com progresso do usuário
 * @example
 * const trilha: Trilha = {
 *   nome_trilha: 'Desenvolvedor Full Stack',
 *   progresso_percentual: 65,
 *   status: 'em_andamento'
 * }
 */
export type Trilha = {
  /** Nome da trilha de aprendizado */
  nome_trilha: string
  /** Percentual de conclusão (0-100) */
  progresso_percentual: number
  /** Status atual (em_andamento, concluida, nao_iniciada) */
  status: string
}

/**
 * Props do componente TrilhasCard
 * Exibe trilhas de aprendizado com barra de progresso
 */
export type TrilhasCardProps = {
  /** Array de trilhas a exibir */
  trilhas: Trilha[]
}

/**
 * Props do componente MiniChart
 * Gráfico compacto para visualização de tendências
 */
export type MiniChartProps = {
  /** Array de valores numéricos (últimos 7 dias, por exemplo) */
  values: number[]
  /** Cor da linha do gráfico (hex) */
  color: string
}

/**
 * Tipo de tendência para indicadores
 * Define direção visual (seta) do indicador
 */
export type TrendType = 'up' | 'down' | 'neutral'

/**
 * Props do componente TrendIcon
 * Ícone visual indicando melhora/piora/estabilidade
 */
export type TrendIconProps = {
  /** Direção da tendência */
  trend: TrendType
}

/**
 * Props do componente BemEstarCard
 * Card individual com métrica de bem-estar e mini gráfico
 * @example
 * const cardProps: BemEstarCardProps = {
 *   label: 'Estresse',
 *   color: '#ef4444',
 *   bgColor: '#fef2f2',
 *   value: 65,
 *   values: [70, 68, 65, 62, 60, 58, 65],
 *   media: '6.5/10',
 *   tendencia: 'down',
 *   status: 'Moderado'
 * }
 */
export type BemEstarCardProps = {
  /** Nome da métrica (Sono, Estresse, Motivação, etc.) */
  label: string
  /** Cor principal da métrica (hex) */
  color: string
  /** Cor de fundo do card (hex, tom mais claro) */
  bgColor: string
  /** Valor atual da métrica (0-100) */
  value: number
  /** Histórico de valores (últimos dias) */
  values: number[]
  /** Média formatada para exibição */
  media: string
  /** Tendência da métrica (melhorando, piorando, estável) */
  tendencia: TrendType
  /** Status descritivo (Bom, Moderado, Crítico, etc.) */
  status: string
}

/**
 * Props do componente BemEstarGrid
 * Grid responsivo com múltiplos cards de bem-estar
 */
export type BemEstarGridProps = {
  /** Array de cards de bem-estar a exibir */
  cards: BemEstarCardProps[]
}
