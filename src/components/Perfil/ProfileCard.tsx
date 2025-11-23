import { useEffect, useState } from 'react'
import { useAuth } from '../../contexts/useAuth'
import { put, get } from '../../api/client'

import type { ProfileCardProps } from '../../types/profile'

export default function ProfileCard({
  profileImage,
  displayName,
  displayEmail,
}: ProfileCardProps) {
  const { userData, checkAuth } = useAuth()
  const [editMode, setEditMode] = useState(false)
  const [editNome, setEditNome] = useState('')
  const [editEmail, setEditEmail] = useState('')
  const [editDataNasc, setEditDataNasc] = useState('')
  const [editMessage, setEditMessage] = useState<string | null>(null)

  const formatDate = (dateStr: string | undefined | null) => {
    if (!dateStr) return '—'
    try {
      const d = String(dateStr).split('T')[0]
      const parts = d.split('-')
      if (parts.length >= 3) return `${parts[2]}/${parts[1]}/${parts[0]}`
      return d
    } catch {
      return dateStr
    }
  }

  function findDateField(obj: any) {
    if (!obj) return ''
    const candidates = [
      'data_nascimento',
      'dataNasc',
      'dataNascimento',
      'birthDate',
      'birthdate',
      'birth_date',
      'nascimento',
    ]
    for (const k of candidates) {
      if (obj[k]) return obj[k]
    }
    for (const key of Object.keys(obj)) {
      if (/birth|nasc/i.test(key) && obj[key]) return obj[key]
    }
    return ''
  }

  function toDateInput(value: string | undefined | null) {
    if (!value) return ''
    const v = String(value).trim()
    if (/^\d{4}-\d{2}-\d{2}/.test(v)) return v.split('T')[0]
    if (/^\d{2}\/\d{2}\/\d{4}$/.test(v)) {
      const [d, m, y] = v.split('/')
      return `${y}-${m}-${d}`
    }
    const dt = new Date(v)
    if (!Number.isNaN(dt.getTime())) return dt.toISOString().slice(0, 10)
    return ''
  }

  useEffect(() => {
    if (userData) {
      setEditNome(String((userData as unknown as Record<string, unknown>)?.nome_completo ?? (userData as any)?.name ?? ''))
      setEditEmail(String((userData as unknown as Record<string, unknown>)?.email ?? (userData as any)?.email ?? ''))
      const rawDate = findDateField(userData as any)
      setEditDataNasc(toDateInput(String(rawDate)))
    }
  }, [userData])

  async function handleSaveProfile(e: React.FormEvent) {
    e.preventDefault()
    setEditMessage(null)
    const u = userData as unknown as Record<string, any>
    const id = u?.id_usuario ?? u?.id ?? u?._id ?? u?.idUser ?? u?.id_user
    if (!id) {
      setEditMessage('ID do usuário não encontrado')
      return
    }

    try {
      const token = localStorage.getItem('authToken')
      const headers = token ? { Authorization: `Bearer ${token}` } : undefined

      const payload: Record<string, unknown> = {
        name: editNome,
        email: editEmail,
        birthDate: editDataNasc,
      }

      console.debug('PUT /users/{id} payload:', { id, payload, headers })
      const putRes = await put(`https://uppath.onrender.com/users/${id}`, payload, headers)
      console.debug('PUT /users/{id} response:', putRes)

      try {
        const updated = await get(`https://uppath.onrender.com/users/${id}`, headers)
        console.debug('GET /users/{id} response:', updated)
        if (updated) {
          localStorage.setItem('userData', JSON.stringify(updated))
        }
      } catch (e) {
        console.warn('Could not fetch updated user after save', e)
      }

      setEditMessage(
        typeof putRes === 'object'
          ? `Perfil atualizado com sucesso! (id: ${id})`
          : `${String(putRes ?? 'Perfil atualizado')} (id: ${id})`,
      )
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
              <input
                type="email"
                value={editEmail}
                onChange={(e) => setEditEmail(e.target.value)}
                className="w-full rounded border border-[var(--input-border)] p-2 text-sm"
              />
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
                {formatDate(String(findDateField(userData as any) ?? ''))}
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
