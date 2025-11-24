import { FaBuilding, FaChartBar, FaClipboardList, FaCog, FaLock, FaUsers } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { useAuth } from '../../contexts/useAuth'

export default function AdminPanel() {
  const { userData, logout } = useAuth()

  async function handleLogout() {
    await logout()
    window.location.href = '/'
  }

  return (
    <div className="min-h-screen bg-[var(--bg-primary)]">
      <header className="bg-[var(--bg-secondary)] shadow">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
          <div>
            <h1 className="text-2xl font-bold text-[var(--text-primary)]">Painel Administrativo</h1>
            <p className="text-sm text-[var(--text-muted)]">
              {String(userData?.nome_completo ?? 'Admin')} - Admin
            </p>
          </div>
          <div className="flex gap-3">
            <Link
              to="/dashboard"
              className="rounded bg-[var(--bg-tertiary)] px-4 py-2 text-sm hover:bg-[var(--bg-secondary)]"
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
          <div className="rounded-lg bg-[var(--bg-secondary)] p-6 shadow">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-[var(--text-primary)]">Usuários</h2>
              <FaUsers className="text-2xl text-blue-600" />
            </div>
            <p className="mb-4 text-sm text-[var(--text-muted)]">
              Gerencie usuários cadastrados no sistema
            </p>
            <button className="w-full rounded bg-[var(--accent-primary)] px-4 py-2 text-white hover:bg-[var(--accent-primary-hover)]">
              Ver Usuários
            </button>
          </div>

          <div className="rounded-lg bg-[var(--bg-secondary)] p-6 shadow">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-[var(--text-primary)]">Empresas</h2>
              <FaBuilding className="text-2xl text-blue-600" />
            </div>
            <p className="mb-4 text-sm text-[var(--text-muted)]">Gerencie empresas cadastradas</p>
            <button className="w-full rounded bg-[var(--accent-primary)] px-4 py-2 text-white hover:bg-[var(--accent-primary-hover)]">
              Ver Empresas
            </button>
          </div>

          <div className="rounded-lg bg-[var(--bg-secondary)] p-6 shadow">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-[var(--text-primary)]">Relatórios</h2>
              <FaChartBar className="text-2xl text-blue-600" />
            </div>
            <p className="mb-4 text-sm text-[var(--text-muted)]">
              Visualize estatísticas e relatórios
            </p>
            <button className="w-full rounded bg-[var(--accent-primary)] px-4 py-2 text-white hover:bg-[var(--accent-primary-hover)]">
              Ver Relatórios
            </button>
          </div>

          <div className="rounded-lg bg-[var(--bg-secondary)] p-6 shadow">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-[var(--text-primary)]">Configurações</h2>
              <FaCog className="text-2xl text-blue-600" />
            </div>
            <p className="mb-4 text-sm text-[var(--text-muted)]">Configure parâmetros do sistema</p>
            <button className="w-full rounded bg-[var(--accent-primary)] px-4 py-2 text-white hover:bg-[var(--accent-primary-hover)]">
              Configurar
            </button>
          </div>

          <div className="rounded-lg bg-[var(--bg-secondary)] p-6 shadow">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-[var(--text-primary)]">Permissões</h2>
              <FaLock className="text-2xl text-blue-600" />
            </div>
            <p className="mb-4 text-sm text-[var(--text-muted)]">Gerencie permissões e acessos</p>
            <button className="w-full rounded bg-[var(--accent-primary)] px-4 py-2 text-white hover:bg-[var(--accent-primary-hover)]">
              Gerenciar
            </button>
          </div>

          <div className="rounded-lg bg-[var(--bg-secondary)] p-6 shadow">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-[var(--text-primary)]">Logs do Sistema</h2>
              <FaClipboardList className="text-2xl text-blue-600" />
            </div>
            <p className="mb-4 text-sm text-[var(--text-muted)]">Visualize logs de atividades</p>
            <button className="w-full rounded bg-[var(--accent-primary)] px-4 py-2 text-white hover:bg-[var(--accent-primary-hover)]">
              Ver Logs
            </button>
          </div>
        </div>
      </main>
    </div>
  )
}
