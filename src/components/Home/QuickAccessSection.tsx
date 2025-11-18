import { Link } from 'react-router-dom';
import { FaUser, FaChartBar, FaUsers } from 'react-icons/fa';

interface QuickAccessSectionProps {
  showCadastro: boolean;
}

export default function QuickAccessSection({ showCadastro }: QuickAccessSectionProps) {
  return (
    <section className="rounded-xl border bg-white p-6">
      <h2 className="text-lg font-semibold mb-4">Acesso Rápido</h2>
      <div className="space-y-3">
        <Link to="/perfil" className="block p-3 rounded-lg border hover:border-indigo-500 hover:bg-indigo-50 transition-colors">
          <div className="font-medium text-gray-800 flex items-center gap-2">
            <FaUser /> Meu Perfil
          </div>
          <p className="text-xs text-gray-600">Visualize e edite suas informações</p>
        </Link>
        <Link to="/dashboard" className="block p-3 rounded-lg border hover:border-green-500 hover:bg-green-50 transition-colors">
          <div className="font-medium text-gray-800 flex items-center gap-2">
            <FaChartBar /> Dashboard
          </div>
          <p className="text-xs text-gray-600">Acompanhe seu histórico de bem-estar</p>
        </Link>
        {showCadastro && (
          <Link to="/cadastro" className="block p-3 rounded-lg border hover:border-blue-500 hover:bg-blue-50 transition-colors">
            <div className="font-medium text-gray-800 flex items-center gap-2">
              <FaUsers /> Cadastro
            </div>
            <p className="text-xs text-gray-600">Registrar novos usuários</p>
          </Link>
        )}
      </div>
    </section>
  );
}
