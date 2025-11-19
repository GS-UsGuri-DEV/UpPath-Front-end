import { useEffect, useState } from 'react'
import Spinner from '../../components/Spinner/Spinner'
import { account } from '../../shared/appwrite'
import { Navigate, Outlet, useLocation } from 'react-router-dom'

export default function Protected() {
  const [loading, setLoading] = useState(true)
  const [ok, setOk] = useState(false)
  const loc = useLocation()

  useEffect(() => {
    account
      .get()
      .then(() => setOk(true))
      .catch(() => setOk(false))
      .finally(() => setLoading(false))
  }, [])

  if (loading)
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Spinner text="Carregando..." />
      </div>
    )
  if (!ok) return <Navigate to="/login" state={{ from: loc }} replace />
  return <Outlet />
}
