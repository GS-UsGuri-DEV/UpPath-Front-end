import LoginNotification from '../../components/Auth/LoginNotification'
import GamificationCard from '../../components/BemEstar/GamificationCard'
import Footer from '../../components/Footer'
import ProgressSection from '../../components/Home/ProgressSection'
import QuickAccessSection from '../../components/Home/QuickAccessSection'
import ResourcesSection from '../../components/Home/ResourcesSection'
import WelcomeSection from '../../components/Home/WelcomeSection'
import { useAuth } from '../../contexts/useAuth'

export default function Home() {
  const { user } = useAuth()

  return (
    <div className="min-h-screen bg-[var(--bg-primary)]">
      <div className="p-4 sm:p-6">
        <div className="mx-auto max-w-7xl">
          <WelcomeSection />

          <div className="mb-6 grid gap-6 md:grid-cols-2">
            <QuickAccessSection showCadastro={!user} />
            <ProgressSection />
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
