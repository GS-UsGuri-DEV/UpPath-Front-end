import { useAuth } from '../../contexts/useAuth';
import { Link } from 'react-router-dom';

export default function AdminPanel() {
  const { userData, logout } = useAuth();

  async function handleLogout() {
    await logout();
    window.location.href = '/';
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Painel Administrativo</h1>
            <p className="text-sm text-gray-600">{userData?.nome_completo} - Admin</p>
          </div>
          <div className="flex gap-3">
            <Link to="/dashboard" className="px-4 py-2 text-sm bg-gray-200 rounded hover:bg-gray-300">
              Voltar ao Dashboard
            </Link>
            <button onClick={handleLogout} className="px-4 py-2 text-sm bg-red-600 text-white rounded hover:bg-red-700">
              Sair
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">Usuários</h2>
              <span className="text-2xl">👥</span>
            </div>
            <p className="text-sm text-gray-600 mb-4">Gerencie usuários cadastrados no sistema</p>
            <button className="w-full px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
              Ver Usuários
            </button>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">Empresas</h2>
              <span className="text-2xl">🏢</span>
            </div>
            <p className="text-sm text-gray-600 mb-4">Gerencie empresas cadastradas</p>
            <button className="w-full px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
              Ver Empresas
            </button>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">Relatórios</h2>
              <span className="text-2xl">📊</span>
            </div>
            <p className="text-sm text-gray-600 mb-4">Visualize estatísticas e relatórios</p>
            <button className="w-full px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
              Ver Relatórios
            </button>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">Configurações</h2>
              <span className="text-2xl">⚙️</span>
            </div>
            <p className="text-sm text-gray-600 mb-4">Configure parâmetros do sistema</p>
            <button className="w-full px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
              Configurar
            </button>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">Permissões</h2>
              <span className="text-2xl">🔐</span>
            </div>
            <p className="text-sm text-gray-600 mb-4">Gerencie permissões e acessos</p>
            <button className="w-full px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
              Gerenciar
            </button>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">Logs do Sistema</h2>
              <span className="text-2xl">📝</span>
            </div>
            <p className="text-sm text-gray-600 mb-4">Visualize logs de atividades</p>
            <button className="w-full px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
              Ver Logs
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
