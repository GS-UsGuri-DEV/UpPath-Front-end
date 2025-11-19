import { useEffect, useState } from 'react'
import { useAuth } from '../../contexts/useAuth'
import { db } from '../../shared/appwrite'
import { Query } from 'appwrite'
import { FaMedal, FaFire } from 'react-icons/fa'
import BemEstarGrid from '../GraphicsDashboard/BemEstarGrid'
import type { BemEstarCardProps } from '../../types/graphicsDashboard'

/**
 * Componente unificado de Bem-estar
 * Combina busca de dados, gamificação e visualização moderna
 */
export default function BemEstarDashboard() {
  const { userData } = useAuth()
  const [bemEstar, setBemEstar] = useState<Array<Record<string, unknown>> | null>(null)
  const [bemLoading, setBemLoading] = useState(false)
  const [bemError, setBemError] = useState<string | null>(null)

  const [bemFrom, setBemFrom] = useState<string>('')
  const [bemTo, setBemTo] = useState<string>('')
  const [bemLimit, setBemLimit] = useState<string>('')
  const [showDetails, setShowDetails] = useState(false)

  async function fetchBemEstar() {
    setBemError(null)
    setBemLoading(true)
    try {
      const DB_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID
      const COLLECTION = import.meta.env.VITE_APPWRITE_COLLECTION_BEMESTAR
      if (!DB_ID || !COLLECTION) {
        setBemError('VITE_APPWRITE_COLLECTION_BEMESTAR não configurado')
        setBemEstar(null)
        return
      }

      const identifier = String(
        (userData as unknown as Record<string, unknown>)?.$id ??
          (userData as unknown as Record<string, unknown>)?.email ??
          '',
      )
      const queries: string[] = []
      if (identifier) queries.push(Query.equal('id_usuario', identifier))
      if (bemFrom)
        queries.push(
          Query.greaterThanEqual('data_registro', `${bemFrom}T00:00:00.000Z`),
        )
      if (bemTo)
        queries.push(
          Query.lessThanEqual('data_registro', `${bemTo}T23:59:59.999Z`),
        )
      if (bemLimit) queries.push(Query.limit(Number(bemLimit)))
      queries.push(Query.orderDesc('data_registro'))
      const res = await db.listDocuments(DB_ID, COLLECTION, queries)
      setBemEstar(res.documents ?? res)
    } catch (err) {
      setBemError(String((err as Error)?.message ?? err))
      setBemEstar(null)
    } finally {
      setBemLoading(false)
    }
  }

  useEffect(() => {
    if (userData) fetchBemEstar()
  }, [userData])

  // ----- Helper functions -----
  const num = (v: unknown) => {
    if (v === null || v === undefined) return NaN
    if (typeof v === 'number') return v
    const s = String(v).replace(',', '.')
    const n = Number(s)
    return Number.isFinite(n) ? n : NaN
  }

  const lastNRecords = (n = 7) => {
    if (!Array.isArray(bemEstar)) return [] as Array<Record<string, unknown>>
    const copy = [...bemEstar]
    copy.sort((a, b) => {
      const da = String(a.data_registro ?? a.DATA_REGISTRO ?? '')
      const db = String(b.data_registro ?? b.DATA_REGISTRO ?? '')
      return new Date(db).getTime() - new Date(da).getTime()
    })
    return copy.slice(0, n)
  }

  const records7 = lastNRecords(7)

  const avg = (arr: number[]) =>
    arr.length ? arr.reduce((s, v) => s + v, 0) / arr.length : NaN

  // Extract metrics
  const stressValues = records7.map((r) => num(r.nivel_estresse ?? r.NIVEL_ESTRESSE))
  const motivationValues = records7.map((r) => num(r.nivel_motivacao ?? r.NIVEL_MOTIVACAO))
  const sleepValues = records7.map((r) => num(r.qualidade_sono ?? r.QUALIDADE_SONO))

  const avgStress = avg(stressValues.filter(v => !isNaN(v)))
  const avgMotivation = avg(motivationValues.filter(v => !isNaN(v)))
  const avgSleep = avg(sleepValues.filter(v => !isNaN(v)))

  // Calculate trends
  const calculateTrend = (values: number[]): 'up' | 'down' | 'neutral' => {
    const validValues = values.filter(v => !isNaN(v))
    if (validValues.length < 2) return 'neutral'
    const recent = validValues.slice(0, Math.ceil(validValues.length / 2))
    const older = validValues.slice(Math.ceil(validValues.length / 2))
    const recentAvg = avg(recent)
    const olderAvg = avg(older)
    if (recentAvg > olderAvg + 0.5) return 'up'
    if (recentAvg < olderAvg - 0.5) return 'down'
    return 'neutral'
  }

  const stressTrend = calculateTrend(stressValues)
  const motivationTrend = calculateTrend(motivationValues)
  const sleepTrend = calculateTrend(sleepValues)

  // Calculate status
  const getStatus = (trend: 'up' | 'down' | 'neutral', isInverted = false): string => {
    if (trend === 'neutral') return 'Estável'
    if (isInverted) {
      return trend === 'down' ? 'Melhorando' : 'Piorando'
    }
    return trend === 'up' ? 'Melhorando' : 'Piorando'
  }

  // Score calculation
  const computeScore = () => {
    const s = isNaN(avgStress) ? 0 : avgStress
    const m = isNaN(avgMotivation) ? 0 : avgMotivation
    const q = isNaN(avgSleep) ? 0 : avgSleep
    const raw = (10 - s + m + q) / 30
    const score = Math.round(Math.max(0, Math.min(1, raw)) * 100)
    return score
  }

  const score = computeScore()

  const badge =
    score >= 71
      ? { label: 'Ouro', color: 'text-yellow-500' }
      : score >= 41
        ? { label: 'Prata', color: 'text-gray-400' }
        : { label: 'Bronze', color: 'text-orange-700' }

  // Streak calculation
  const computeStreak = () => {
    if (!Array.isArray(bemEstar) || bemEstar.length === 0) return 0
    const days = new Set<string>()
    bemEstar.forEach((r) => {
      const d = String(r.data_registro ?? r.DATA_REGISTRO ?? '')
      if (!d) return
      const day = new Date(d).toISOString().slice(0, 10)
      days.add(day)
    })
    let streak = 0
    const today = new Date()
    for (let i = 0; i < 365; i++) {
      const d = new Date(today)
      d.setDate(today.getDate() - i)
      const key = d.toISOString().slice(0, 10)
      if (days.has(key)) streak++
      else break
    }
    return streak
  }

  const streak = computeStreak()

  const recordCount = Array.isArray(bemEstar) ? bemEstar.length : 0

  // Prepare cards data for BemEstarGrid
  const cards: BemEstarCardProps[] = [
    {
      label: 'Qualidade do Sono',
      color: 'blue',
      bgColor: 'bg-blue-50',
      value: isNaN(avgSleep) ? 0 : Math.round(avgSleep * 10) / 10,
      values: sleepValues.filter(v => !isNaN(v)).reverse(),
      media: isNaN(avgSleep) ? '0.0' : avgSleep.toFixed(1),
      tendencia: sleepTrend,
      status: getStatus(sleepTrend),
    },
    {
      label: 'Motivação',
      color: 'green',
      bgColor: 'bg-green-50',
      value: isNaN(avgMotivation) ? 0 : Math.round(avgMotivation * 10) / 10,
      values: motivationValues.filter(v => !isNaN(v)).reverse(),
      media: isNaN(avgMotivation) ? '0.0' : avgMotivation.toFixed(1),
      tendencia: motivationTrend,
      status: getStatus(motivationTrend),
    },
    {
      label: 'Nível de Estresse',
      color: 'red',
      bgColor: 'bg-red-50',
      value: isNaN(avgStress) ? 0 : Math.round(avgStress * 10) / 10,
      values: stressValues.filter(v => !isNaN(v)).reverse(),
      media: isNaN(avgStress) ? '0.0' : avgStress.toFixed(1),
      tendencia: stressTrend === 'up' ? 'down' : stressTrend === 'down' ? 'up' : 'neutral',
      status: getStatus(stressTrend, true),
    },
  ]

  return (
    <section className="space-y-6">
      {/* Header with Gamification */}
      <div className="rounded-xl border bg-white p-6">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-semibold">Bem-estar</h2>
          <div className="text-sm text-gray-600">
            {recordCount} registro{recordCount !== 1 ? 's' : ''}
          </div>
        </div>

        {/* Gamification Score */}
        <div className="mb-6 flex flex-wrap items-center gap-6">
          <div className="flex items-center gap-4">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-r from-yellow-300 to-red-400 text-4xl">
              <FaMedal className={badge.color} />
            </div>
            <div>
              <div className="text-sm text-gray-500">Score Geral</div>
              <div className="text-3xl font-bold">{score}</div>
              <div className="text-xs text-gray-600">{badge.label}</div>
            </div>
          </div>
          <div className="flex items-center gap-2 rounded-lg bg-orange-50 px-4 py-3">
            <FaFire className="text-2xl text-orange-500" />
            <div>
              <div className="text-xs text-gray-600">Sequência</div>
              <div className="text-lg font-semibold">
                {streak} dia{streak !== 1 ? 's' : ''}
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="border-t pt-4">
          <form
            onSubmit={(e) => {
              e.preventDefault()
              fetchBemEstar()
            }}
            className="flex flex-wrap items-end gap-2"
          >
            <div>
              <label className="text-xs text-gray-600">De:</label>
              <input
                type="date"
                value={bemFrom}
                onChange={(e) => setBemFrom(e.target.value)}
                className="ml-2 rounded border px-2 py-1 text-sm"
              />
            </div>
            <div>
              <label className="text-xs text-gray-600">Até:</label>
              <input
                type="date"
                value={bemTo}
                onChange={(e) => setBemTo(e.target.value)}
                className="ml-2 rounded border px-2 py-1 text-sm"
              />
            </div>
            <div>
              <label className="text-xs text-gray-600">Limite:</label>
              <input
                type="number"
                min={1}
                value={bemLimit}
                onChange={(e) => setBemLimit(e.target.value)}
                className="ml-2 w-20 rounded border px-2 py-1 text-sm"
              />
            </div>
            <button
              type="submit"
              className="rounded bg-indigo-600 px-3 py-1 text-sm text-white hover:bg-indigo-700"
            >
              Filtrar
            </button>
            <button
              type="button"
              onClick={() => {
                setBemFrom('')
                setBemTo('')
                setBemLimit('')
                fetchBemEstar()
              }}
              className="rounded bg-gray-200 px-3 py-1 text-sm hover:bg-gray-300"
            >
              Limpar
            </button>
            <button
              type="button"
              onClick={() => setShowDetails(!showDetails)}
              className="ml-auto rounded bg-gray-100 px-3 py-1 text-sm hover:bg-gray-200"
            >
              {showDetails ? 'Ocultar Detalhes' : 'Ver Detalhes'}
            </button>
          </form>
        </div>
      </div>

      {/* Loading & Error States */}
      {bemLoading && (
        <div className="rounded-xl border bg-white p-6 text-center">
          <div className="text-gray-600">Carregando...</div>
        </div>
      )}
      {bemError && (
        <div className="rounded-xl border border-red-200 bg-red-50 p-4">
          <div className="text-red-600">Erro: {bemError}</div>
        </div>
      )}

      {/* Visual Cards */}
      {!bemLoading && !bemError && (
        <BemEstarGrid cards={cards} />
      )}

      {/* Detailed Table (collapsible) */}
      {showDetails && Array.isArray(bemEstar) && bemEstar.length > 0 && (
        <div className="rounded-xl border bg-white p-6">
          <h3 className="mb-4 font-semibold">Histórico Detalhado</h3>
          <div className="overflow-x-auto text-xs">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b">
                  <th className="p-2 text-left">Data</th>
                  <th className="p-2 text-left">Estresse</th>
                  <th className="p-2 text-left">Motivação</th>
                  <th className="p-2 text-left">Sono</th>
                  <th className="p-2 text-left">Observação</th>
                </tr>
              </thead>
              <tbody>
                {bemEstar.map((r, idx) => {
                  const row = r as Record<string, unknown>
                  const data = String(row['data_registro'] ?? row['DATA_REGISTRO'] ?? '—')
                  const estresse = String(row['nivel_estresse'] ?? row['NIVEL_ESTRESSE'] ?? '—')
                  const motivacao = String(row['nivel_motivacao'] ?? row['NIVEL_MOTIVACAO'] ?? '—')
                  const sono = String(row['qualidade_sono'] ?? row['QUALIDADE_SONO'] ?? '—')
                  const obs = String(row['observacao'] ?? row['OBSERVACAO'] ?? '—')
                  return (
                    <tr key={idx} className="border-b hover:bg-gray-50">
                      <td className="p-2">{data.slice(0, 10)}</td>
                      <td className="p-2">{estresse}</td>
                      <td className="p-2">{motivacao}</td>
                      <td className="p-2">{sono}</td>
                      <td className="p-2">{obs}</td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </section>
  )
}
