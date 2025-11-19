import { useEffect, useState } from 'react'
import { useAuth } from '../../contexts/useAuth'
import { db } from '../../shared/appwrite'

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
    <section className="flex items-center gap-6 rounded-xl border border-[var(--border-color)] bg-[var(--bg-secondary)] p-6">
      <div className="flex h-28 w-28 items-center justify-center overflow-hidden rounded-full bg-[var(--bg-tertiary)] text-xl font-semibold text-[var(--text-secondary)]">
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
        <h2 className="text-lg font-semibold text-[var(--text-primary)]">
          {displayName}
        </h2>

        {editMode ? (
          <form onSubmit={handleSaveProfile} className="mt-3 space-y-2">
            <div>
              <label className="text-xs font-medium">Email:</label>
              <p className="text-sm text-[var(--text-secondary)]">
                {displayEmail}
              </p>
            </div>
            <div>
              <label className="text-xs font-medium">Nome Completo:</label>
              <input
                type="text"
                value={editNome}
                onChange={(e) => setEditNome(e.target.value)}
                className="w-full rounded border border-[var(--input-border)] p-2 text-sm"
              />
            </div>
            <div>
              <label className="text-xs font-medium">Data de Nascimento:</label>
              <input
                type="date"
                value={editDataNasc}
                onChange={(e) => setEditDataNasc(e.target.value)}
                className="w-full rounded border border-[var(--input-border)] p-2 text-sm"
              />
            </div>
            <div className="flex gap-2">
              <button
                type="submit"
                className="rounded bg-[var(--accent-primary)] px-3 py-1 text-sm text-white hover:bg-[var(--accent-primary-hover)]"
              >
                Salvar
              </button>
              <button
                type="button"
                onClick={() => setEditMode(false)}
                className="rounded bg-[var(--bg-tertiary)] px-3 py-1 text-sm"
              >
                Cancelar
              </button>
            </div>
            {editMessage && (
              <div className="text-sm text-[var(--accent-success)]">
                {editMessage}
              </div>
            )}
          </form>
        ) : (
          <>
            <div className="mt-2 text-sm text-[var(--text-muted)]">
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
              className="mt-3 rounded bg-[var(--accent-indigo)] px-3 py-1 text-sm text-white hover:bg-[var(--accent-indigo-hover)]"
            >
              Editar Perfil
            </button>
          </>
        )}
      </div>
    </section>
  )
}
