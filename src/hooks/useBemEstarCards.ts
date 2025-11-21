import type { BemEstarCardProps } from '../types/graphicsDashboard'
import type { BemEstarEntry } from '../types/userDashboard'

/**
 * Hook para preparar os dados dos cards de bem-estar do dashboard
 * @param bemEstar Array de registros de bem-estar do usuário
 * @returns Array de BemEstarCardProps para o componente BemEstarGrid
 */
export function useBemEstarCards(
  bemEstar: BemEstarEntry[],
): BemEstarCardProps[] {
  if (!bemEstar || bemEstar.length === 0) return []
  const sortedData = [...bemEstar].sort(
    (a, b) =>
      new Date(a.data_registro).getTime() - new Date(b.data_registro).getTime(),
  )
  const calcularMedia = (valores: number[]) => {
    return valores.length > 0
      ? (valores.reduce((a, b) => a + b, 0) / valores.length).toFixed(1)
      : '0'
  }
  const calcularTendencia = (valores: number[]): 'up' | 'down' | 'neutral' => {
    if (valores.length < 2) return 'neutral'
    const primeiro = valores[0]
    const ultimo = valores[valores.length - 1]
    return ultimo > primeiro ? 'up' : ultimo < primeiro ? 'down' : 'neutral'
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
  return [
    {
      label: 'Estresse',
      color: 'red',
      bgColor: 'bg-red-100',
      value: ultimoRegistro.nivel_estresse,
      values: estresseData,
      media: mediaEstresse,
      tendencia: tendenciaEstresse,
      status:
        tendenciaEstresse === 'down'
          ? 'Melhorando'
          : tendenciaEstresse === 'up'
            ? 'Piorando'
            : 'Estável',
    },
    {
      label: 'Motivação',
      color: 'green',
      bgColor: 'bg-green-100',
      value: ultimoRegistro.nivel_motivacao,
      values: motivacaoData,
      media: mediaMotivacao,
      tendencia: tendenciaMotivacao,
      status:
        tendenciaMotivacao === 'up'
          ? 'Melhorando'
          : tendenciaMotivacao === 'down'
            ? 'Piorando'
            : 'Estável',
    },
    {
      label: 'Qualidade do Sono',
      color: 'blue',
      bgColor: 'bg-blue-100',
      value: ultimoRegistro.qualidade_sono,
      values: sonoData,
      media: mediaSono,
      tendencia: tendenciaSono,
      status:
        tendenciaSono === 'up'
          ? 'Melhorando'
          : tendenciaSono === 'down'
            ? 'Piorando'
            : 'Estável',
    },
  ]
}
