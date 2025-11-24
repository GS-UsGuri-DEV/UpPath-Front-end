import { Query } from 'appwrite'
import { useEffect, useState } from 'react'
import {
  FaBatteryFull,
  FaBrain,
  FaHeart,
  FaLightbulb,
  FaMoon,
  FaRedo,
  FaSmile,
  FaSyncAlt,
  FaSignInAlt,
} from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { useAuth } from '../../contexts/useAuth'
import { db } from '../../shared/appwrite'
import { DICAS_ESTRESSE, DICAS_MOTIVACAO, DICAS_SONO } from '../../types/dicas'
import type { Dica, NiveisBemEstar } from '../../types/dicas'
import Spinner from '../../components/Spinner/Spinner'

export default function Dicas() {
  const { userData, user } = useAuth()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [niveis, setNiveis] = useState<NiveisBemEstar | null>(null)
  const [dicaSelecionada, setDicaSelecionada] = useState<Dica | null>(null)
  const [categoriaAtiva, setCategoriaAtiva] = useState<
    'sono' | 'estresse' | 'motivacao' | null
  >(null)

  useEffect(() => {
    if (userData) {
      fetchUltimoRegistro()
    } else if (user === null) {
      // Usuário não está logado
      setLoading(false)
    }
  }, [userData, user])

  async function fetchUltimoRegistro() {
    setLoading(true)
    setError(null)
    try {
      const DB_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID
      const COLLECTION = import.meta.env.VITE_APPWRITE_COLLECTION_BEMESTAR
      if (!DB_ID || !COLLECTION) {
        throw new Error('Configuração do banco de dados não encontrada')
      }

      const identifier = String(
        (userData as unknown as Record<string, unknown>)?.$id ??
          (userData as unknown as Record<string, unknown>)?.email ??
          '',
      )

      const queries: string[] = []
      if (identifier) queries.push(Query.equal('id_usuario', identifier))
      queries.push(Query.orderDesc('data_registro'))
      queries.push(Query.limit(1))

      const res = await db.listDocuments(DB_ID, COLLECTION, queries)
      const docs = res.documents ?? res

      if (Array.isArray(docs) && docs.length > 0) {
        const doc = docs[0]
        const niveisData: NiveisBemEstar = {
          sono: Number(doc.qualidade_sono ?? doc.QUALIDADE_SONO ?? 7),
          estresse: Number(doc.nivel_estresse ?? doc.NIVEL_ESTRESSE ?? 5),
          motivacao: Number(doc.nivel_motivacao ?? doc.NIVEL_MOTIVACAO ?? 7),
        }
        setNiveis(niveisData)
        selecionarDicaAutomatica(niveisData)
      } else {
        // Sem registros, usar valores padrão
        const niveisDefault: NiveisBemEstar = {
          sono: 7,
          estresse: 5,
          motivacao: 7,
        }
        setNiveis(niveisDefault)
        selecionarDicaAutomatica(niveisDefault)
      }
    } catch (err) {
      setError(String((err as Error)?.message ?? err))
    } finally {
      setLoading(false)
    }
  }

  function selecionarDicaAutomatica(niveisData: NiveisBemEstar) {
    const categorias: Array<'sono' | 'estresse' | 'motivacao'> = []

    // Verifica quais categorias precisam de atenção
    if (niveisData.sono < 7) categorias.push('sono')
    if (niveisData.estresse > 6) categorias.push('estresse')
    if (niveisData.motivacao < 6) categorias.push('motivacao')

    // Se nenhuma categoria crítica, escolhe aleatoriamente
    if (categorias.length === 0) {
      categorias.push('sono', 'estresse', 'motivacao')
    }

    // Escolhe categoria aleatória das disponíveis
    const categoriaEscolhida =
      categorias[Math.floor(Math.random() * categorias.length)]
    setCategoriaAtiva(categoriaEscolhida)

    // Seleciona dica aleatória da categoria
    let dicasDisponiveis: Dica[] = []
    if (categoriaEscolhida === 'sono') dicasDisponiveis = DICAS_SONO
    else if (categoriaEscolhida === 'estresse')
      dicasDisponiveis = DICAS_ESTRESSE
    else dicasDisponiveis = DICAS_MOTIVACAO

    const dicaAleatoria =
      dicasDisponiveis[Math.floor(Math.random() * dicasDisponiveis.length)]
    setDicaSelecionada(dicaAleatoria)
  }

  function gerarNovaDica() {
    if (!niveis) return
    selecionarDicaAutomatica(niveis)
  }

  function selecionarPorCategoria(
    categoria: 'sono' | 'estresse' | 'motivacao',
  ) {
    setCategoriaAtiva(categoria)
    let dicasDisponiveis: Dica[] = []
    if (categoria === 'sono') dicasDisponiveis = DICAS_SONO
    else if (categoria === 'estresse') dicasDisponiveis = DICAS_ESTRESSE
    else dicasDisponiveis = DICAS_MOTIVACAO

    const dicaAleatoria =
      dicasDisponiveis[Math.floor(Math.random() * dicasDisponiveis.length)]
    setDicaSelecionada(dicaAleatoria)
  }

  const getCategoriaInfo = (categoria: 'sono' | 'estresse' | 'motivacao') => {
    if (categoria === 'sono') {
      return {
        icon: FaMoon,
        titulo: 'Sono',
        cor: 'blue',
        bgClass: 'bg-blue-50 dark:bg-blue-950/30',
        borderClass: 'border-blue-500 dark:border-blue-800',
        textClass: 'text-blue-700 dark:text-blue-300',
        badgeClass:
          'bg-blue-600 text-white dark:bg-blue-900/50 dark:text-blue-200',
      }
    } else if (categoria === 'estresse') {
      return {
        icon: FaHeart,
        titulo: 'Estresse',
        cor: 'red',
        bgClass: 'bg-red-50 dark:bg-red-950/30',
        borderClass: 'border-red-500 dark:border-red-800',
        textClass: 'text-red-700 dark:text-red-300',
        badgeClass:
          'bg-red-600 text-white dark:bg-red-900/50 dark:text-red-200',
      }
    } else {
      return {
        icon: FaBatteryFull,
        titulo: 'Motivação',
        cor: 'green',
        bgClass: 'bg-green-50 dark:bg-green-950/30',
        borderClass: 'border-green-500 dark:border-green-800',
        textClass: 'text-green-700 dark:text-green-300',
        badgeClass:
          'bg-green-600 text-white dark:bg-green-900/50 dark:text-green-200',
      }
    }
  }

  const getTipoIcon = (tipo: 'frase' | 'pratica' | 'motivacional') => {
    if (tipo === 'frase') return <FaSmile className="h-5 w-5" />
    if (tipo === 'pratica') return <FaLightbulb className="h-5 w-5" />
    return <FaBrain className="h-5 w-5" />
  }

  const getTipoLabel = (tipo: 'frase' | 'pratica' | 'motivacional') => {
    if (tipo === 'frase') return 'Frase Rápida'
    if (tipo === 'pratica') return 'Dica Prática'
    return 'Texto Motivacional'
  }

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[var(--bg-primary)] p-4">
        <Spinner text="Carregando suas dicas..." size={40} />
      </div>
    )
  }

  if (!user) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[var(--bg-primary)] p-4">
        <div className="w-full max-w-md text-center">
          <div className="mb-6 flex justify-center">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-indigo-100 dark:bg-indigo-900/30">
              <FaLightbulb className="h-10 w-10 text-indigo-600 dark:text-indigo-400" />
            </div>
          </div>
          <h2 className="mb-3 text-2xl font-bold text-[var(--text-primary)] sm:text-3xl">
            Faça login para ver suas dicas
          </h2>
          <p className="mb-6 text-base text-[var(--text-secondary)] sm:text-lg">
            As dicas personalizadas são baseadas nos seus níveis de bem-estar.
            Entre para acessar conteúdo exclusivo!
          </p>
          <Link
            to="/login"
            className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-6 py-3 text-base font-medium text-white transition-all hover:bg-indigo-700 hover:shadow-lg sm:text-lg"
          >
            <FaSignInAlt className="h-5 w-5" />
            Fazer Login
          </Link>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[var(--bg-primary)] p-4 sm:p-6">
        <div className="mx-auto max-w-3xl">
          <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-center text-red-800 dark:border-red-800 dark:bg-red-950/30 dark:text-red-300">
            <p className="font-semibold">Erro ao carregar dados</p>
            <p className="text-sm">{error}</p>
            <button
              onClick={fetchUltimoRegistro}
              className="mt-4 rounded bg-red-600 px-4 py-2 text-sm text-white transition-colors hover:bg-red-700"
            >
              Tentar novamente
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] p-4 pb-16 sm:p-6 sm:pb-24">
      <div className="mx-auto max-w-4xl">
        {/* Header */}
        <div className="mb-6 text-center sm:mb-8">
          <h1 className="mb-2 flex items-center justify-center gap-3 text-3xl font-bold text-[var(--text-primary)] sm:text-4xl">
            <FaLightbulb className="h-8 w-8 text-yellow-500 sm:h-10 sm:w-10" />
            Dicas Personalizadas
          </h1>
          <p className="text-sm text-[var(--text-secondary)] sm:text-base">
            Com base nos seus níveis de bem-estar
          </p>
        </div>

        {/* Níveis de Bem-Estar */}
        {niveis && (
          <div className="mb-6 grid grid-cols-1 gap-3 sm:grid-cols-3 sm:gap-4">
            <div className="rounded-lg border border-[var(--border-color)] bg-[var(--bg-secondary)] p-3 sm:p-4">
              <div className="mb-2 flex items-center justify-between">
                <span className="flex items-center gap-2 text-sm font-semibold text-[var(--text-secondary)]">
                  <FaMoon className="h-4 w-4" /> Sono
                </span>
                <span className="text-lg font-bold text-blue-600 sm:text-xl dark:text-blue-400">
                  {niveis.sono}/10
                </span>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700">
                <div
                  className="h-full bg-blue-500 transition-all"
                  style={{ width: `${(niveis.sono / 10) * 100}%` }}
                />
              </div>
            </div>

            <div className="rounded-lg border border-[var(--border-color)] bg-[var(--bg-secondary)] p-3 sm:p-4">
              <div className="mb-2 flex items-center justify-between">
                <span className="flex items-center gap-2 text-sm font-semibold text-[var(--text-secondary)]">
                  <FaHeart className="h-4 w-4" /> Estresse
                </span>
                <span className="text-lg font-bold text-red-600 sm:text-xl dark:text-red-400">
                  {niveis.estresse}/10
                </span>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700">
                <div
                  className="h-full bg-red-500 transition-all"
                  style={{ width: `${(niveis.estresse / 10) * 100}%` }}
                />
              </div>
            </div>

            <div className="rounded-lg border border-[var(--border-color)] bg-[var(--bg-secondary)] p-3 sm:p-4">
              <div className="mb-2 flex items-center justify-between">
                <span className="flex items-center gap-2 text-sm font-semibold text-[var(--text-secondary)]">
                  <FaBatteryFull className="h-4 w-4" /> Motivação
                </span>
                <span className="text-lg font-bold text-green-600 sm:text-xl dark:text-green-400">
                  {niveis.motivacao}/10
                </span>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700">
                <div
                  className="h-full bg-green-500 transition-all"
                  style={{ width: `${(niveis.motivacao / 10) * 100}%` }}
                />
              </div>
            </div>
          </div>
        )}

        {/* Filtros de Categoria */}
        <div className="mb-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => selecionarPorCategoria('sono')}
            className={`rounded-full px-4 py-2 text-sm font-medium transition-all ${
              categoriaAtiva === 'sono'
                ? 'scale-105 bg-blue-500 text-white shadow-lg'
                : 'bg-blue-100 text-blue-700 hover:bg-blue-200 dark:bg-blue-900/50 dark:text-blue-300 dark:hover:bg-blue-900'
            }`}
          >
            <FaMoon className="inline h-4 w-4" /> Sono
          </button>
          <button
            onClick={() => selecionarPorCategoria('estresse')}
            className={`rounded-full px-4 py-2 text-sm font-medium transition-all ${
              categoriaAtiva === 'estresse'
                ? 'scale-105 bg-red-500 text-white shadow-lg'
                : 'bg-red-100 text-red-700 hover:bg-red-200 dark:bg-red-900/50 dark:text-red-300 dark:hover:bg-red-900'
            }`}
          >
            <FaHeart className="inline h-4 w-4" /> Estresse
          </button>
          <button
            onClick={() => selecionarPorCategoria('motivacao')}
            className={`rounded-full px-4 py-2 text-sm font-medium transition-all ${
              categoriaAtiva === 'motivacao'
                ? 'scale-105 bg-green-500 text-white shadow-lg'
                : 'bg-green-100 text-green-700 hover:bg-green-200 dark:bg-green-900/50 dark:text-green-300 dark:hover:bg-green-900'
            }`}
          >
            <FaBatteryFull className="inline h-4 w-4" /> Motivação
          </button>
          <button
            onClick={gerarNovaDica}
            className="rounded-full bg-indigo-100 px-4 py-2 text-sm font-medium text-indigo-700 transition-all hover:bg-indigo-200 dark:bg-indigo-900/50 dark:text-indigo-300 dark:hover:bg-indigo-900"
          >
            <FaSyncAlt className="mr-1 inline h-3 w-3" />
            Aleatória
          </button>
        </div>

        {/* Card da Dica */}
        {dicaSelecionada && categoriaAtiva && (
          <div
            className={`animate-fadeIn rounded-xl border-2 p-4 shadow-lg transition-all duration-300 sm:p-6 ${getCategoriaInfo(categoriaAtiva).borderClass} ${getCategoriaInfo(categoriaAtiva).bgClass}`}
          >
            {/* Header da Dica */}
            <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/50 dark:bg-gray-800/50">
                  {(() => {
                    const Icon = getCategoriaInfo(categoriaAtiva).icon
                    return <Icon className="h-6 w-6 sm:h-7 sm:w-7" />
                  })()}
                </div>
                <div>
                  <h2
                    className={`text-xl font-bold sm:text-2xl ${getCategoriaInfo(categoriaAtiva).textClass}`}
                  >
                    {getCategoriaInfo(categoriaAtiva).titulo}
                  </h2>
                  <div className="mt-1 flex items-center gap-2">
                    {getTipoIcon(dicaSelecionada.tipo)}
                    <span
                      className={`rounded-full px-3 py-0.5 text-xs font-medium ${getCategoriaInfo(categoriaAtiva).badgeClass}`}
                    >
                      {getTipoLabel(dicaSelecionada.tipo)}
                    </span>
                  </div>
                </div>
              </div>
              <button
                onClick={gerarNovaDica}
                className={`flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-all ${getCategoriaInfo(categoriaAtiva).textClass} hover:scale-105`}
              >
                <FaRedo className="h-4 w-4" />
                <span className="hidden sm:inline">Nova Dica</span>
              </button>
            </div>

            {/* Conteúdo da Dica */}
            <div className="rounded-lg bg-white p-4 shadow-sm sm:p-5 dark:bg-gray-900/50">
              <p
                className={`text-base leading-relaxed text-gray-800 sm:text-lg dark:text-gray-100 ${dicaSelecionada.tipo === 'motivacional' ? 'text-justify' : ''}`}
              >
                {dicaSelecionada.conteudo}
              </p>
            </div>
          </div>
        )}

        {/* Botão para Registrar Bem-Estar (apenas para usuário comum) */}
        {userData?.tipo_conta !== 'empresa' && (
          <div className="mt-6 text-center sm:mt-8">
            <a
              href="/dashboard"
              className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-6 py-3 text-sm font-medium text-white transition-all hover:bg-indigo-700 hover:shadow-lg sm:text-base"
            >
              <FaBrain className="h-5 w-5" />
              Registrar Bem-Estar
            </a>
          </div>
        )}
      </div>
    </div>
  )
}
