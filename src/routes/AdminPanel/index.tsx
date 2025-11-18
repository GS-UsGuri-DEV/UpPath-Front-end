import { useAuth } from '../../contexts/useAuth'
import { Link } from 'react-router-dom'
import {
  FaUsers,
  FaBuilding,
  FaChartBar,
  FaCog,
  FaLock,
  FaClipboardList,
} from 'react-icons/fa'

export default function AdminPanel() {
  const { userData, logout } = useAuth()

  async function handleLogout() {
    await logout()
    window.location.href = '/'
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Painel Administrativo
            </h1>
            <p className="text-sm text-gray-600">
              {String(userData?.nome_completo ?? 'Admin')} - Admin
            </p>
          </div>
          <div className="flex gap-3">
            <Link
              to="/dashboard"
              className="rounded bg-gray-200 px-4 py-2 text-sm hover:bg-gray-300"
            >
              Voltar ao Dashboard
            </Link>
            <button
              onClick={handleLogout}
              className="rounded bg-red-600 px-4 py-2 text-sm text-white hover:bg-red-700"
            >
              Sair
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-8">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-lg bg-white p-6 shadow">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-semibold">Usuários</h2>
              <FaUsers className="text-2xl text-blue-600" />
            </div>
            <p className="mb-4 text-sm text-gray-600">
              Gerencie usuários cadastrados no sistema
            </p>
            <button className="w-full rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700">
              Ver Usuários
            </button>
          </div>

          <div className="rounded-lg bg-white p-6 shadow">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-semibold">Empresas</h2>
              <FaBuilding className="text-2xl text-blue-600" />
            </div>
            <p className="mb-4 text-sm text-gray-600">
              Gerencie empresas cadastradas
            </p>
            <button className="w-full rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700">
              Ver Empresas
            </button>
          </div>

          <div className="rounded-lg bg-white p-6 shadow">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-semibold">Relatórios</h2>
              <FaChartBar className="text-2xl text-blue-600" />
            </div>
            <p className="mb-4 text-sm text-gray-600">
              Visualize estatísticas e relatórios
            </p>
            <button className="w-full rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700">
              Ver Relatórios
            </button>
          </div>

          <div className="rounded-lg bg-white p-6 shadow">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-semibold">Configurações</h2>
              <FaCog className="text-2xl text-blue-600" />
            </div>
            <p className="mb-4 text-sm text-gray-600">
              Configure parâmetros do sistema
            </p>
            <button className="w-full rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700">
              Configurar
            </button>
          </div>

          <div className="rounded-lg bg-white p-6 shadow">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-semibold">Permissões</h2>
              <FaLock className="text-2xl text-blue-600" />
            </div>
            <p className="mb-4 text-sm text-gray-600">
              Gerencie permissões e acessos
            </p>
            <button className="w-full rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700">
              Gerenciar
            </button>
          </div>

          <div className="rounded-lg bg-white p-6 shadow">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-semibold">Logs do Sistema</h2>
              <FaClipboardList className="text-2xl text-blue-600" />
            </div>
            <p className="mb-4 text-sm text-gray-600">
              Visualize logs de atividades
            </p>
            <button className="w-full rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700">
              Ver Logs
            </button>
          </div>
        </div>
      </main>
    </div>
  )
}
