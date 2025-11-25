import { useState } from 'react'
import { useAuth } from '../../contexts/useAuth'
import useTheme from '../../hooks/useTheme'
import Spinner from '../Spinner/Spinner'

export default function GamificationCard({ notification = false }: { notification?: boolean }) {
  const { userData } = useAuth()
  const { isDark } = useTheme()
  const [submitLoading, setSubmitLoading] = useState(false)
  const [submitMessage, setSubmitMessage] = useState<string | null>(null)
  const [stress, setStress] = useState<number | ''>('')
  const [motivation, setMotivation] = useState<number | ''>('')
  const [sleepQuality, setSleepQuality] = useState<number | ''>('')
  const [observation, setObservation] = useState<string>('')
  const [hideCard, setHideCard] = useState(false)

  // Verificar se já foi registrado hoje
  const checkIfRegisteredToday = () => {
    const lastRegistered = localStorage.getItem('lastWellBeingRegistration')
    if (lastRegistered) {
      const lastDate = new Date(lastRegistered)
      const today = new Date()
      return (
        lastDate.getDate() === today.getDate() &&
        lastDate.getMonth() === today.getMonth() &&
        lastDate.getFullYear() === today.getFullYear()
      )
    }
    return false
  }

  // Esconder card se já foi registrado hoje
  if (hideCard || checkIfRegisteredToday()) {
    return null
  }
  const containerClass = notification
    ? `fixed bottom-4 right-4 left-4 sm:bottom-6 sm:right-6 sm:left-auto z-50 transition-transform duration-600`
    : `max-w-md mx-auto transition-transform duration-600 ease-out`
  async function registerToday() {
    setSubmitMessage(null)
    setSubmitLoading(true)
    try {
      if (stress === '' || motivation === '' || sleepQuality === '') {
        throw new Error('Preencha Estresse, Motivação e Sono antes de salvar.')
      }
      const s = Number(stress)
      const m = Number(motivation)
      const q = Number(sleepQuality)
      if ([s, m, q].some((v) => Number.isNaN(v) || v < 1 || v > 10)) {
        throw new Error('Estresse, Motivação e Sono devem ser números entre 1 e 10.')
      }
      const userDataObj2 = userData as unknown as Record<string, unknown>
      const idUserCandidate =
        userDataObj2?.id ??
        userDataObj2?.ID ??
        userDataObj2?.userId ??
        userDataObj2?.idUser ??
        userDataObj2?.$id ??
        undefined
      const parsedId = Number(idUserCandidate)
      const idUser = Number.isFinite(parsedId) ? parsedId : undefined
      const apiPayload: Record<string, unknown> = {
        stressLevel: s,
        motivationLevel: m,
        sleepQuality: q,
        observations: observation ?? '',
      }
      if (idUser !== undefined) {
        apiPayload.idUser = idUser
      }
      const token = localStorage.getItem('authToken')
      const headers: Record<string, string> = { 'Content-Type': 'application/json' }
      if (token) {
        headers['Authorization'] = `Bearer ${token}`
      }
      const resp = await fetch('https://uppath.onrender.com/wellBeing', {
        method: 'POST',
        headers,
        body: JSON.stringify(apiPayload),
      })
      if (!resp.ok) {
        const t = await resp.text().catch(() => '')
        throw new Error(`Falha ao enviar para API externa: ${resp.status} ${resp.statusText} ${t}`)
      }
      setSubmitMessage('Registro salvo com sucesso!')
      setStress('')
      setMotivation('')
      setSleepQuality('')
      setObservation('')
      // Salvar data do registro para não mostrar novamente hoje
      localStorage.setItem('lastWellBeingRegistration', new Date().toISOString())
      sessionStorage.setItem('hasSeenGame', 'true')
      // Esconder o card após 2 segundos
      setTimeout(() => setHideCard(true), 2000)
    } catch (err) {
      setSubmitMessage(String((err as Error)?.message ?? err))
    } finally {
      setSubmitLoading(false)
    }
  }
  if (submitLoading) {
    return (
      <div className={containerClass}>
        <div className="rounded-xl border border-[var(--border-color)] bg-[var(--bg-secondary)] p-3 shadow-lg sm:p-4">
          <div className="mt-2 text-center">
            <Spinner text="Carregando..." size={20} />
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className={containerClass}>
      <div
        className={`rounded-xl border border-[var(--border-color)] bg-[var(--bg-secondary)] p-3 shadow-lg sm:p-4 ${notification ? 'sm:w-80' : ''}`}
      >
        <div className="mb-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 animate-pulse rounded-full bg-green-500" />
            <div className="flex items-center gap-2 text-xs font-semibold text-[var(--text-primary)] sm:text-sm">
              <span className="hidden sm:inline">Registre seu bem-estar hoje</span>
              <span className="sm:hidden">Bem-estar hoje</span>
            </div>
          </div>
          <img
            src={isDark ? '/icon/icon-dark.svg' : '/icon/icon-light.svg'}
            alt="UpPath Icon"
            className="h-6 w-6"
          />
        </div>
        <form
          className="flex flex-col gap-2"
          onSubmit={async (e) => {
            e.preventDefault()
            await registerToday()
          }}
        >
          <div className="flex flex-col gap-2 sm:flex-row sm:gap-4">
            <div className="flex flex-col">
              <label htmlFor="stress" className="text-xs font-medium text-[var(--text-secondary)]">
                Estresse
              </label>
              <input
                id="stress"
                type="number"
                min={1}
                max={10}
                value={stress}
                onChange={(e) => setStress(e.target.value === '' ? '' : Number(e.target.value))}
                className="rounded border px-2 py-1 text-xs focus:ring-2 focus:ring-[var(--accent-primary)] focus:outline-none"
                placeholder="1-10"
                required
              />
            </div>
            <div className="flex flex-col">
              <label
                htmlFor="motivation"
                className="text-xs font-medium text-[var(--text-secondary)]"
              >
                Motivação
              </label>
              <input
                id="motivation"
                type="number"
                min={1}
                max={10}
                value={motivation}
                onChange={(e) => setMotivation(e.target.value === '' ? '' : Number(e.target.value))}
                className="rounded border px-2 py-1 text-xs focus:ring-2 focus:ring-[var(--accent-primary)] focus:outline-none"
                placeholder="1-10"
                required
              />
            </div>
            <div className="flex flex-col">
              <label
                htmlFor="sleepQuality"
                className="text-xs font-medium text-[var(--text-secondary)]"
              >
                Sono
              </label>
              <input
                id="sleepQuality"
                type="number"
                min={1}
                max={10}
                value={sleepQuality}
                onChange={(e) =>
                  setSleepQuality(e.target.value === '' ? '' : Number(e.target.value))
                }
                className="rounded border px-2 py-1 text-xs focus:ring-2 focus:ring-[var(--accent-primary)] focus:outline-none"
                placeholder="1-10"
                required
              />
            </div>
          </div>
          <div className="flex flex-col">
            <label
              htmlFor="observation"
              className="text-xs font-medium text-[var(--text-secondary)]"
            >
              Observação
            </label>
            <textarea
              id="observation"
              value={observation}
              onChange={(e) => setObservation(e.target.value)}
              className="rounded border px-2 py-1 text-xs focus:ring-2 focus:ring-[var(--accent-primary)] focus:outline-none"
              rows={2}
              placeholder="Como você está se sentindo hoje?"
            />
          </div>
          <button
            type="submit"
            className="mt-2 rounded bg-[var(--accent-primary)] px-4 py-2 text-xs font-bold text-white shadow hover:bg-[var(--accent-primary-hover)] focus:ring-2 focus:ring-[var(--accent-primary)] focus:outline-none"
            disabled={submitLoading}
          >
            Salvar
          </button>
        </form>
        {submitMessage && !submitMessage.toLowerCase().includes('falha') && (
          <div className="mt-2 text-center text-xs text-[var(--accent-success)]">
            {submitMessage}
          </div>
        )}
      </div>
    </div>
  )
}
