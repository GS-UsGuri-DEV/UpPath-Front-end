import { useEffect, useState } from 'react'
import { FaTimes, FaUser } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../contexts/useAuth'

export default function LoginNotification() {
  const { user } = useAuth()
  const nav = useNavigate()
  const [mounted, setMounted] = useState(false)
  const [hideCard, setHideCard] = useState(false)

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
      <div className="rounded-xl border-2 border-[var(--accent-indigo)] bg-[var(--bg-secondary)] p-5 shadow-2xl sm:w-[420px] sm:p-6">
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-3 w-3 animate-pulse rounded-full bg-blue-500" />
            <div className="flex items-center gap-3 text-base font-bold text-[var(--text-primary)] sm:text-lg">
              <FaUser className="text-xl text-[var(--accent-indigo)]" />
              <span>Faça login para acessar</span>
            </div>
          </div>
          <button
            onClick={handleClose}
            className="text-lg text-[var(--text-muted)] transition-all duration-200 hover:scale-110 hover:rotate-90 hover:text-red-500"
            title="Fechar"
          >
            <FaTimes />
          </button>
        </div>

        <div className="mb-5">
          <p className="text-sm leading-relaxed text-[var(--text-secondary)] sm:text-base">
            Você precisa fazer login para acessar todos os recursos da plataforma UpPath, incluindo
            trilhas personalizadas, dashboard e muito mais!
          </p>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row">
          <button
            onClick={handleLoginRedirect}
            className="flex-1 transform rounded-lg bg-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-md transition-all duration-300 hover:scale-105 hover:bg-indigo-700 hover:shadow-xl active:scale-95 sm:text-base"
          >
            Fazer Login
          </button>
          <button
            onClick={() => nav('/cadastro')}
            className="flex-1 transform rounded-lg border-2 border-indigo-500 bg-transparent px-6 py-3 text-sm font-semibold text-[var(--text-primary)] shadow-md transition-all duration-300 hover:scale-105 hover:border-indigo-600 hover:bg-indigo-500 hover:text-white hover:shadow-xl active:scale-95 sm:text-base"
          >
            Criar Conta
          </button>
        </div>
      </div>
    </div>
  )
}
