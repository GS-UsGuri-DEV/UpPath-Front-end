import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../contexts/useAuth'

export default function NavBar() {
  const { user, userData, logout } = useAuth()
  const nav = useNavigate()

  async function handleLogout() {
    await logout()
    nav('/')
  }

  const displayName = String(userData?.nome_completo ?? user?.name ?? 'Usuário')

  return (
    <nav className="w-full border-b bg-white">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3">
        <div className="flex items-center gap-4">
          <Link to="/" className="text-lg font-bold">
            UpPath
          </Link>
          <div className="hidden gap-2 sm:flex">
            {!user && (
              <Link
                to="/cadastro"
                className="rounded px-3 py-1 text-sm hover:bg-gray-100"
              >
                Cadastro
              </Link>
            )}
            <Link
              to="/"
              className="rounded px-3 py-1 text-sm hover:bg-gray-100"
            >
              Home
            </Link>
            <Link
              to="/dashboard"
              className="rounded px-3 py-1 text-sm hover:bg-gray-100"
            >
              Dashboard
            </Link>
            <Link
              to="/perfil"
              className="rounded px-3 py-1 text-sm hover:bg-gray-100"
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
          {user && (
            <>
              <div className="hidden text-sm text-gray-600 sm:block">
                {displayName}
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => nav('/perfil')}
                  className="rounded bg-gray-100 px-3 py-1 text-sm"
                >
                  Meu Perfil
                </button>
                <button
                  onClick={handleLogout}
                  className="rounded bg-gray-800 px-3 py-1 text-sm text-white"
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
