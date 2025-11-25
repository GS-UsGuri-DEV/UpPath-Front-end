import LoginNotification from '../../components/Auth/LoginNotification'
import GamificationCard from '../../components/BemEstar/GamificationCard'
import Footer from '../../components/Footer/Footer'
import ProgressSection from '../../components/Home/ProgressSection'
import QuickAccessSection from '../../components/Home/QuickAccessSection'
import ResourcesSection from '../../components/Home/ResourcesSection'
import WelcomeSection from '../../components/Home/WelcomeSection'
import { useAuth } from '../../contexts/useAuth'
import { useUserDashboard } from '../../hooks/useUserDashboard'

export default function Home() {
  const { user, userData } = useAuth()
  const userDataObj = userData as unknown as Record<string, unknown>
  const userId = (userDataObj?.id ??
    userDataObj?.ID ??
    userDataObj?.userId ??
    userDataObj?.idUser ??
    userDataObj?.$id) as number | string | null | undefined
  const { data: dashboardData } = useUserDashboard(userId)

  return (
    <div className="min-h-screen bg-[var(--bg-primary)]">
      <div className="p-4 sm:p-6">
        <div className="mx-auto max-w-7xl">
          <WelcomeSection />

          <div className="mb-6 grid gap-6 md:grid-cols-2">
            <QuickAccessSection showCadastro={!user} />
            <ProgressSection bemEstarData={dashboardData?.bem_estar ?? []} />
          </div>

          <ResourcesSection />
        </div>

        {/* Mostra notificação de login se usuário não estiver logado */}
        {!user && <LoginNotification />}

        {/* Mostra gamificação se usuário estiver logado */}
        {user && <GamificationCard notification />}
      </div>

      <Footer />
    </div>
  )
}
