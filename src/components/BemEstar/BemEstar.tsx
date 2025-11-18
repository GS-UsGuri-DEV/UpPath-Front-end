import { useEffect, useState } from 'react';
import { useAuth } from '../../contexts/useAuth';
import { db } from '../../shared/appwrite';
import { Query } from 'appwrite';
import { FaMedal, FaFire } from 'react-icons/fa';

// Simple gamified panel for Bem-estar based on last 7 days of records.
export default function BemEstar() {
  const { userData } = useAuth()
  const [bemEstar, setBemEstar] = useState<Array<
    Record<string, unknown>
  > | null>(null)
  const [bemLoading, setBemLoading] = useState(false)
  const [bemError, setBemError] = useState<string | null>(null)

  const [bemFrom, setBemFrom] = useState<string>('')
  const [bemTo, setBemTo] = useState<string>('')
  const [bemLimit, setBemLimit] = useState<string>('')

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

  // ----- Gamification calculations -----
  // Helper to parse numeric fields safely
  const num = (v: unknown) => {
    if (v === null || v === undefined) return NaN
    if (typeof v === 'number') return v
    const s = String(v).replace(',', '.')
    const n = Number(s)
    return Number.isFinite(n) ? n : NaN
  }

  // Return last N records (by data_registro)
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

  const avgStress = avg(
    records7.map((r) => num(r.nivel_estresse ?? r.NIVEL_ESTRESSE)),
  )
  const avgMotivation = avg(
    records7.map((r) => num(r.nivel_motivacao ?? r.NIVEL_MOTIVACAO)),
  )
  const avgSleep = avg(
    records7.map((r) => num(r.qualidade_sono ?? r.QUALIDADE_SONO)),
  )

  // Score formula, assuming scale 0-10 for each metric
  const computeScore = () => {
    const s = isNaN(avgStress) ? 0 : avgStress
    const m = isNaN(avgMotivation) ? 0 : avgMotivation
    const q = isNaN(avgSleep) ? 0 : avgSleep
    // normalize to 0-100
    const raw = (10 - s + m + q) / 30 // value 0..1
    const score = Math.round(Math.max(0, Math.min(1, raw)) * 100)
    return score
  }

  const score = computeScore()

  const badge = score >= 71 ? { label: 'Ouro', color: 'text-yellow-500' } : score >= 41 ? { label: 'Prata', color: 'text-gray-400' } : { label: 'Bronze', color: 'text-orange-700' };

  // compute streak: count consecutive days from latest record backwards where there is a record per day
  const computeStreak = () => {
    if (!Array.isArray(bemEstar) || bemEstar.length === 0) return 0
    // build set of dates (YYYY-MM-DD)
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

  // helper for progress ring percent (0..100) assuming 0-10 scale
  const pct = (v: number) => {
    if (isNaN(v)) return 0
    return Math.round((Math.max(0, Math.min(10, v)) / 10) * 100)
  }

  const sleepPct = pct(avgSleep)
  const motPct = pct(avgMotivation)
  const stressPct = 100 - pct(avgStress) // invert stress

  const recordCount = Array.isArray(bemEstar) ? bemEstar.length : 0

  // small SVG ring component
  const Ring = ({ label, percent }: { label: string; percent: number }) => {
    const size = 64
    const stroke = 8
    const radius = (size - stroke) / 2
    const circumference = 2 * Math.PI * radius
    const dash = (percent / 100) * circumference
    return (
      <div className="flex flex-col items-center text-center">
        <svg width={size} height={size} className="block">
          <g transform={`translate(${size / 2}, ${size / 2})`}>
            <circle
              r={radius}
              stroke="#e5e7eb"
              strokeWidth={stroke}
              fill="none"
            />
            <circle
              r={radius}
              stroke="#6d28d9"
              strokeWidth={stroke}
              fill="none"
              strokeLinecap="round"
              strokeDasharray={`${dash} ${circumference - dash}`}
              transform="rotate(-90)"
            />
          </g>
        </svg>
        <div className="mt-1 text-xs">{label}</div>
        <div className="text-sm font-semibold">{percent}%</div>
      </div>
    )
  }

  return (
    <section className="rounded-xl border bg-white p-4">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="font-semibold">Bem-estar (gamificado)</h2>
        <div className="text-sm text-gray-600">
          {recordCount} registro{recordCount !== 1 ? 's' : ''}
        </div>
      </div>

      <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-3">
        <div className="col-span-1 flex items-center gap-4">
          <div className="w-24 h-24 rounded-full bg-gradient-to-r from-yellow-300 to-red-400 flex items-center justify-center text-5xl">
            <FaMedal className={badge.color} />
          </div>
          <div>
            <div className="text-sm text-gray-500">Score</div>
            <div className="text-2xl font-bold">{score}</div>
            <div className="text-xs text-gray-600">{badge.label}</div>
            <div className="mt-2 text-sm flex items-center gap-1">
              <FaFire className="text-orange-500" /> {streak} dia{streak !== 1 ? 's' : ''} consecutivo
            </div>
          </div>
        </div>

        <div className="col-span-2 flex items-center gap-4">
          <Ring label="Sono" percent={sleepPct} />
          <Ring label="Motivação" percent={motPct} />
          <Ring label="Estresse" percent={stressPct} />
        </div>
      </div>

      <div className="mb-4">
        <form
          onSubmit={(e) => {
            e.preventDefault()
            fetchBemEstar()
          }}
          className="flex flex-wrap items-end gap-2"
        >
          <div>
            <label className="text-xs">De:</label>
            <input
              type="date"
              value={bemFrom}
              onChange={(e) => setBemFrom(e.target.value)}
              className="ml-2 rounded border px-2 py-1 text-sm"
            />
          </div>
          <div>
            <label className="text-xs">Até:</label>
            <input
              type="date"
              value={bemTo}
              onChange={(e) => setBemTo(e.target.value)}
              className="ml-2 rounded border px-2 py-1 text-sm"
            />
          </div>
          <div>
            <label className="text-xs">Limite:</label>
            <input
              type="number"
              min={1}
              value={bemLimit}
              onChange={(e) => setBemLimit(e.target.value)}
              className="ml-2 w-20 rounded border px-2 py-1 text-sm"
            />
          </div>
          <div>
            <button
              type="submit"
              className="rounded bg-gray-200 px-3 py-1 text-sm"
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
              className="ml-2 rounded bg-gray-100 px-3 py-1 text-sm"
            >
              Limpar
            </button>
          </div>
        </form>
      </div>

      <div className="text-sm">
        {bemLoading && <div>Carregando...</div>}
        {bemError && <div className="text-red-600">Erro: {bemError}</div>}
        {Array.isArray(bemEstar) && bemEstar.length > 0 ? (
          <div className="overflow-x-auto text-xs">
            <table className="w-full border-collapse">
              <thead>
                <tr>
                  <th className="pr-2 text-left">id_registro</th>
                  <th className="pr-2 text-left">data_registro</th>
                  <th className="pr-2 text-left">nivel_estresse</th>
                  <th className="pr-2 text-left">nivel_motivacao</th>
                  <th className="pr-2 text-left">qualidade_sono</th>
                  <th className="pr-2 text-left">observacao</th>
                </tr>
              </thead>
              <tbody>
                {bemEstar.map((r, idx) => (
                  <tr key={idx}>
                    {(() => {
                      const row = r as Record<string, unknown>
                      const id = (row['id_registro'] ??
                        row['ID_REGISTRO'] ??
                        '—') as string | number
                      const data = (row['data_registro'] ??
                        row['DATA_REGISTRO'] ??
                        '—') as string
                      const estresse = (row['nivel_estresse'] ??
                        row['NIVEL_ESTRESSE'] ??
                        '—') as string | number
                      const motivacao = (row['nivel_motivacao'] ??
                        row['NIVEL_MOTIVACAO'] ??
                        '—') as string | number
                      const sono = (row['qualidade_sono'] ??
                        row['QUALIDADE_SONO'] ??
                        '—') as string | number
                      const obs = (row['observacao'] ??
                        row['OBSERVACAO'] ??
                        '—') as string
                      return (
                        <>
                          <td className="pr-2 align-top">{String(id)}</td>
                          <td className="pr-2 align-top">
                            {String(data).slice(0, 10)}
                          </td>
                          <td className="pr-2 align-top">{String(estresse)}</td>
                          <td className="pr-2 align-top">
                            {String(motivacao)}
                          </td>
                          <td className="pr-2 align-top">{String(sono)}</td>
                          <td className="pr-2 align-top">{String(obs)}</td>
                        </>
                      )
                    })()}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <pre className="overflow-x-auto rounded bg-gray-50 p-2 text-xs">
            {JSON.stringify(bemEstar ?? 'Nenhum registro', null, 2)}
          </pre>
        )}
      </div>
    </section>
  )
}
