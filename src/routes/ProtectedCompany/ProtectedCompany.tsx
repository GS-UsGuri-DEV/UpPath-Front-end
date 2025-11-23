import { Navigate, Outlet } from 'react-router-dom'
import Spinner from '../../components/Spinner/Spinner'
import { useAuth } from '../../contexts/useAuth'

export default function ProtectedCompany() {
  const { user, loading } = useAuth()

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[var(--bg-primary)]">
        <Spinner text="Verificando acesso..." size={40} />
      </div>
    )
  }

  // Verifica se o usuário está logado e se o email corresponde a uma empresa
  // (empresas cadastram usando email_contato, não userData)
  if (!user) {
    return <Navigate to="/login" replace />
  }

  // Se chegou aqui, está autenticado
  // O DashboardEmpresa irá verificar internamente se é empresa válida
  return <Outlet />
}
