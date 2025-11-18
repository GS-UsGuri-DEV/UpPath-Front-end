import { useState } from 'react'
import { FaBookOpen, FaChartLine, FaLightbulb } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import BemEstar from '../../components/BemEstar/BemEstar'
import GamificationCard from '../../components/BemEstar/GamificationCard'
import { useAuth } from '../../contexts/useAuth'
import { useUserDashboard } from '../../hooks/useUserDashboard'
import type { UserDashboard } from '../../types/userDashboard'
import { mockDashboardData } from '../../api/mocks/dashboardMock'

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
            {/* Gráfico de Evolução do Bem-estar */}
            <div className="rounded-xl border bg-white p-6">
              <div className="mb-4 flex items-center gap-2">
                <FaChartLine className="text-xl text-green-600" />
                <h2 className="text-lg font-semibold">Evolução do Bem-estar</h2>
              </div>
              {displayData.bem_estar && displayData.bem_estar.length > 0 ? (
                <div className="space-y-4">
                  <div className="h-64 w-full">
                    <svg
                      viewBox="0 0 600 250"
                      className="h-full w-full"
                      preserveAspectRatio="xMidYMid meet"
                    >
                      {/* Grid lines */}
                      {[0, 2, 4, 6, 8, 10].map((y) => (
                        <g key={y}>
                          <line
                            x1="50"
                            y1={220 - y * 20}
                            x2="580"
                            y2={220 - y * 20}
                            stroke="#e5e7eb"
                            strokeWidth="1"
                          />
                          <text
                            x="35"
                            y={225 - y * 20}
                            fontSize="10"
                            fill="#6b7280"
                            textAnchor="end"
                          >
                            {y}
                          </text>
                        </g>
                      ))}

                      {/* Data lines */}
                      {(() => {
                        const sortedData = [...displayData.bem_estar].sort(
                          (a, b) =>
                            new Date(a.data_registro).getTime() -
                            new Date(b.data_registro).getTime(),
                        )
                        const maxPoints = 10
                        const data =
                          sortedData.length > maxPoints
                            ? sortedData.slice(-maxPoints)
                            : sortedData
                        const step = 530 / Math.max(data.length - 1, 1)

                        const createPath = (
                          values: number[],
                          color: string,
                        ) => {
                          const points = values
                            .map((v, i) => `${50 + i * step},${220 - v * 20}`)
                            .join(' ')
                          return (
                            <polyline
                              points={points}
                              fill="none"
                              stroke={color}
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          )
                        }

                        return (
                          <>
                            {createPath(
                              data.map((d) => d.nivel_estresse),
                              '#ef4444',
                            )}
                            {createPath(
                              data.map((d) => d.nivel_motivacao),
                              '#10b981',
                            )}
                            {createPath(
                              data.map((d) => d.qualidade_sono),
                              '#3b82f6',
                            )}

                            {/* Data points */}
                            {data.map((entry, i) => (
                              <g key={i}>
                                <circle
                                  cx={50 + i * step}
                                  cy={220 - entry.nivel_estresse * 20}
                                  r="3"
                                  fill="#ef4444"
                                />
                                <circle
                                  cx={50 + i * step}
                                  cy={220 - entry.nivel_motivacao * 20}
                                  r="3"
                                  fill="#10b981"
                                />
                                <circle
                                  cx={50 + i * step}
                                  cy={220 - entry.qualidade_sono * 20}
                                  r="3"
                                  fill="#3b82f6"
                                />
                              </g>
                            ))}

                            {/* X-axis labels */}
                            {data.map((entry, i) => (
                              <text
                                key={i}
                                x={50 + i * step}
                                y="240"
                                fontSize="9"
                                fill="#6b7280"
                                textAnchor="middle"
                              >
                                {new Date(
                                  entry.data_registro,
                                ).toLocaleDateString('pt-BR', {
                                  day: '2-digit',
                                  month: '2-digit',
                                })}
                              </text>
                            ))}
                          </>
                        )
                      })()}
                    </svg>
                  </div>

                  {/* Legend */}
                  <div className="flex items-center justify-center gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <div className="h-3 w-3 rounded-full bg-red-500" />
                      <span className="text-gray-600">Estresse</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="h-3 w-3 rounded-full bg-green-500" />
                      <span className="text-gray-600">Motivação</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="h-3 w-3 rounded-full bg-blue-500" />
                      <span className="text-gray-600">Sono</span>
                    </div>
                  </div>
                </div>
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

        {/* Bem-estar component (Appwrite local data) */}
        <BemEstar />

        {/* Gamification Card */}
        {showGame && <GamificationCard notification={false} />}
      </div>
    </div>
  )
}
