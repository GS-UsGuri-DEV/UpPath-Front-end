import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/useAuth';
import { useState } from 'react';
import BemEstar from '../../components/BemEstar/BemEstar';
import GamificationCard from '../../components/BemEstar/GamificationCard';

export default function Dashboard() {
  const navigate = useNavigate();
  const { userData } = useAuth();
  const [showGame, setShowGame] = useState(false);

  const displayName = String(userData?.nome_completo ?? '—');

  const handleOpenGame = () => {
    sessionStorage.removeItem('hasSeenGame');
    setShowGame(true);
    setTimeout(() => {
      window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
    }, 100);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
            <p className="text-gray-600">Bem-vindo, {displayName}</p>
          </div>
          <div className="flex gap-2">
            <button 
              onClick={handleOpenGame}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
            >
              Novo Registro
            </button>
            <button onClick={() => navigate('/perfil')} className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition-colors">
              Ver Perfil
            </button>
          </div>
        </div>

        {/* Bem-estar component */}
        <BemEstar />

        {/* Gamification Card */}
        {showGame && <GamificationCard notification={false} />}
      </div>
    </div>
  )
}
