import { Query } from 'appwrite'
import { useEffect, useState } from 'react'
import { FaTimes } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../contexts/useAuth'
import { db, ID, Permission, Role } from '../../shared/appwrite'
import Spinner from '../Spinner/Spinner'

export default function GamificationCard({
  notification = false,
}: {
  notification?: boolean
}) {
  const { userData } = useAuth()
  const nav = useNavigate()
  const [records, setRecords] = useState<Array<Record<string, unknown>> | null>(
    null,
  )
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [mounted, setMounted] = useState(false)
  const [submitLoading, setSubmitLoading] = useState(false)
  const [submitMessage, setSubmitMessage] = useState<string | null>(null)
  const [stress, setStress] = useState<number | ''>('')
  const [motivation, setMotivation] = useState<number | ''>('')
  const [sleepQuality, setSleepQuality] = useState<number | ''>('')
  const [observation, setObservation] = useState<string>('')
  const [registeredOnce, setRegisteredOnce] = useState(false)
  const [hideCard, setHideCard] = useState(false) // New state to hide the card

  useEffect(() => {
    setMounted(true)
    const hasSeenGame = sessionStorage.getItem('hasSeenGame')
    if (hasSeenGame) {
      setHideCard(true)
    }
  }, [])

  async function fetchLatest() {
    setError(null)
    setLoading(true)
    try {
      const DB_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID
      const COLLECTION = import.meta.env.VITE_APPWRITE_COLLECTION_BEMESTAR
      if (!DB_ID || !COLLECTION)
        throw new Error('VITE_APPWRITE_COLLECTION_BEMESTAR não configurado')
      const identifier = String(
        (userData as unknown as Record<string, unknown>)?.$id ??
          (userData as unknown as Record<string, unknown>)?.email ??
          '',
      )
      const queries: string[] = []
      if (identifier) queries.push(Query.equal('id_usuario', identifier))
      queries.push(Query.orderDesc('data_registro'))
      queries.push(Query.limit(7))
      const res = await db.listDocuments(DB_ID, COLLECTION, queries)
      setRecords(res.documents ?? res)
    } catch (err) {
      setError(String((err as Error)?.message ?? err))
      setRecords(null)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (userData) fetchLatest()
  }, [userData])

  // Register a new bem_estar entry (quick add from Home)
  async function registerToday() {
    setSubmitMessage(null)
    setSubmitLoading(true)
    try {
      const DB_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID
      const COLLECTION = import.meta.env.VITE_APPWRITE_COLLECTION_BEMESTAR
      if (!DB_ID || !COLLECTION)
        throw new Error('VITE_APPWRITE_COLLECTION_BEMESTAR não configurado')
      const identifier = String(
        (userData as unknown as Record<string, unknown>)?.$id ??
          (userData as unknown as Record<string, unknown>)?.email ??
          '',
      )
      // Validate required numeric fields
      if (stress === '' || motivation === '' || sleepQuality === '') {
        throw new Error('Preencha Estresse, Motivação e Sono antes de salvar.')
      }
      const s = Number(stress)
      const m = Number(motivation)
      const q = Number(sleepQuality)
      if ([s, m, q].some((v) => Number.isNaN(v) || v < 0 || v > 10)) {
        throw new Error(
          'Estresse, Motivação e Sono devem ser números entre 0 e 10.',
        )
      }

      const payload: Record<string, unknown> = {
        id_usuario: identifier || 'unknown',
        data_registro: new Date().toISOString(),
        nivel_estresse: s,
        nivel_motivacao: m,
        qualidade_sono: q,
        observacao: observation ?? '',
      }

      // Appwrite permissions: use Permission helpers with Role
      const permissions = [
        Permission.read(Role.any()),
        Permission.write(Role.users()),
      ]

      await (db as any).createDocument(
        DB_ID,
        COLLECTION,
        ID.unique(),
        payload,
        permissions,
      )
      setSubmitMessage('Registro salvo com sucesso!')
      setStress('')
      setMotivation('')
      setSleepQuality('')
      setObservation('')
      setRegisteredOnce(true)
      setHideCard(true) // Hide the card after successful submission
      sessionStorage.setItem('hasSeenGame', 'true') // Mark as seen in session storage
      await fetchLatest()
    } catch (err) {
      setSubmitMessage(String((err as Error)?.message ?? err))
    } finally {
      setSubmitLoading(false)
    }
  }

  const num = (v: unknown) => {
    if (v === null || v === undefined) return NaN
    if (typeof v === 'number') return v
    const s = String(v).replace(',', '.')
    const n = Number(s)
    return Number.isFinite(n) ? n : NaN
  }

  const avg = (arr: number[]) =>
    arr.length ? arr.reduce((s, v) => s + v, 0) / arr.length : NaN

  const records7 = Array.isArray(records) ? records : []
  // Calcular médias (útil se quiser exibir futuramente)
  const avgStress = avg(
    records7.map((r) => num(r.nivel_estresse ?? r.NIVEL_ESTRESSE)),
  )
  const avgMotivation = avg(
    records7.map((r) => num(r.nivel_motivacao ?? r.NIVEL_MOTIVACAO)),
  )
  const avgSleep = avg(
    records7.map((r) => num(r.qualidade_sono ?? r.QUALIDADE_SONO)),
  )

  // Pode usar as médias acima para calcular score/badge se quiser mostrar no futuro
  void avgStress
  void avgMotivation
  void avgSleep

  const containerClass = notification
    ? `fixed bottom-6 right-6 z-50 transition-transform duration-600 ${mounted ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'}`
    : `max-w-md mx-auto transition-transform duration-600 ease-out ${mounted ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'}`

  if (!userData || hideCard) return null // Hide component if user is not logged in or card is hidden

  return (
    <div className={containerClass}>
      <div
        className={`rounded-xl border border-[var(--border-color)] bg-[var(--bg-secondary)] p-4 shadow-lg ${notification ? 'w-80' : ''}`}
      >
        <div className="mb-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 animate-pulse rounded-full bg-green-500" />
            <div className="text-sm font-semibold text-[var(--text-primary)]">
              Registre seu bem-estar hoje
            </div>
          </div>
          <button
            onClick={() => setHideCard(true)}
            className="text-[var(--text-muted)] transition-colors hover:text-[var(--text-secondary)]"
            title="Minimizar"
          >
            <FaTimes />
          </button>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault()
            registerToday()
          }}
          className="grid grid-cols-1 gap-2"
        >
          <div className="flex gap-2">
            <label className="flex-1 text-xs">
              Estresse (0-10)
              <input
                type="number"
                min={0}
                max={10}
                value={stress}
                onChange={(e) =>
                  setStress(e.target.value === '' ? '' : Number(e.target.value))
                }
                className="mt-1 w-full rounded border border-[var(--input-border)] p-2 text-sm"
                required
              />
            </label>
            <label className="flex-1 text-xs">
              Motivação (0-10)
              <input
                type="number"
                min={0}
                max={10}
                value={motivation}
                onChange={(e) =>
                  setMotivation(
                    e.target.value === '' ? '' : Number(e.target.value),
                  )
                }
                className="mt-1 w-full rounded border border-[var(--input-border)] p-2 text-sm"
                required
              />
            </label>
          </div>
          <div className="flex gap-2">
            <label className="flex-1 text-xs">
              Sono (0-10)
              <input
                type="number"
                min={0}
                max={10}
                value={sleepQuality}
                onChange={(e) =>
                  setSleepQuality(
                    e.target.value === '' ? '' : Number(e.target.value),
                  )
                }
                className="mt-1 w-full rounded border border-[var(--input-border)] p-2 text-sm"
                required
              />
            </label>
            <label className="flex-1 text-xs">
              Observação
              <input
                type="text"
                value={observation}
                onChange={(e) => setObservation(e.target.value)}
                className="mt-1 w-full rounded border border-[var(--input-border)] p-2 text-sm"
              />
            </label>
          </div>
          <div className="mt-1 flex items-center gap-2">
            {!registeredOnce ? (
              <button
                type="submit"
                disabled={submitLoading}
                className="flex-1 rounded bg-[var(--accent-success)] px-3 py-2 text-sm font-medium text-white transition-colors hover:bg-[var(--accent-success-hover)]"
              >
                {submitLoading ? 'Salvando...' : 'Registrar hoje'}
              </button>
            ) : (
              <button
                type="button"
                onClick={() => nav('/dashboard')}
                className="flex-1 rounded bg-[var(--accent-indigo)] px-3 py-2 text-sm font-medium text-white transition-colors hover:bg-[var(--accent-indigo-hover)]"
              >
                Registrar mais
              </button>
            )}
            <button
              type="button"
              onClick={() => {
                setStress('')
                setMotivation('')
                setSleepQuality('')
                setObservation('')
                setSubmitMessage(null)
              }}
              className="rounded bg-[var(--bg-tertiary)] px-3 py-2 text-sm transition-colors hover:bg-[var(--bg-secondary)]"
            >
              Limpar
            </button>
          </div>
          {submitMessage && (
            <div className="text-center text-sm text-[var(--accent-success)]">
              {submitMessage}
            </div>
          )}
        </form>

        {loading && (
          <div className="mt-2 text-center">
            <Spinner text="Carregando..." size={24} />
          </div>
        )}
        {error && (
          <div className="mt-2 text-center text-xs text-[var(--accent-danger)]">
            {error}
          </div>
        )}
      </div>
    </div>
  )
}
