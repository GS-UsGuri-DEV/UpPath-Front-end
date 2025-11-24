import type { BemEstarCardProps } from '../types/graphicsDashboard'
import type { BemEstarEntry } from '../types/userDashboard'

/**
 * Hook para preparar os dados dos cards de bem-estar do dashboard
 * @param bemEstar Array de registros de bem-estar do usuário
 * @returns Array de BemEstarCardProps para o componente BemEstarGrid
 */
export function useBemEstarCards(bemEstar: BemEstarEntry[]): BemEstarCardProps[] {
  if (!bemEstar || bemEstar.length === 0) {
    return []
  }
  const sortedData = [...bemEstar].sort(
    (a, b) => new Date(a.data_registro).getTime() - new Date(b.data_registro).getTime(),
  )
  const calcularMedia = (valores: number[]) => {
    return valores.length > 0
      ? (valores.reduce((a, b) => a + b, 0) / valores.length).toFixed(1)
      : '0'
  }
  const calcularTendencia = (valores: number[]): 'up' | 'down' | 'neutral' => {
    if (valores.length < 2) {
      return 'neutral'
    }
    const primeiro = valores[0]
    const ultimo = valores[valores.length - 1]
    if (primeiro === undefined || ultimo === undefined) {
      return 'neutral'
    }
    if (ultimo > primeiro) {
      return 'up'
    }
    if (ultimo < primeiro) {
      return 'down'
    }
    return 'neutral'
  }
  const estresseData = sortedData.map((d) => d.nivel_estresse)
  const motivacaoData = sortedData.map((d) => d.nivel_motivacao)
  const sonoData = sortedData.map((d) => d.qualidade_sono)
  const mediaEstresse = calcularMedia(estresseData)
  const mediaMotivacao = calcularMedia(motivacaoData)
  const mediaSono = calcularMedia(sonoData)
  const tendenciaEstresse = calcularTendencia(estresseData)
  const tendenciaMotivacao = calcularTendencia(motivacaoData)
  const tendenciaSono = calcularTendencia(sonoData)
  const ultimoRegistro = sortedData[sortedData.length - 1]

  if (!ultimoRegistro) {
    return []
  }

  const getStatusEstresse = (trend: 'up' | 'down' | 'neutral'): string => {
    if (trend === 'down') {
      return 'Melhorando'
    }
    if (trend === 'up') {
      return 'Piorando'
    }
    return 'Estável'
  }

  const getStatusMotivacao = (trend: 'up' | 'down' | 'neutral'): string => {
    if (trend === 'up') {
      return 'Melhorando'
    }
    if (trend === 'down') {
      return 'Piorando'
    }
    return 'Estável'
  }

  const getStatusSono = (trend: 'up' | 'down' | 'neutral'): string => {
    if (trend === 'up') {
      return 'Melhorando'
    }
    if (trend === 'down') {
      return 'Piorando'
    }
    return 'Estável'
  }

  return [
    {
      label: 'Estresse',
      color: 'red',
      bgColor: 'bg-red-100',
      value: ultimoRegistro.nivel_estresse,
      values: estresseData,
      media: mediaEstresse,
      tendencia: tendenciaEstresse,
      status: getStatusEstresse(tendenciaEstresse),
    },
    {
      label: 'Motivação',
      color: 'green',
      bgColor: 'bg-green-100',
      value: ultimoRegistro.nivel_motivacao,
      values: motivacaoData,
      media: mediaMotivacao,
      tendencia: tendenciaMotivacao,
      status: getStatusMotivacao(tendenciaMotivacao),
    },
    {
      label: 'Qualidade do Sono',
      color: 'blue',
      bgColor: 'bg-blue-100',
      value: ultimoRegistro.qualidade_sono,
      values: sonoData,
      media: mediaSono,
      tendencia: tendenciaSono,
      status: getStatusSono(tendenciaSono),
    },
  ]
}
