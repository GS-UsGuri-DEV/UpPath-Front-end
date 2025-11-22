import { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { FaUser, FaBars, FaTimes } from 'react-icons/fa'
import { useAuth } from '../../contexts/useAuth'
import useTheme from '../../hooks/useTheme'
import DarkLightMode from '../Buttons/DarkLightMode'

export default function NavBar() {
  const { user, userData, logout } = useAuth()
  const nav = useNavigate()
  const location = useLocation()
  const { isDark } = useTheme()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  async function handleLogout() {
    await logout()
    nav('/')
    setIsMenuOpen(false)
  }

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const closeMenu = () => {
    setIsMenuOpen(false)
  }

  const isActive = (path: string) => location.pathname === path

  const displayName = String(userData?.nome_completo ?? user?.name ?? 'Usuário')

  return (
    <nav className="w-full border-b border-[var(--border-color)] bg-[var(--bg-primary)]">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-2">
        <div className="flex items-center gap-4">
          <Link to="/" className="text-lg font-bold text-[var(--text-primary)]">
            <img
              src={isDark ? '/icon/logo-dark.svg' : '/icon/logo-light.svg'}
              alt="UpPath Logo"
              className="h-16 w-auto sm:h-20 md:h-24"
            />
          </Link>
          {/* Desktop Menu */}
          <div className="hidden gap-2 md:flex">
            {!user && (
              <Link
                to="/cadastro"
                className={`nav-btn ${isActive('/cadastro') ? 'border-b-2 border-indigo-500 bg-[var(--bg-secondary)] font-semibold' : ''}`}
              >
                Cadastro
              </Link>
            )}
            <Link
              to="/"
              className={`nav-btn ${isActive('/') ? 'border-b-2 border-indigo-500 bg-[var(--bg-secondary)] font-semibold' : ''}`}
            >
              Home
            </Link>
            {user && (
              <Link
                to="/dashboard"
                className={`nav-btn ${isActive('/dashboard') ? 'border-b-2 border-indigo-500 bg-[var(--bg-secondary)] font-semibold' : ''}`}
              >
                Dashboard
              </Link>
            )}
            <Link
              to="/cursos"
              className={`nav-btn ${isActive('/cursos') ? 'border-b-2 border-indigo-500 bg-[var(--bg-secondary)] font-semibold' : ''}`}
            >
              Cursos
            </Link>
            <Link
              to="/faq"
              className={`nav-btn ${isActive('/faq') ? 'border-b-2 border-indigo-500 bg-[var(--bg-secondary)] font-semibold' : ''}`}
            >
              FAQ
            </Link>
            <Link
              to="/contato"
              className={`nav-btn ${isActive('/contato') ? 'border-b-2 border-indigo-500 bg-[var(--bg-secondary)] font-semibold' : ''}`}
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
              <div className="hidden items-center gap-2 sm:flex">
                <button
                  onClick={() => nav('/perfil')}
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-[var(--bg-secondary)] text-[var(--text-primary)] transition-colors hover:bg-[var(--bg-tertiary)]"
                  title="Meu Perfil"
                >
                  <FaUser />
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
          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className="flex h-10 w-10 items-center justify-center rounded-lg text-[var(--text-primary)] transition-colors hover:bg-[var(--bg-secondary)] md:hidden"
            aria-label="Menu"
          >
            {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="border-t border-[var(--border-color)] bg-[var(--bg-primary)] md:hidden">
          <div className="flex flex-col space-y-1 px-4 py-3">
            {!user && (
              <Link
                to="/cadastro"
                className={`rounded px-3 py-2 text-[var(--text-primary)] transition-colors hover:bg-[var(--bg-secondary)] ${
                  isActive('/cadastro')
                    ? 'border-l-4 border-indigo-500 bg-[var(--bg-secondary)] font-semibold'
                    : ''
                }`}
                onClick={closeMenu}
              >
                Cadastro
              </Link>
            )}
            <Link
              to="/"
              className={`rounded px-3 py-2 text-[var(--text-primary)] transition-colors hover:bg-[var(--bg-secondary)] ${
                isActive('/')
                  ? 'border-l-4 border-indigo-500 bg-[var(--bg-secondary)] font-semibold'
                  : ''
              }`}
              onClick={closeMenu}
            >
              Home
            </Link>
            {user && (
              <Link
                to="/dashboard"
                className={`rounded px-3 py-2 text-[var(--text-primary)] transition-colors hover:bg-[var(--bg-secondary)] ${
                  isActive('/dashboard')
                    ? 'border-l-4 border-indigo-500 bg-[var(--bg-secondary)] font-semibold'
                    : ''
                }`}
                onClick={closeMenu}
              >
                Dashboard
              </Link>
            )}
            <Link
              to="/cursos"
              className={`rounded px-3 py-2 text-[var(--text-primary)] transition-colors hover:bg-[var(--bg-secondary)] ${
                isActive('/cursos')
                  ? 'border-l-4 border-indigo-500 bg-[var(--bg-secondary)] font-semibold'
                  : ''
              }`}
              onClick={closeMenu}
            >
              Cursos
            </Link>
            <Link
              to="/faq"
              className={`rounded px-3 py-2 text-[var(--text-primary)] transition-colors hover:bg-[var(--bg-secondary)] ${
                isActive('/faq')
                  ? 'border-l-4 border-indigo-500 bg-[var(--bg-secondary)] font-semibold'
                  : ''
              }`}
              onClick={closeMenu}
            >
              FAQ
            </Link>
            <Link
              to="/contato"
              className={`rounded px-3 py-2 text-[var(--text-primary)] transition-colors hover:bg-[var(--bg-secondary)] ${
                isActive('/contato')
                  ? 'border-l-4 border-indigo-500 bg-[var(--bg-secondary)] font-semibold'
                  : ''
              }`}
              onClick={closeMenu}
            >
              Contato
            </Link>
            {user && (
              <>
                <div className="border-t border-[var(--border-color)] pt-3 text-sm text-[var(--text-secondary)]">
                  {displayName}
                </div>
                <button
                  onClick={handleLogout}
                  className="rounded bg-[var(--bg-tertiary)] px-3 py-2 text-left text-[var(--text-secondary)] transition-colors hover:bg-[var(--bg-secondary)]"
                >
                  Sair
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  )
}
