import { useEffect, useState } from 'react'
import { getUserDashboard } from '../api/services/dashboard'
import type { UserDashboard } from '../types/userDashboard'

export function useUserDashboard(userId: number | string | null | undefined) {
  const [data, setData] = useState<UserDashboard | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let mounted = true
    if (!userId) {
      setData(null)
      setError(null)
      setLoading(false)
      return
    }

    setLoading(true)
    setError(null)

    getUserDashboard(userId)
      .then((d) => {
        if (!mounted) {
          return
        }
        setData(d)
      })
      .catch((err) => {
        if (!mounted) {
          return
        }
        setError(String(err?.message ?? err))
      })
      .finally(() => {
        if (!mounted) {
          return
        }
        setLoading(false)
      })

    return () => {
      mounted = false
    }
  }, [userId])

  return { data, loading, error }
}
