import { useState, useEffect } from 'react'
import { db } from '../../shared/appwrite'
import { useAuth } from '../../contexts/useAuth'

interface ProfileCardProps {
  profileImage: string
  displayName: string
  displayEmail: string
}

export default function ProfileCard({
  profileImage,
  displayName,
  displayEmail,
}: ProfileCardProps) {
  const { userData, checkAuth } = useAuth()
  const [editMode, setEditMode] = useState(false)
  const [editNome, setEditNome] = useState('')
  const [editDataNasc, setEditDataNasc] = useState('')
  const [editMessage, setEditMessage] = useState<string | null>(null)

  const formatDate = (dateStr: string | undefined | null) => {
    if (!dateStr) return '—'
    try {
      return dateStr.split('T')[0]
    } catch {
      return dateStr
    }
  }

  useEffect(() => {
    if (userData) {
      setEditNome(
        String(
          (userData as unknown as Record<string, unknown>)?.nome_completo ?? '',
        ),
      )
      setEditDataNasc(
        formatDate(
          String(
            (userData as unknown as Record<string, unknown>)?.data_nascimento ??
              '',
          ),
        ),
      )
    }
  }, [userData])

  async function handleSaveProfile(e: React.FormEvent) {
    e.preventDefault()
    setEditMessage(null)
    if (!userData?.$id) {
      setEditMessage('Documento do usuário não encontrado')
      return
    }
    try {
      const DB_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID
      const COLLECTION_USERS = import.meta.env.VITE_APPWRITE_COLLECTION_USERS
      await db.updateDocument(DB_ID, COLLECTION_USERS, userData.$id, {
        nome_completo: editNome,
        data_nascimento: editDataNasc,
      })
      setEditMessage('Perfil atualizado com sucesso!')
      setEditMode(false)
      await checkAuth()
    } catch (err) {
      console.error('Error updating profile', err)
      setEditMessage(String((err as Error)?.message ?? err))
    }
  }

  return (
    <section className="flex items-center gap-6 rounded-xl border bg-white p-6">
      <div className="flex h-28 w-28 items-center justify-center overflow-hidden rounded-full bg-gray-100 text-xl font-semibold text-gray-500">
        {profileImage ? (
          <img
            src={profileImage}
            alt="avatar"
            className="h-full w-full object-cover"
            onError={() =>
              console.error('Avatar failed to load:', profileImage)
            }
          />
        ) : (
          <span className="inline-block">
            {displayName
              .split(' ')
              .map((n: string) => n[0])
              .slice(0, 2)
              .join('')}
          </span>
        )}
      </div>
      <div className="flex-1">
        <h2 className="text-lg font-semibold">{displayName}</h2>

        {editMode ? (
          <form onSubmit={handleSaveProfile} className="mt-3 space-y-2">
            <div>
              <label className="text-xs font-medium">Email:</label>
              <p className="text-sm">{displayEmail}</p>
            </div>
            <div>
              <label className="text-xs font-medium">Nome Completo:</label>
              <input
                type="text"
                value={editNome}
                onChange={(e) => setEditNome(e.target.value)}
                className="w-full rounded border p-2 text-sm"
              />
            </div>
            <div>
              <label className="text-xs font-medium">Data de Nascimento:</label>
              <input
                type="date"
                value={editDataNasc}
                onChange={(e) => setEditDataNasc(e.target.value)}
                className="w-full rounded border p-2 text-sm"
              />
            </div>
            <div className="flex gap-2">
              <button
                type="submit"
                className="rounded bg-blue-600 px-3 py-1 text-sm text-white"
              >
                Salvar
              </button>
              <button
                type="button"
                onClick={() => setEditMode(false)}
                className="rounded bg-gray-200 px-3 py-1 text-sm"
              >
                Cancelar
              </button>
            </div>
            {editMessage && (
              <div className="text-sm text-green-600">{editMessage}</div>
            )}
          </form>
        ) : (
          <>
            <div className="mt-2 text-sm text-gray-600">
              <div>
                <span className="font-medium">Email:</span> {displayEmail}
              </div>
              <div>
                <span className="font-medium">Data de Nascimento:</span>{' '}
                {formatDate(
                  String(
                    (userData as unknown as Record<string, unknown>)
                      ?.data_nascimento ?? '',
                  ),
                )}
              </div>
            </div>
            <button
              onClick={() => setEditMode(true)}
              className="mt-3 rounded bg-indigo-600 px-3 py-1 text-sm text-white"
            >
              Editar Perfil
            </button>
          </>
        )}
      </div>
    </section>
  )
}
