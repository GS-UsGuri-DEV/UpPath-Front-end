import { Query } from 'appwrite'
import { useEffect, useState } from 'react'
import {
  FaBatteryFull,
  FaBuilding,
  FaChartBar,
  FaHeart,
  FaMoon,
  FaUsers,
} from 'react-icons/fa'
import Spinner from '../../components/Spinner/Spinner'
import { useAuth } from '../../contexts/useAuth'
import { db } from '../../shared/appwrite'

interface Funcionario {
  $id: string
  nome_completo: string
  email: string
  ocupacao?: string
  nivel_carreira?: string
  data_cadastro: string
}

interface BemEstarData {
  id_usuario: string
  nivel_estresse: number
  nivel_motivacao: number
  qualidade_sono: number
  data_registro: string
}

interface EmpresaData {
  $id: string
  nome_empresa: string
  cnpj: string
  email_contato: string
}

interface MediasBemEstar {
  estresse: number
  motivacao: number
  sono: number
}

export default function DashboardEmpresa() {
  const { userData } = useAuth()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [empresa, setEmpresa] = useState<EmpresaData | null>(null)
  const [funcionarios, setFuncionarios] = useState<Funcionario[]>([])
  const [medias, setMedias] = useState<MediasBemEstar>({
    estresse: 0,
    motivacao: 0,
    sono: 0,
  })

  useEffect(() => {
    if (userData) {
      fetchDadosEmpresa()
    }
  }, [userData])

  async function fetchDadosEmpresa() {
    setLoading(true)
    setError(null)

    try {
      const DB_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID
      const COLLECTION_USERS = import.meta.env.VITE_APPWRITE_COLLECTION_USERS
      const COLLECTION_COMPANIES = import.meta.env
        .VITE_APPWRITE_COLLECTION_COMPANIES
      const COLLECTION_BEMESTAR = import.meta.env
        .VITE_APPWRITE_COLLECTION_BEMESTAR

      if (!DB_ID || !COLLECTION_USERS || !COLLECTION_COMPANIES) {
        throw new Error('Configuração do banco de dados não encontrada')
      }

      // Buscar dados da empresa pelo email do usuário logado
      const userDataObj = userData as unknown as Record<string, unknown>
      const userEmail = String(
        userDataObj?.email_contato ?? userDataObj?.email ?? '',
      )

      if (!userEmail) {
        throw new Error('Email não encontrado nos dados do usuário')
      }

      const empresasRes = await db.listDocuments(DB_ID, COLLECTION_COMPANIES, [
        Query.equal('email_contato', userEmail),
        Query.limit(1),
      ])

      if (!empresasRes.documents || empresasRes.documents.length === 0) {
        throw new Error('Empresa não encontrada')
      }

      const empresaData = empresasRes.documents[0] as unknown as EmpresaData
      setEmpresa(empresaData)

      // Buscar funcionários da empresa
      const funcionariosRes = await db.listDocuments(DB_ID, COLLECTION_USERS, [
        Query.equal('id_empresa', empresaData.$id),
      ])

      const funcionariosData =
        funcionariosRes.documents as unknown as Funcionario[]
      setFuncionarios(funcionariosData)

      // Buscar dados de bem-estar dos funcionários
      if (funcionariosData.length > 0 && COLLECTION_BEMESTAR) {
        const funcionarioIds = funcionariosData.map((f) => f.$id)

        // Buscar registros mais recentes de cada funcionário
        const bemEstarPromises = funcionarioIds.map(async (id) => {
          const res = await db.listDocuments(DB_ID, COLLECTION_BEMESTAR, [
            Query.equal('id_usuario', id),
            Query.orderDesc('data_registro'),
            Query.limit(1),
          ])
          return res.documents[0] as unknown as BemEstarData | undefined
        })

        const bemEstarResults = await Promise.all(bemEstarPromises)
        const validResults = bemEstarResults.filter(
          (r): r is BemEstarData => r !== undefined,
        )

        // Calcular médias
        if (validResults.length > 0) {
          const somaEstresse = validResults.reduce(
            (acc, r) => acc + (r.nivel_estresse ?? 0),
            0,
          )
          const somaMotivacao = validResults.reduce(
            (acc, r) => acc + (r.nivel_motivacao ?? 0),
            0,
          )
          const somaSono = validResults.reduce(
            (acc, r) => acc + (r.qualidade_sono ?? 0),
            0,
          )

          setMedias({
            estresse:
              validResults.length > 0
                ? Math.round((somaEstresse / validResults.length) * 10) / 10
                : 0,
            motivacao:
              validResults.length > 0
                ? Math.round((somaMotivacao / validResults.length) * 10) / 10
                : 0,
            sono:
              validResults.length > 0
                ? Math.round((somaSono / validResults.length) * 10) / 10
                : 0,
          })
        }
      }
    } catch (err) {
      setError(String((err as Error)?.message ?? err))
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[var(--bg-primary)] p-4">
        <Spinner text="Carregando dados da empresa..." size={40} />
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[var(--bg-primary)] p-4 sm:p-6">
        <div className="mx-auto max-w-5xl">
          <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-center text-red-800 dark:border-red-800 dark:bg-red-950/30 dark:text-red-300">
            <p className="font-semibold">Erro ao carregar dados</p>
            <p className="text-sm">{error}</p>
            <button
              onClick={fetchDadosEmpresa}
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
    <div className="min-h-screen bg-[var(--bg-primary)] pb-16 sm:pb-24">
      <header className="border-b border-[var(--border-color)] bg-[var(--bg-secondary)] shadow-sm">
        <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-indigo-100 dark:bg-indigo-900/30">
              <FaBuilding className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-[var(--text-primary)] sm:text-2xl">
                Dashboard - {empresa?.nome_empresa}
              </h1>
              <p className="text-xs text-[var(--text-muted)] sm:text-sm">
                CNPJ: {empresa?.cnpj}
              </p>
            </div>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-8">
        <div className="mb-6 grid grid-cols-1 gap-4 sm:mb-8 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-lg border border-[var(--border-color)] bg-[var(--bg-secondary)] p-4 shadow-sm sm:p-6">
            <div className="mb-3 flex items-center justify-between">
              <h3 className="text-sm font-medium text-[var(--text-secondary)]">
                Total de Funcionários
              </h3>
              <FaUsers className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            </div>
            <p className="text-2xl font-bold text-[var(--text-primary)] sm:text-3xl">
              {funcionarios.length}
            </p>
          </div>

          <div className="rounded-lg border border-[var(--border-color)] bg-[var(--bg-secondary)] p-4 shadow-sm sm:p-6">
            <div className="mb-3 flex items-center justify-between">
              <h3 className="text-sm font-medium text-[var(--text-secondary)]">
                Média Estresse
              </h3>
              <FaHeart className="h-5 w-5 text-red-600 dark:text-red-400" />
            </div>
            <p className="text-2xl font-bold text-[var(--text-primary)] sm:text-3xl">
              {medias.estresse.toFixed(1)}
              <span className="text-base font-normal text-[var(--text-muted)]">
                /10
              </span>
            </p>
            <div className="mt-2 h-2 overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700">
              <div
                className="h-full bg-red-500 transition-all"
                style={{ width: `${(medias.estresse / 10) * 100}%` }}
              />
            </div>
          </div>

          <div className="rounded-lg border border-[var(--border-color)] bg-[var(--bg-secondary)] p-4 shadow-sm sm:p-6">
            <div className="mb-3 flex items-center justify-between">
              <h3 className="text-sm font-medium text-[var(--text-secondary)]">
                Média Motivação
              </h3>
              <FaBatteryFull className="h-5 w-5 text-green-600 dark:text-green-400" />
            </div>
            <p className="text-2xl font-bold text-[var(--text-primary)] sm:text-3xl">
              {medias.motivacao.toFixed(1)}
              <span className="text-base font-normal text-[var(--text-muted)]">
                /10
              </span>
            </p>
            <div className="mt-2 h-2 overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700">
              <div
                className="h-full bg-green-500 transition-all"
                style={{ width: `${(medias.motivacao / 10) * 100}%` }}
              />
            </div>
          </div>

          <div className="rounded-lg border border-[var(--border-color)] bg-[var(--bg-secondary)] p-4 shadow-sm sm:p-6">
            <div className="mb-3 flex items-center justify-between">
              <h3 className="text-sm font-medium text-[var(--text-secondary)]">
                Média Sono
              </h3>
              <FaMoon className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            </div>
            <p className="text-2xl font-bold text-[var(--text-primary)] sm:text-3xl">
              {medias.sono.toFixed(1)}
              <span className="text-base font-normal text-[var(--text-muted)]">
                /10
              </span>
            </p>
            <div className="mt-2 h-2 overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700">
              <div
                className="h-full bg-blue-500 transition-all"
                style={{ width: `${(medias.sono / 10) * 100}%` }}
              />
            </div>
          </div>
        </div>

        <div className="rounded-lg border border-[var(--border-color)] bg-[var(--bg-secondary)] p-4 shadow-sm sm:p-6">
          <div className="mb-4 flex items-center gap-3 sm:mb-6">
            <FaUsers className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
            <h2 className="text-lg font-bold text-[var(--text-primary)] sm:text-xl">
              Funcionários Cadastrados
            </h2>
          </div>

          {funcionarios.length === 0 ? (
            <div className="rounded-lg bg-[var(--bg-tertiary)] p-6 text-center sm:p-8">
              <FaChartBar className="mx-auto mb-3 h-12 w-12 text-[var(--text-muted)]" />
              <p className="text-[var(--text-secondary)]">
                Nenhum funcionário cadastrado ainda
              </p>
              <p className="mt-2 text-sm text-[var(--text-muted)]">
                Os funcionários podem se cadastrar informando o ID da sua
                empresa
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[600px]">
                <thead className="border-b border-[var(--border-color)] bg-[var(--bg-tertiary)]">
                  <tr>
                    <th className="px-3 py-3 text-left text-xs font-semibold text-[var(--text-secondary)] uppercase sm:px-4">
                      Nome
                    </th>
                    <th className="px-3 py-3 text-left text-xs font-semibold text-[var(--text-secondary)] uppercase sm:px-4">
                      Email
                    </th>
                    <th className="px-3 py-3 text-left text-xs font-semibold text-[var(--text-secondary)] uppercase sm:px-4">
                      Ocupação
                    </th>
                    <th className="px-3 py-3 text-left text-xs font-semibold text-[var(--text-secondary)] uppercase sm:px-4">
                      Nível
                    </th>
                    <th className="px-3 py-3 text-left text-xs font-semibold text-[var(--text-secondary)] uppercase sm:px-4">
                      Data Cadastro
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[var(--border-color)]">
                  {funcionarios.map((func) => (
                    <tr
                      key={func.$id}
                      className="transition-colors hover:bg-[var(--bg-tertiary)]"
                    >
                      <td className="px-3 py-3 text-sm text-[var(--text-primary)] sm:px-4">
                        {func.nome_completo}
                      </td>
                      <td className="px-3 py-3 text-sm text-[var(--text-secondary)] sm:px-4">
                        {func.email}
                      </td>
                      <td className="px-3 py-3 text-sm text-[var(--text-secondary)] sm:px-4">
                        {func.ocupacao || '-'}
                      </td>
                      <td className="px-3 py-3 text-sm text-[var(--text-secondary)] sm:px-4">
                        {func.nivel_carreira || '-'}
                      </td>
                      <td className="px-3 py-3 text-sm text-[var(--text-secondary)] sm:px-4">
                        {new Date(func.data_cadastro).toLocaleDateString(
                          'pt-BR',
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        <div className="mt-6 rounded-lg border border-blue-200 bg-blue-50 p-4 dark:border-blue-800 dark:bg-blue-950/30">
          <h3 className="mb-2 flex items-center gap-2 font-semibold text-blue-900 dark:text-blue-200">
            <FaBuilding className="h-4 w-4" />
            ID da Empresa
          </h3>
          <p className="text-sm text-blue-800 dark:text-blue-300">
            Compartilhe este ID com seus funcionários para que eles possam se
            cadastrar:
          </p>
          <div className="mt-2 rounded bg-white p-3 font-mono text-sm font-bold text-blue-900 dark:bg-gray-900 dark:text-blue-200">
            {empresa?.$id}
          </div>
        </div>
      </main>
    </div>
  )
}
