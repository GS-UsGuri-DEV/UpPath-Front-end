import Spinner from '../../components/Spinner/Spinner'
import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useAuth } from '../../contexts/useAuth'

export default function Protected() {
  const loc = useLocation()
  const { loading, user } = useAuth()

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Spinner text="Carregando..." />
      </div>
    )
  }
  if (!user) {
    return <Navigate to="/login" state={{ from: loc }} replace />
  }
  return <Outlet />
}
