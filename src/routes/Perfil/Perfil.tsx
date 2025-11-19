import { useEffect, useState } from 'react'
import Spinner from '../../components/Spinner/Spinner'
import { account } from '../../shared/appwrite'
import type { Models } from 'appwrite'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../contexts/useAuth'
import ProfileCard from '../../components/Perfil/ProfileCard'
import UploadProfileImage from '../../components/Perfil/UploadProfileImage'
import ChangePassword from '../../components/Perfil/ChangePassword'

export default function Perfil() {
  const [me, setMe] = useState<Models.User<Models.Preferences> | null>(null)
  const [loading, setLoading] = useState(true)
  const [fileUrl, setFileUrl] = useState<string | undefined>()
  const nav = useNavigate()
  const { userData } = useAuth()

  useEffect(() => {
    setLoading(true)
    account
      .get()
      .then((user) => {
        setMe(user)
        setLoading(false)
      })
      .catch(() => {
        setLoading(false)
        console.error('Erro ao carregar usuário')
      })
  }, [nav])

  const displayName = String(
    userData?.nome_completo ??
      ((me as unknown as Record<string, unknown>)?.name as string) ??
      '—',
  )
  const displayEmail = String(
    ((me as unknown as Record<string, unknown>)?.email as string) ??
      userData?.email ??
      '—',
  )
  const profileImage = String(
    (userData && (userData.profile_image as unknown)) ?? fileUrl ?? '',
  )

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Spinner text="Carregando perfil..." />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-3xl space-y-6 p-6">
        <h1 className="text-2xl font-bold text-gray-800">Meu Perfil</h1>

        <ProfileCard
          profileImage={profileImage}
          displayName={displayName}
          displayEmail={displayEmail}
        />

        <UploadProfileImage onUploadSuccess={(url) => setFileUrl(url)} />

        <ChangePassword />
      </div>
    </div>
  )
}
