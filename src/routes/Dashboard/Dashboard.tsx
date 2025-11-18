import { useState } from 'react'
import { FaBookOpen, FaChartLine, FaLightbulb } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import { mockDashboardData } from '../../api/mocks/dashboardMock'
import BemEstar from '../../components/BemEstar/BemEstar'
import GamificationCard from '../../components/BemEstar/GamificationCard'
import { useAuth } from '../../contexts/useAuth'
import { useUserDashboard } from '../../hooks/useUserDashboard'
import type { UserDashboard } from '../../types/userDashboard'

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
              ⚠️ Usando dados de exemplo (Oracle vazio). Erro da API:{' '}
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

                  const calcularTendencia = (valores: number[]) => {
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

                  const MiniChart = ({
                    values,
                    color,
                  }: {
                    values: number[]
                    color: string
                  }) => {
                    const maxVal = 10
                    const width = 120
                    const height = 40
                    const step = width / Math.max(values.length - 1, 1)

                    const points = values
                      .map(
                        (v, i) =>
                          `${i * step},${height - (v / maxVal) * height}`,
                      )
                      .join(' ')

                    return (
                      <svg width={width} height={height} className="opacity-30">
                        <polyline
                          points={points}
                          fill="none"
                          stroke={color}
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        {values.map((v, i) => (
                          <circle
                            key={i}
                            cx={i * step}
                            cy={height - (v / maxVal) * height}
                            r="2"
                            fill={color}
                          />
                        ))}
                      </svg>
                    )
                  }

                  const TrendIcon = ({ trend }: { trend: string }) => {
                    if (trend === 'up')
                      return <span className="text-xl text-green-500">↑</span>
                    if (trend === 'down')
                      return <span className="text-xl text-red-500">↓</span>
                    return <span className="text-xl text-gray-400">→</span>
                  }

                  return (
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                      {/* Card Estresse */}
                      <div className="group relative overflow-hidden rounded-xl border-2 border-red-100 bg-gradient-to-br from-red-50 to-white p-6 shadow-sm transition-all hover:shadow-md">
                        <div className="absolute top-4 right-4">
                          <MiniChart values={estresseData} color="#ef4444" />
                        </div>

                        <div className="relative z-10">
                          <div className="mb-2 flex items-center gap-2">
                            <div className="rounded-full bg-red-100 p-2">
                              <div className="h-3 w-3 rounded-full bg-red-500" />
                            </div>
                            <span className="text-sm font-medium text-gray-600">
                              Estresse
                            </span>
                            <TrendIcon trend={tendenciaEstresse} />
                          </div>

                          <div className="mb-3 flex items-baseline gap-2">
                            <span className="text-4xl font-bold text-red-600">
                              {ultimoRegistro.nivel_estresse}
                            </span>
                            <span className="text-gray-500">/10</span>
                          </div>

                          <div className="mb-3 h-2 w-full overflow-hidden rounded-full bg-red-100">
                            <div
                              className="h-full bg-red-500 transition-all duration-500"
                              style={{
                                width: `${(ultimoRegistro.nivel_estresse / 10) * 100}%`,
                              }}
                            />
                          </div>

                          <div className="flex items-center justify-between text-xs text-gray-600">
                            <span>Média: {mediaEstresse}</span>
                            <span
                              className={
                                tendenciaEstresse === 'down'
                                  ? 'font-semibold text-green-600'
                                  : tendenciaEstresse === 'up'
                                    ? 'font-semibold text-red-600'
                                    : ''
                              }
                            >
                              {tendenciaEstresse === 'down'
                                ? 'Melhorando'
                                : tendenciaEstresse === 'up'
                                  ? 'Piorando'
                                  : 'Estável'}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Card Motivação */}
                      <div className="group relative overflow-hidden rounded-xl border-2 border-green-100 bg-gradient-to-br from-green-50 to-white p-6 shadow-sm transition-all hover:shadow-md">
                        <div className="absolute top-4 right-4">
                          <MiniChart values={motivacaoData} color="#10b981" />
                        </div>
                        <div className="relative z-10">
                          <div className="mb-2 flex items-center gap-2">
                            <div className="rounded-full bg-green-100 p-2">
                              <div className="h-3 w-3 rounded-full bg-green-500" />
                            </div>
                            <span className="text-sm font-medium text-gray-600">
                              Motivação
                            </span>
                            <TrendIcon trend={tendenciaMotivacao} />
                          </div>

                          <div className="mb-3 flex items-baseline gap-2">
                            <span className="text-4xl font-bold text-green-600">
                              {ultimoRegistro.nivel_motivacao}
                            </span>
                            <span className="text-gray-500">/10</span>
                          </div>

                          <div className="mb-3 h-2 w-full overflow-hidden rounded-full bg-green-100">
                            <div
                              className="h-full bg-green-500 transition-all duration-500"
                              style={{
                                width: `${(ultimoRegistro.nivel_motivacao / 10) * 100}%`,
                              }}
                            />
                          </div>

                          <div className="flex items-center justify-between text-xs text-gray-600">
                            <span>Média: {mediaMotivacao}</span>
                            <span
                              className={
                                tendenciaMotivacao === 'up'
                                  ? 'font-semibold text-green-600'
                                  : tendenciaMotivacao === 'down'
                                    ? 'font-semibold text-red-600'
                                    : ''
                              }
                            >
                              {tendenciaMotivacao === 'up'
                                ? 'Melhorando'
                                : tendenciaMotivacao === 'down'
                                  ? 'Piorando'
                                  : 'Estável'}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Card Sono */}
                      <div className="group relative overflow-hidden rounded-xl border-2 border-blue-100 bg-gradient-to-br from-blue-50 to-white p-6 shadow-sm transition-all hover:shadow-md">
                        <div className="absolute top-4 right-4">
                          <MiniChart values={sonoData} color="#3b82f6" />
                        </div>
                        <div className="relative z-10">
                          <div className="mb-2 flex items-center gap-2">
                            <div className="rounded-full bg-blue-100 p-2">
                              <div className="h-3 w-3 rounded-full bg-blue-500" />
                            </div>
                            <span className="text-sm font-medium text-gray-600">
                              Qualidade do Sono
                            </span>
                            <TrendIcon trend={tendenciaSono} />
                          </div>

                          <div className="mb-3 flex items-baseline gap-2">
                            <span className="text-4xl font-bold text-blue-600">
                              {ultimoRegistro.qualidade_sono}
                            </span>
                            <span className="text-gray-500">/10</span>
                          </div>

                          <div className="mb-3 h-2 w-full overflow-hidden rounded-full bg-blue-100">
                            <div
                              className="h-full bg-blue-500 transition-all duration-500"
                              style={{
                                width: `${(ultimoRegistro.qualidade_sono / 10) * 100}%`,
                              }}
                            />
                          </div>

                          <div className="flex items-center justify-between text-xs text-gray-600">
                            <span>Média: {mediaSono}</span>
                            <span
                              className={
                                tendenciaSono === 'up'
                                  ? 'font-semibold text-green-600'
                                  : tendenciaSono === 'down'
                                    ? 'font-semibold text-red-600'
                                    : ''
                              }
                            >
                              {tendenciaSono === 'up'
                                ? 'Melhorando'
                                : tendenciaSono === 'down'
                                  ? 'Piorando'
                                  : 'Estável'}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                })()
              ) : (
                <p className="text-sm text-gray-500">
                  Nenhum dado de bem-estar disponível
                </p>
              )}
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {/* Trilhas Card */}
              <div className="rounded-xl border bg-white p-6">
                <div className="mb-4 flex items-center gap-2">
                  <FaBookOpen className="text-xl text-indigo-600" />
                  <h3 className="text-lg font-semibold">Trilhas</h3>
                </div>
                {displayData.trilhas && displayData.trilhas.length > 0 ? (
                  <div className="space-y-3">
                    {displayData.trilhas.map((trilha, idx) => (
                      <div key={idx} className="rounded-lg border p-3">
                        <div className="mb-2 flex items-center justify-between">
                          <span className="font-medium">
                            {trilha.nome_trilha}
                          </span>
                          <span className="text-sm text-gray-600">
                            {trilha.status}
                          </span>
                        </div>
                        <div className="h-2 w-full overflow-hidden rounded-full bg-gray-200">
                          <div
                            className="h-full bg-indigo-600 transition-all"
                            style={{
                              width: `${trilha.progresso_percentual}%`,
                            }}
                          />
                        </div>
                        <div className="mt-1 text-right text-xs text-gray-600">
                          {trilha.progresso_percentual}%
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-gray-500">
                    Nenhuma trilha encontrada
                  </p>
                )}
              </div>

              {/* Recomendações Card */}
              <div className="rounded-xl border bg-white p-6">
                <div className="mb-4 flex items-center gap-2">
                  <FaLightbulb className="text-xl text-yellow-500" />
                  <h3 className="text-lg font-semibold">Recomendações</h3>
                </div>
                {displayData.recomendacoes &&
                displayData.recomendacoes.length > 0 ? (
                  <div className="space-y-3">
                    {displayData.recomendacoes.slice(0, 3).map((rec, idx) => (
                      <div key={idx} className="rounded-lg border p-3">
                        <div className="mb-1 flex items-center justify-between">
                          <span className="text-sm font-medium">
                            {rec.tipo}
                          </span>
                          <span className="text-xs text-gray-500">
                            {new Date(rec.data_recomendacao).toLocaleDateString(
                              'pt-BR',
                            )}
                          </span>
                        </div>
                        <p className="text-xs text-gray-600">{rec.motivo}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-gray-500">
                    Nenhuma recomendação disponível
                  </p>
                )}
              </div>

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
