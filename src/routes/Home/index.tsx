import GamificationCard from '../../components/BemEstar/GamificationCard'
import { useAuth } from '../../contexts/useAuth'
import WelcomeSection from '../../components/Home/WelcomeSection'
import QuickAccessSection from '../../components/Home/QuickAccessSection'
import ProgressSection from '../../components/Home/ProgressSection'
import ResourcesSection from '../../components/Home/ResourcesSection'

export default function Home() {
  const { user } = useAuth()

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="mx-auto max-w-7xl">
        <WelcomeSection />

        <div className="mb-6 grid gap-6 md:grid-cols-2">
          <QuickAccessSection showCadastro={!user} />
          <ProgressSection />
        </div>

        <ResourcesSection />
      </div>

      <GamificationCard notification={true} />
    </div>
  )
}
