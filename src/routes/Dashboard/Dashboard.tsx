import { useState } from 'react'
import { FaChartLine } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import { mockDashboardData } from '../../api/mocks/dashboardMock'
import BemEstar from '../../components/BemEstar/BemEstar'
import GamificationCard from '../../components/BemEstar/GamificationCard'
import BemEstarGrid from '../../components/GraphicsDashboard/BemEstarGrid'
import TrilhasCard from '../../components/GraphicsDashboard/TrilhasCard'
import { useAuth } from '../../contexts/useAuth'
import { useUserDashboard } from '../../hooks/useUserDashboard'
import type { BemEstarCardProps } from '../../types/graphicsDashboard'
import type { UserDashboard } from '../../types/userDashboard'
import RecomendacoesCard from '../../components/GraphicsDashboard/RecomendacoesCard'

export default function Dashboard() {
  const navigate = useNavigate()
  const { userData } = useAuth()
  const [showGame, setShowGame] = useState(false)

  // Fetch dashboard data from Python API
  const userId = (userData as unknown as Record<string, unknown>)
    ?.id_usuario as number | string | null | undefined
  const {
    data: dashboardData,
    loading: dashboardLoading,
    error: dashboardError,
  } = useUserDashboard(userId)

  const displayName = String(userData?.nome_completo ?? '—')

  // Use mock data if API returns no data or error
  const displayData: UserDashboard =
    dashboardData &&
    dashboardData.bem_estar &&
    dashboardData.bem_estar.length > 0
      ? dashboardData
      : mockDashboardData

  const handleOpenGame = () => {
    sessionStorage.removeItem('hasSeenGame')
    setShowGame(true)
    setTimeout(() => {
      window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })
    }, 100)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-7xl space-y-6 p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
            <p className="text-gray-600">Bem-vindo, {displayName}</p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={handleOpenGame}
              className="rounded bg-blue-500 px-4 py-2 text-white transition-colors hover:bg-blue-600"
            >
              Novo Registro
            </button>
            <button
              onClick={() => navigate('/perfil')}
              className="rounded bg-indigo-600 px-4 py-2 text-white transition-colors hover:bg-indigo-700"
            >
              Ver Perfil
            </button>
          </div>
        </div>

        {/* API Dashboard Data */}
        {dashboardLoading && (
          <div className="rounded-xl border bg-white p-6 text-center">
            <div className="text-gray-600">
              Carregando dados do dashboard...
            </div>
          </div>
        )}

        {dashboardError && (
          <div className="rounded-xl border border-yellow-200 bg-yellow-50 p-4">
            <p className="text-sm text-yellow-700">
              Usando dados de exemplo (Oracle vazio). Erro da API:{' '}
              {dashboardError}
            </p>
          </div>
        )}

        {(displayData || dashboardData) && (
          <>
            {/* Métricas de Bem-estar - Design Moderno */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <FaChartLine className="text-xl text-green-600" />
                <h2 className="text-lg font-semibold">Evolução do Bem-estar</h2>
              </div>
              {displayData.bem_estar && displayData.bem_estar.length > 0 ? (
                (() => {
                  const sortedData = [...displayData.bem_estar].sort(
                    (a, b) =>
                      new Date(a.data_registro).getTime() -
                      new Date(b.data_registro).getTime(),
                  )
                  const calcularMedia = (valores: number[]) => {
                    return valores.length > 0
                      ? (
                          valores.reduce((a, b) => a + b, 0) / valores.length
                        ).toFixed(1)
                      : '0'
                  }
                  const calcularTendencia = (
                    valores: number[],
                  ): 'up' | 'down' | 'neutral' => {
                    if (valores.length < 2) return 'neutral'
                    const primeiro = valores[0]
                    const ultimo = valores[valores.length - 1]
                    return ultimo > primeiro
                      ? 'up'
                      : ultimo < primeiro
                        ? 'down'
                        : 'neutral'
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
                  const cards: BemEstarCardProps[] = [
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
                  return <BemEstarGrid cards={cards} />
                })()
              ) : (
                <p className="text-sm text-gray-500">
                  Nenhum dado de bem-estar disponível
                </p>
              )}
            </div>
            <TrilhasCard
              trilhas={
                Array.isArray(displayData.trilhas) ? displayData.trilhas : []
              }
            />
            <RecomendacoesCard
              recomendacoes={
                Array.isArray(displayData.recomendacoes)
                  ? displayData.recomendacoes
                  : []
              }
            />

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {/* Bem-estar Summary Card */}
              <div className="rounded-xl border bg-white p-6">
                <div className="mb-4 flex items-center gap-2">
                  <FaChartLine className="text-xl text-green-600" />
                  <h3 className="text-lg font-semibold">Resumo Bem-estar</h3>
                </div>
                {displayData.bem_estar && displayData.bem_estar.length > 0 ? (
                  <div className="space-y-2">
                    {displayData.bem_estar.slice(0, 3).map((entry, idx) => (
                      <div key={idx} className="rounded-lg border p-3 text-sm">
                        <div className="mb-2 text-xs text-gray-500">
                          {new Date(entry.data_registro).toLocaleDateString(
                            'pt-BR',
                          )}
                        </div>
                        <div className="grid grid-cols-3 gap-2 text-xs">
                          <div>
                            <div className="text-gray-600">Estresse</div>
                            <div className="font-semibold">
                              {entry.nivel_estresse}/10
                            </div>
                          </div>
                          <div>
                            <div className="text-gray-600">Motivação</div>
                            <div className="font-semibold">
                              {entry.nivel_motivacao}/10
                            </div>
                          </div>
                          <div>
                            <div className="text-gray-600">Sono</div>
                            <div className="font-semibold">
                              {entry.qualidade_sono}/10
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-gray-500">
                    Nenhum registro de bem-estar
                  </p>
                )}
              </div>
            </div>
          </>
        )}

        <BemEstar />

        {/* Gamification Card */}
        {showGame && <GamificationCard notification={false} />}
      </div>
    </div>
  )
}
