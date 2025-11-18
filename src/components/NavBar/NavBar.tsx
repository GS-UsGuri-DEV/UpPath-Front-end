import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/useAuth';

export default function NavBar() {
  const { user, userData, logout } = useAuth();
  const nav = useNavigate();

  async function handleLogout() {
    await logout();
    nav('/');
  }

  const displayName = String(userData?.nome_completo ?? user?.name ?? 'Usuário');

  return (
    <nav className="w-full bg-white border-b">
      <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link to="/dashboard" className="text-lg font-bold">UpPath</Link>
          <div className="hidden sm:flex gap-2">
            <Link to="/" className="text-sm px-3 py-1 rounded hover:bg-gray-100">Home</Link>
            <Link to="/dashboard" className="text-sm px-3 py-1 rounded hover:bg-gray-100">Perfil</Link>
            <Link to="/cadastro" className="text-sm px-3 py-1 rounded hover:bg-gray-100">Cadastro</Link>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden sm:block text-sm text-gray-600">{displayName}</div>
          <div className="flex items-center gap-2">
            <button onClick={() => nav('/dashboard')} className="px-3 py-1 rounded bg-gray-100 text-sm">Meu Perfil</button>
            <button onClick={handleLogout} className="px-3 py-1 rounded bg-gray-800 text-white text-sm">Sair</button>
          </div>
        </div>
      </div>
    </nav>
  );
}
