import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FaUser, FaBars, FaTimes } from 'react-icons/fa'
import { useAuth } from '../../contexts/useAuth'
import useTheme from '../../hooks/useTheme'
import DarkLightMode from '../Buttons/DarkLightMode'

export default function NavBar() {
  const { user, userData, logout } = useAuth()
  const nav = useNavigate()
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
          {/* Desktop Menu */}
          <div className="hidden gap-2 md:flex">
            {!user && (
              <Link to="/cadastro" className="nav-btn">
                Cadastro
              </Link>
            )}
            <Link to="/" className="nav-btn">
              Home
            </Link>
            <Link to="/dashboard" className="nav-btn">
              Dashboard
            </Link>
            <Link to="/perfil" className="nav-btn">
              Perfil
            </Link>
            <Link to="/cursos" className="nav-btn">
              Cursos
            </Link>
            <Link to="/faq" className="nav-btn">
              FAQ
            </Link>
            <Link to="/contato" className="nav-btn">
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
                className="rounded px-3 py-2 text-[var(--text-primary)] transition-colors hover:bg-[var(--bg-secondary)]"
                onClick={closeMenu}
              >
                Cadastro
              </Link>
            )}
            <Link
              to="/"
              className="rounded px-3 py-2 text-[var(--text-primary)] transition-colors hover:bg-[var(--bg-secondary)]"
              onClick={closeMenu}
            >
              Home
            </Link>
            <Link
              to="/dashboard"
              className="rounded px-3 py-2 text-[var(--text-primary)] transition-colors hover:bg-[var(--bg-secondary)]"
              onClick={closeMenu}
            >
              Dashboard
            </Link>
            <Link
              to="/perfil"
              className="rounded px-3 py-2 text-[var(--text-primary)] transition-colors hover:bg-[var(--bg-secondary)]"
              onClick={closeMenu}
            >
              Perfil
            </Link>
            <Link
              to="/cursos"
              className="rounded px-3 py-2 text-[var(--text-primary)] transition-colors hover:bg-[var(--bg-secondary)]"
              onClick={closeMenu}
            >
              Cursos
            </Link>
            <Link
              to="/faq"
              className="rounded px-3 py-2 text-[var(--text-primary)] transition-colors hover:bg-[var(--bg-secondary)]"
              onClick={closeMenu}
            >
              FAQ
            </Link>
            <Link
              to="/contato"
              className="rounded px-3 py-2 text-[var(--text-primary)] transition-colors hover:bg-[var(--bg-secondary)]"
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
