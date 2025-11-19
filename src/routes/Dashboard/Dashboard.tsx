import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { mockDashboardData } from '../../api/mocks/dashboardMock'
import BemEstarDashboard from '../../components/BemEstar/BemEstarDashboard'
import GamificationCard from '../../components/BemEstar/GamificationCard'
import RecomendacoesCard from '../../components/GraphicsDashboard/RecomendacoesCard'
import TrilhasCard from '../../components/GraphicsDashboard/TrilhasCard'
import { useAuth } from '../../contexts/useAuth'
import { useUserDashboard } from '../../hooks/useUserDashboard'
import type { UserDashboard } from '../../types/userDashboard'

/**
 * Dashboard principal do sistema UpPath
 * Exibe métricas de bem-estar, trilhas e recomendações do usuário
 */
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

        {/* Componente Unificado de Bem-estar */}
        <BemEstarDashboard />

        {/* Trilhas e Recomendações (da API Python) */}
        {(displayData || dashboardData) && (
          <>
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
          </>
        )}

        {/* Gamification Card */}
        {showGame && <GamificationCard notification={false} />}
      </div>
    </div>
  )
}
