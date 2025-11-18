import GamificationCard from '../../components/BemEstar/GamificationCard';
import { useAuth } from '../../contexts/useAuth';
import WelcomeSection from '../../components/Home/WelcomeSection';
import QuickAccessSection from '../../components/Home/QuickAccessSection';
import ProgressSection from '../../components/Home/ProgressSection';
import ResourcesSection from '../../components/Home/ResourcesSection';

export default function Home() {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-7xl mx-auto">
        <WelcomeSection />

        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <QuickAccessSection showCadastro={!user} />
          <ProgressSection />
        </div>

        <ResourcesSection />
      </div>

      <GamificationCard notification={true} />
    </div>
  );
}
