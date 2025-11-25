import { useEffect, useState } from 'react'
import { FaTimes, FaUser } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../contexts/useAuth'
import useTheme from '../../hooks/useTheme'

export default function LoginNotification() {
  const { user } = useAuth()
  const nav = useNavigate()
  const [mounted, setMounted] = useState(false)
  const [hideCard, setHideCard] = useState(false)
  const { isDark } = useTheme()

  useEffect(() => {
    setMounted(true)
    const hasSeenLoginNotification = sessionStorage.getItem('hasSeenLoginNotification')
    if (hasSeenLoginNotification) {
      setHideCard(true)
    }
  }, [])

  const handleLoginRedirect = () => {
    sessionStorage.setItem('hasSeenLoginNotification', 'true')
    nav('/login')
  }

  const handleClose = () => {
    setHideCard(true)
    sessionStorage.setItem('hasSeenLoginNotification', 'true')
  }

  const containerClass = `fixed bottom-4 right-4 left-4 sm:bottom-6 sm:right-6 sm:left-auto z-50 transition-transform duration-600 ${mounted ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'}`

  // Só mostra se o usuário não estiver logado
  if (user || hideCard) {
    return null
  }

  return (
    <div className={containerClass}>
      <div className="rounded-xl border border-[var(--border-color)] bg-[var(--bg-secondary)] p-3 shadow-lg sm:w-80 sm:p-4">
        <div className="mb-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 animate-pulse rounded-full bg-blue-500" />
            <div className="flex items-center gap-2 text-xs font-semibold text-[var(--text-primary)] sm:text-sm">
              <FaUser className="text-[var(--accent-indigo)]" />
              <span className="hidden sm:inline">Faça login para acessar</span>
              <span className="sm:hidden">Faça login</span>
            </div>
            <img
              src={isDark ? '/icon/icon-dark.svg' : '/icon/icon-light.svg'}
              alt="UpPath Icon"
              className="h-5 w-5 sm:h-6 sm:w-6"
            />
          </div>
          <button
            onClick={handleClose}
            className="text-[var(--text-muted)] transition-colors hover:text-[var(--text-secondary)]"
            title="Fechar"
          >
            <FaTimes />
          </button>
        </div>

        <div className="mb-3">
          <p className="text-xs text-[var(--text-secondary)] sm:text-sm">
            Você precisa fazer login para acessar todos os recursos da plataforma UpPath, incluindo
            trilhas personalizadas, dashboard e muito mais!
          </p>
        </div>

        <div className="flex flex-col gap-2 sm:flex-row">
          <button
            onClick={handleLoginRedirect}
            className="flex-1 rounded bg-[var(--accent-indigo)] px-4 py-2 text-xs font-medium text-white transition-colors hover:bg-[var(--accent-indigo-hover)] sm:text-sm"
          >
            Fazer Login
          </button>
          <button
            onClick={() => nav('/cadastro')}
            className="flex-1 rounded border border-[var(--border-color)] bg-[var(--bg-tertiary)] px-4 py-2 text-xs font-medium transition-colors hover:bg-[var(--bg-secondary)] sm:text-sm"
          >
            Criar Conta
          </button>
        </div>
      </div>
    </div>
  )
}
