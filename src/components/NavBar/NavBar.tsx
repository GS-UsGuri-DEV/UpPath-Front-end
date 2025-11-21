import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../contexts/useAuth'
import useTheme from '../../hooks/useTheme'
import DarkLightMode from '../Buttons/DarkLightMode'

export default function NavBar() {
  const { user, userData, logout } = useAuth()
  const nav = useNavigate()
  const { isDark } = useTheme()

  async function handleLogout() {
    await logout()
    nav('/')
  }

  const displayName = String(userData?.nome_completo ?? user?.name ?? 'Usuário')

  return (
    <nav className="w-full border-b border-[var(--border-color)] bg-[var(--bg-primary)]">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-2">
        <div className="flex items-center gap-4">
          <Link to="/" className="text-lg font-bold text-[var(--text-primary)]">
            <img
              src={isDark ? '/icon/logo-dark.svg' : '/icon/logo-light.svg'}
              alt="UpPath Logo"
              className="h-24 w-auto"
            />
          </Link>
          <div className="hidden gap-2 sm:flex">
            {!user && (
              <Link
                to="/cadastro"
                className="rounded px-3 py-1 text-sm text-[var(--text-primary)] hover:bg-[var(--bg-secondary)]"
              >
                Cadastro
              </Link>
            )}
            <Link
              to="/"
              className="rounded px-3 py-1 text-sm text-[var(--text-primary)] hover:bg-[var(--bg-secondary)]"
            >
              Home
            </Link>
            <Link
              to="/dashboard"
              className="rounded px-3 py-1 text-sm text-[var(--text-primary)] hover:bg-[var(--bg-secondary)]"
            >
              Dashboard
            </Link>
            <Link
              to="/perfil"
              className="rounded px-3 py-1 text-sm text-[var(--text-primary)] hover:bg-[var(--bg-secondary)]"
            >
              Perfil
            </Link>
            <Link
              to="/faq"
              className="rounded px-3 py-1 text-sm hover:bg-gray-100"
            >
              FAQ
            </Link>
            <Link
              to="/contato"
              className="rounded px-3 py-1 text-sm hover:bg-gray-100"
            >
              Contato
            </Link>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <DarkLightMode />
          {user && (
            <>
              <div className="hidden text-sm text-[var(--text-secondary)] sm:block">
                {displayName}
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => nav('/perfil')}
                  className="rounded bg-[var(--bg-secondary)] px-3 py-1 text-sm text-[var(--text-primary)]"
                >
                  Meu Perfil
                </button>
                <button
                  onClick={handleLogout}
                  className="rounded bg-[var(--bg-tertiary)] px-3 py-1 text-sm text-[var(--text-secondary)]"
                >
                  Sair
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}
