import { useEffect, useState } from 'react';
import { useAuth } from '../../contexts/useAuth';
import { db, ID } from '../../shared/appwrite';
import { Query } from 'appwrite';

export default function GamificationCard() {
  const { userData } = useAuth();
  const [records, setRecords] = useState<Array<Record<string, unknown>> | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [submitMessage, setSubmitMessage] = useState<string | null>(null);
  const [stress, setStress] = useState<number | ''>('');
  const [motivation, setMotivation] = useState<number | ''>('');
  const [sleepQuality, setSleepQuality] = useState<number | ''>('');
  const [observation, setObservation] = useState<string>('');

  useEffect(() => { setMounted(true); }, []);

  async function fetchLatest() {
    setError(null);
    setLoading(true);
    try {
      const DB_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID;
      const COLLECTION = import.meta.env.VITE_APPWRITE_COLLECTION_BEMESTAR;
      if (!DB_ID || !COLLECTION) throw new Error('VITE_APPWRITE_COLLECTION_BEMESTAR não configurado');
      const identifier = String((userData as unknown as Record<string, unknown>)?.$id ?? (userData as unknown as Record<string, unknown>)?.email ?? '');
      const queries: string[] = [];
      if (identifier) queries.push(Query.equal('id_usuario', identifier));
      queries.push(Query.orderDesc('data_registro'));
      queries.push(Query.limit(7));
      const res = await db.listDocuments(DB_ID, COLLECTION, queries);
      setRecords(res.documents ?? res);
    } catch (err) {
      setError(String((err as Error)?.message ?? err));
      setRecords(null);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (userData) fetchLatest();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userData]);

  // Register a new bem_estar entry (quick add from Home)
  async function registerToday() {
    setSubmitMessage(null);
    setSubmitLoading(true);
    try {
      const DB_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID;
      const COLLECTION = import.meta.env.VITE_APPWRITE_COLLECTION_BEMESTAR;
      if (!DB_ID || !COLLECTION) throw new Error('VITE_APPWRITE_COLLECTION_BEMESTAR não configurado');
      const identifier = String((userData as unknown as Record<string, unknown>)?.$id ?? (userData as unknown as Record<string, unknown>)?.email ?? '');
      // Validate required numeric fields
      if (stress === '' || motivation === '' || sleepQuality === '') {
        throw new Error('Preencha Estresse, Motivação e Sono antes de salvar.');
      }
      const s = Number(stress);
      const m = Number(motivation);
      const q = Number(sleepQuality);
      if ([s, m, q].some((v) => Number.isNaN(v) || v < 0 || v > 10)) {
        throw new Error('Estresse, Motivação e Sono devem ser números entre 0 e 10.');
      }

      const payload: Record<string, unknown> = {
        id_usuario: identifier || 'unknown',
        data_registro: new Date().toISOString(),
        nivel_estresse: s,
        nivel_motivacao: m,
        qualidade_sono: q,
        observacao: observation ?? ''
      };

      const read = ['role:all'];
      const write = ['role:users'];
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      await (db as any).createDocument(DB_ID, COLLECTION, ID.unique(), payload, read, write);
      setSubmitMessage('Registro salvo com sucesso!');
      setStress(''); setMotivation(''); setSleepQuality(''); setObservation('');
      await fetchLatest();
    } catch (err) {
      setSubmitMessage(String((err as Error)?.message ?? err));
    } finally {
      setSubmitLoading(false);
    }
  }

  const num = (v: unknown) => {
    if (v === null || v === undefined) return NaN;
    if (typeof v === 'number') return v;
    const s = String(v).replace(',', '.');
    const n = Number(s);
    return Number.isFinite(n) ? n : NaN;
  };

  const avg = (arr: number[]) => (arr.length ? arr.reduce((s, v) => s + v, 0) / arr.length : NaN);

  const records7 = Array.isArray(records) ? records : [];
  const avgStress = avg(records7.map(r => num(r.nivel_estresse ?? r.NIVEL_ESTRESSE)));
  const avgMotivation = avg(records7.map(r => num(r.nivel_motivacao ?? r.NIVEL_MOTIVACAO)));
  const avgSleep = avg(records7.map(r => num(r.qualidade_sono ?? r.QUALIDADE_SONO)));

  const pct = (v: number) => (isNaN(v) ? 0 : Math.round(Math.max(0, Math.min(10, v)) / 10 * 100));

  const score = (() => {
    const s = isNaN(avgStress) ? 5 : avgStress;
    const m = isNaN(avgMotivation) ? 5 : avgMotivation;
    const q = isNaN(avgSleep) ? 5 : avgSleep;
    const raw = ((10 - s) + m + q) / 30;
    return Math.round(Math.max(0, Math.min(1, raw)) * 100);
  })();

  const badge = score >= 71 ? 'Ouro' : score >= 41 ? 'Prata' : 'Bronze';

  return (
    <div className={`max-w-md mx-auto transition-transform duration-600 ease-out ${mounted ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'}`}>
      <div className="rounded-xl border bg-white p-4 shadow-md">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-sm text-gray-500">Bem-estar</div>
            <div className="text-xl font-bold">{score} • {badge}</div>
            <div className="text-xs text-gray-600">Resumo dos últimos {records7.length} registros</div>
          </div>
          <div className="flex gap-3 items-center">
            <div className="text-center">
              <div className="text-xs text-gray-500">Sono</div>
              <div className="font-semibold">{pct(avgSleep)}%</div>
            </div>
            <div className="text-center">
              <div className="text-xs text-gray-500">Motiv.</div>
              <div className="font-semibold">{pct(avgMotivation)}%</div>
            </div>
            <div className="text-center">
              <div className="text-xs text-gray-500">Estresse</div>
              <div className="font-semibold">{100 - pct(avgStress)}%</div>
            </div>
          </div>
        </div>

        <div className="mt-3">
          <div className="flex justify-between items-center">
            <a href="/dashboard" className="text-sm text-indigo-600 hover:underline">Ver detalhes</a>
            <div className="text-xs text-gray-500">Registro rápido</div>
          </div>

          <form onSubmit={(e) => { e.preventDefault(); registerToday(); }} className="mt-3 grid grid-cols-1 gap-2">
            <div className="flex gap-2">
              <label className="flex-1 text-xs">
                Estresse (0-10)
                <input type="number" min={0} max={10} value={stress} onChange={(e) => setStress(e.target.value === '' ? '' : Number(e.target.value))} className="w-full mt-1 p-2 border rounded text-sm" />
              </label>
              <label className="flex-1 text-xs">
                Motivação (0-10)
                <input type="number" min={0} max={10} value={motivation} onChange={(e) => setMotivation(e.target.value === '' ? '' : Number(e.target.value))} className="w-full mt-1 p-2 border rounded text-sm" />
              </label>
            </div>
            <div className="flex gap-2">
              <label className="flex-1 text-xs">
                Sono (0-10)
                <input type="number" min={0} max={10} value={sleepQuality} onChange={(e) => setSleepQuality(e.target.value === '' ? '' : Number(e.target.value))} className="w-full mt-1 p-2 border rounded text-sm" />
              </label>
              <label className="flex-1 text-xs">
                Observação
                <input type="text" value={observation} onChange={(e) => setObservation(e.target.value)} className="w-full mt-1 p-2 border rounded text-sm" />
              </label>
            </div>
            <div className="flex items-center gap-2">
              <button type="submit" disabled={submitLoading} className="px-3 py-1 bg-green-600 text-white rounded text-sm">{submitLoading ? 'Salvando...' : 'Registrar hoje'}</button>
              <button type="button" onClick={() => { setStress(''); setMotivation(''); setSleepQuality(''); setObservation(''); setSubmitMessage(null); }} className="px-3 py-1 bg-gray-100 rounded text-sm">Limpar</button>
              {submitMessage && <div className="text-sm text-green-600">{submitMessage}</div>}
            </div>
          </form>

          {loading && <div className="mt-2 text-xs text-gray-500">Carregando...</div>}
          {error && <div className="mt-2 text-xs text-red-600">{error}</div>}
        </div>
      </div>
    </div>
  );
}
