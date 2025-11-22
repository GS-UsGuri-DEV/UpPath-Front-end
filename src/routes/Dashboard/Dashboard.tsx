import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { mockDashboardData } from '../../api/mocks/dashboardMock'
import BemEstarDashboard from '../../components/BemEstar/BemEstarDashboard'
import GamificationCard from '../../components/BemEstar/GamificationCard'
import RecomendacoesCard from '../../components/GraphicsDashboard/RecomendacoesCard'
import TrilhasCard from '../../components/GraphicsDashboard/TrilhasCard'
import Spinner from '../../components/Spinner/Spinner'
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

  const userId = (userData as unknown as Record<string, unknown>)
    ?.id_usuario as number | string | null | undefined
  const {
    data: dashboardData,
    loading: dashboardLoading,
    error: dashboardError,
  } = useUserDashboard(userId)

  const displayName = String(userData?.nome_completo ?? '—')

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
    <div className="min-h-screen bg-[var(--bg-primary)]">
      <div className="mx-auto max-w-7xl space-y-4 p-4 sm:space-y-6 sm:p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-[var(--text-primary)]">
              Dashboard
            </h1>
            <p className="text-[var(--text-muted)]">Bem-vindo, {displayName}</p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={handleOpenGame}
              className="rounded bg-[var(--accent-primary)] px-4 py-2 text-white transition-colors hover:bg-[var(--accent-primary-hover)]"
            >
              Novo Registro
            </button>
            <button
              onClick={() => navigate('/perfil')}
              className="rounded bg-[var(--accent-indigo)] px-4 py-2 text-white transition-colors hover:bg-[var(--accent-indigo-hover)]"
            >
              Ver Perfil
            </button>
          </div>
        </div>

        {dashboardLoading && (
          <div className="be rounded-xl p-6 text-center">
            <Spinner text="Carregando dados..." />
          </div>
        )}

        {dashboardError && (
          <div className="rounded-xl border border-[var(--border-color)] bg-[var(--accent-warning-bg)] p-4">
            <p className="text-sm text-[var(--accent-warning-dark)]">
              Usando dados de exemplo (Oracle vazio). Erro da API:{' '}
              {dashboardError}
            </p>
          </div>
        )}

        <BemEstarDashboard />

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

        {showGame && <GamificationCard notification={false} />}
      </div>
    </div>
  )
}
