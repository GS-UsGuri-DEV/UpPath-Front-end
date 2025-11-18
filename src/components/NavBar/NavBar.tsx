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
          <Link to="/" className="text-lg font-bold">UpPath</Link>
          <div className="hidden sm:flex gap-2">
            {!user && (
              <Link to="/cadastro" className="text-sm px-3 py-1 rounded hover:bg-gray-100">Cadastro</Link>
            )}
            <Link to="/" className="text-sm px-3 py-1 rounded hover:bg-gray-100">Home</Link>
            <Link to="/dashboard" className="text-sm px-3 py-1 rounded hover:bg-gray-100">Dashboard</Link>
            <Link to="/perfil" className="text-sm px-3 py-1 rounded hover:bg-gray-100">Perfil</Link>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {user && (
            <>
              <div className="hidden sm:block text-sm text-gray-600">{displayName}</div>
              <div className="flex items-center gap-2">
                <button onClick={() => nav('/perfil')} className="px-3 py-1 rounded bg-gray-100 text-sm">Meu Perfil</button>
                <button onClick={handleLogout} className="px-3 py-1 rounded bg-gray-800 text-white text-sm">Sair</button>
              </div>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}
