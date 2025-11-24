import { useCallback, useEffect, useState } from 'react'
import { FaFire, FaMedal } from 'react-icons/fa'
import { useAuth } from '../../contexts/useAuth'
import type { BemEstarCardProps } from '../../types/graphicsDashboard'
import BemEstarGrid from '../GraphicsDashboard/BemEstarGrid'

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

  const fetchBemEstar = useCallback(async () => {
    setBemError(null)
    setBemLoading(true)
    try {
      const identifier = String(
        (userData as unknown as Record<string, unknown>)?.$id ??
          (userData as unknown as Record<string, unknown>)?.id ??
          (userData as unknown as Record<string, unknown>)?.email ??
          '',
      )

      const userDataObj = userData as unknown as Record<string, unknown>
      const idUserCandidate =
        userDataObj?.id ??
        userDataObj?.ID ??
        userDataObj?.userId ??
        userDataObj?.idUser ??
        userDataObj?.$id ??
        undefined
      const parsedId = Number(idUserCandidate)
      const idUser = Number.isFinite(parsedId) ? parsedId : undefined

      const url = new URL('https://uppath.onrender.com/wellBeing')
      if (idUser !== undefined) {
        url.searchParams.append('idUser', String(idUser))
      } else if (identifier) {
        url.searchParams.append('identifier', identifier)
      }
      if (bemFrom) {
        url.searchParams.append('from', bemFrom)
      }
      if (bemTo) {
        url.searchParams.append('to', bemTo)
      }
      if (bemLimit) {
        url.searchParams.append('limit', bemLimit)
      }

      const resp = await fetch(String(url))
      if (!resp.ok) {
        throw new Error(`API externa retornou ${resp.status}`)
      }
      const data = await resp.json()

      const items = Array.isArray(data) ? data : (data?.data ?? data?.items ?? (data ? [data] : []))

      const filtered = items.filter((r: Record<string, unknown>) => {
        const rId = Number(r.idUser)
        return rId === idUser
      })

      setBemEstar(filtered)
    } catch (err) {
      setBemError(String((err as Error)?.message ?? err))
      setBemEstar(null)
    } finally {
      setBemLoading(false)
    }
  }, [userData, bemFrom, bemTo, bemLimit])

  useEffect(() => {
    if (userData) {
      fetchBemEstar()
    }
  }, [userData, fetchBemEstar])

  const num = (v: unknown) => {
    if (v === null || v === undefined) {
      return NaN
    }
    if (typeof v === 'number') {
      return v
    }
    const s = String(v).replace(',', '.')
    const n = Number(s)
    return Number.isFinite(n) ? n : NaN
  }

  const lastNRecords = (n = 7) => {
    if (!Array.isArray(bemEstar)) {
      return [] as Array<Record<string, unknown>>
    }
    const copy = [...bemEstar]
    copy.sort((a, b) => {
      const da = String(a.data_registro ?? a.DATA_REGISTRO ?? '')
      const db = String(b.data_registro ?? b.DATA_REGISTRO ?? '')
      return new Date(db).getTime() - new Date(da).getTime()
    })
    return copy.slice(0, n)
  }

  const records7 = lastNRecords(7)

  const avg = (arr: number[]) => (arr.length ? arr.reduce((s, v) => s + v, 0) / arr.length : NaN)

  const stressValues = records7.map((r) => {
    const record = r as Record<string, unknown>
    return num(record.stressLevel ?? record.nivel_estresse ?? record.NIVEL_ESTRESSE)
  })
  const motivationValues = records7.map((r) => {
    const record = r as Record<string, unknown>
    return num(record.motivationLevel ?? record.nivel_motivacao ?? record.NIVEL_MOTIVACAO)
  })
  const sleepValues = records7.map((r) => {
    const record = r as Record<string, unknown>
    return num(record.sleepQuality ?? record.qualidade_sono ?? record.QUALIDADE_SONO)
  })

  const avgStress = avg(stressValues.filter((v) => !isNaN(v)))
  const avgMotivation = avg(motivationValues.filter((v) => !isNaN(v)))
  const avgSleep = avg(sleepValues.filter((v) => !isNaN(v)))

  const calculateTrend = (values: number[]): 'up' | 'down' | 'neutral' => {
    const validValues = values.filter((v) => !isNaN(v))
    if (validValues.length < 2) {
      return 'neutral'
    }
    const recent = validValues.slice(0, Math.ceil(validValues.length / 2))
    const older = validValues.slice(Math.ceil(validValues.length / 2))
    const recentAvg = avg(recent)
    const olderAvg = avg(older)
    if (recentAvg > olderAvg + 0.5) {
      return 'up'
    }
    if (recentAvg < olderAvg - 0.5) {
      return 'down'
    }
    return 'neutral'
  }

  const stressTrend = calculateTrend(stressValues)
  const motivationTrend = calculateTrend(motivationValues)
  const sleepTrend = calculateTrend(sleepValues)

  const getStatus = (trend: 'up' | 'down' | 'neutral', isInverted = false): string => {
    if (trend === 'neutral') {
      return 'Estável'
    }
    if (isInverted) {
      return trend === 'down' ? 'Melhorando' : 'Piorando'
    }
    return trend === 'up' ? 'Melhorando' : 'Piorando'
  }

  const computeScore = () => {
    const s = isNaN(avgStress) ? 0 : avgStress
    const m = isNaN(avgMotivation) ? 0 : avgMotivation
    const q = isNaN(avgSleep) ? 0 : avgSleep
    const raw = (10 - s + m + q) / 30
    const score = Math.round(Math.max(0, Math.min(1, raw)) * 100)
    return score
  }

  const score = computeScore()

  const getBadge = (s: number) => {
    if (s >= 71) {
      return { label: 'Ouro', color: 'text-[var(--accent-warning)]' }
    }
    if (s >= 41) {
      return { label: 'Prata', color: 'text-[var(--text-muted)]' }
    }
    return { label: 'Bronze', color: 'text-[var(--accent-warning-dark)]' }
  }
  const badge = getBadge(score)

  const computeStreak = () => {
    if (!Array.isArray(bemEstar) || bemEstar.length === 0) {
      return 0
    }
    const days = new Set<string>()
    bemEstar.forEach((r) => {
      const d = String(r.data_registro ?? r.DATA_REGISTRO ?? '')
      if (!d) {
        return
      }
      const day = new Date(d).toISOString().slice(0, 10)
      days.add(day)
    })
    let streak = 0
    const today = new Date()
    for (let i = 0; i < 365; i++) {
      const d = new Date(today)
      d.setDate(today.getDate() - i)
      const key = d.toISOString().slice(0, 10)
      if (days.has(key)) {
        streak++
      } else {
        break
      }
    }
    return streak
  }

  const streak = computeStreak()

  const recordCount = Array.isArray(bemEstar) ? bemEstar.length : 0

  const invertTrend = (t: 'up' | 'down' | 'neutral'): 'up' | 'down' | 'neutral' => {
    if (t === 'up') {
      return 'down'
    }
    if (t === 'down') {
      return 'up'
    }
    return 'neutral'
  }

  const cards: BemEstarCardProps[] = [
    {
      label: 'Qualidade do Sono',
      color: 'blue',
      bgColor: 'bg-[var(--bg-secondary)]',
      value: isNaN(avgSleep) ? 0 : Math.round(avgSleep * 10) / 10,
      values: sleepValues.filter((v) => !isNaN(v)).reverse(),
      media: isNaN(avgSleep) ? '0.0' : avgSleep.toFixed(1),
      tendencia: sleepTrend,
      status: getStatus(sleepTrend),
    },
    {
      label: 'Motivação',
      color: 'green',
      bgColor: 'bg-[var(--bg-secondary)]',
      value: isNaN(avgMotivation) ? 0 : Math.round(avgMotivation * 10) / 10,
      values: motivationValues.filter((v) => !isNaN(v)).reverse(),
      media: isNaN(avgMotivation) ? '0.0' : avgMotivation.toFixed(1),
      tendencia: motivationTrend,
      status: getStatus(motivationTrend),
    },
    {
      label: 'Nível de Estresse',
      color: 'red',
      bgColor: 'bg-[var(--bg-secondary)]',
      value: isNaN(avgStress) ? 0 : Math.round(avgStress * 10) / 10,
      values: stressValues.filter((v) => !isNaN(v)).reverse(),
      media: isNaN(avgStress) ? '0.0' : avgStress.toFixed(1),
      tendencia: invertTrend(stressTrend),
      status: getStatus(stressTrend, true),
    },
  ]

  return (
    <section className="space-y-6">
      <div className="rounded-xl border border-[var(--border-color)] bg-[var(--bg-secondary)] p-6">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-[var(--text-primary)]">Bem-estar</h2>
          <div className="text-sm text-[var(--text-muted)]">
            {recordCount} registro{recordCount !== 1 ? 's' : ''}
          </div>
        </div>

        <div className="mb-6 flex flex-wrap items-center gap-6">
          <div className="flex items-center gap-4">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-r from-yellow-300 to-red-400 text-4xl">
              <FaMedal className={badge.color} />
            </div>
            <div>
              <div className="text-sm text-[var(--text-muted)]">Score Geral</div>
              <div className="text-3xl font-bold">{score}</div>
              <div className="text-xs text-[var(--text-muted)]">{badge.label}</div>
            </div>
          </div>
          <div className="flex items-center gap-2 rounded-lg border border-[var(--accent-warning-border)] bg-[var(--accent-warning-bg)] px-4 py-3">
            <FaFire className="text-2xl text-[var(--accent-warning)]" />
            <div>
              <div className="text-sm font-medium text-[var(--text-secondary)]">Sequência</div>
              <div className="text-2xl font-bold text-[var(--text-primary)]">
                {streak} dia{streak !== 1 ? 's' : ''}
              </div>
            </div>
          </div>
        </div>

        <div className="border-t pt-4">
          <form
            onSubmit={(e) => {
              e.preventDefault()
              fetchBemEstar()
            }}
            className="flex flex-wrap items-end gap-2"
          >
            <div>
              <label className="text-xs text-[var(--text-muted)]">De:</label>
              <input
                type="date"
                value={bemFrom}
                onChange={(e) => setBemFrom(e.target.value)}
                className="ml-2 rounded border border-[var(--input-border)] px-2 py-1 text-sm"
              />
            </div>
            <div>
              <label className="text-xs text-[var(--text-muted)]">Até:</label>
              <input
                type="date"
                value={bemTo}
                onChange={(e) => setBemTo(e.target.value)}
                className="ml-2 rounded border border-[var(--input-border)] px-2 py-1 text-sm"
              />
            </div>
            <div>
              <label className="text-xs text-[var(--text-muted)]">Limite:</label>
              <input
                type="number"
                min={1}
                value={bemLimit}
                onChange={(e) => setBemLimit(e.target.value)}
                className="ml-2 w-20 rounded border border-[var(--input-border)] px-2 py-1 text-sm"
              />
            </div>
            <button
              type="submit"
              className="rounded bg-[var(--accent-indigo)] px-3 py-1 text-sm text-white hover:bg-[var(--accent-indigo-hover)]"
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
              className="rounded bg-[var(--bg-tertiary)] px-3 py-1 text-sm hover:bg-[var(--bg-secondary)]"
            >
              Limpar
            </button>
            <button
              type="button"
              onClick={() => setShowDetails(!showDetails)}
              className="ml-auto rounded bg-[var(--bg-tertiary)] px-3 py-1 text-sm hover:bg-[var(--bg-secondary)]"
            >
              {showDetails ? 'Ocultar Detalhes' : 'Ver Detalhes'}
            </button>
          </form>
        </div>
      </div>

      {bemLoading && (
        <div className="rounded-xl border border-[var(--border-color)] bg-[var(--bg-secondary)] p-6 text-center">
          <div className="text-[var(--text-muted)]">Carregando...</div>
        </div>
      )}
      {bemError && (
        <div className="rounded-xl border border-[var(--border-color)] bg-[var(--bg-secondary)] p-4">
          <div className="text-[var(--accent-danger)]">Erro: {bemError}</div>
        </div>
      )}

      {!bemLoading && !bemError && <BemEstarGrid cards={cards} />}

      {showDetails && Array.isArray(bemEstar) && bemEstar.length > 0 && (
        <div className="rounded-xl border border-[var(--border-color)] bg-[var(--bg-secondary)] p-6">
          <h3 className="mb-4 font-semibold text-[var(--text-primary)]">Histórico Detalhado</h3>
          <div className="overflow-x-auto text-xs">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-[var(--border-color)]">
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
                  const id = (row['id_registro'] ?? row['ID_REGISTRO'] ?? row.id ?? '—') as
                    | string
                    | number
                  const rowKey =
                    typeof id === 'string' || typeof id === 'number' ? String(id) : `row-${idx}`
                  const data = String(
                    row['data_registro'] ??
                      row['DATA_REGISTRO'] ??
                      row['date'] ??
                      row['createdAt'] ??
                      row['created_at'] ??
                      '—',
                  )
                  const estresse = String(
                    row.stressLevel ?? row['nivel_estresse'] ?? row['NIVEL_ESTRESSE'] ?? '—',
                  )
                  const motivacao = String(
                    row.motivationLevel ?? row['nivel_motivacao'] ?? row['NIVEL_MOTIVACAO'] ?? '—',
                  )
                  const sono = String(
                    row.sleepQuality ?? row['qualidade_sono'] ?? row['QUALIDADE_SONO'] ?? '—',
                  )
                  const obs = String(
                    row.observations ?? row['observacao'] ?? row['OBSERVACAO'] ?? '—',
                  )
                  return (
                    <tr
                      key={rowKey}
                      className="border-b border-[var(--border-color)] hover:bg-[var(--bg-secondary)]"
                    >
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
