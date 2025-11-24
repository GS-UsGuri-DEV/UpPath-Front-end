import { useCallback, useEffect, useState } from 'react'
import { FaBatteryFull, FaBuilding, FaChartBar, FaHeart, FaMoon, FaUsers } from 'react-icons/fa'
import { get } from '../../api/client'
import Spinner from '../../components/Spinner/Spinner'
import { useAuth } from '../../contexts/useAuth'
import type { BemEstarData, EmpresaData, Funcionario, MediasBemEstar } from '../../types/empresa'

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
  // ID can come from different fields in the backend; store the canonical id we used to lookup
  const [companyIdDisplay, setCompanyIdDisplay] = useState<string | null>(null)

  const fetchDadosEmpresa = useCallback(async () => {
    setLoading(true)
    setError(null)

    try {
      // Buscar dados da empresa pelo email do usuário logado via API Java
      const userDataObj = userData as unknown as Record<string, unknown>
      const userEmail = String(userDataObj?.email_contato ?? userDataObj?.email ?? '')

      if (!userEmail) {
        throw new Error('Email não encontrado nos dados do usuário')
      }

      // Prefer buscar a empresa pelo id (idEmpresa/id), se disponível no userData,
      // pois isso evita ambiguidades entre empresas com emails parecidos.
      const userDataObj2 = userData as unknown as Record<string, any>
      const candidateCompanyId =
        userDataObj2?.idEmpresa ?? userDataObj2?.id ?? userDataObj2?.id_empresa

      let empresasResRaw: any = null
      if (candidateCompanyId) {
        const tryPaths = [
          `/empresas/${candidateCompanyId}`,
          `/empresas?idEmpresa=${candidateCompanyId}`,
          `/empresas?id=${candidateCompanyId}`,
        ]
        for (const p of tryPaths) {
          try {
            const r = await get(p)
            if (r) {
              empresasResRaw = r
              break
            }
          } catch (_e) {
            // ignora e tenta próximo formato
          }
        }
      }

      // Se não encontrou por id, busca por email como antes
      if (!empresasResRaw) {
        empresasResRaw = await get(`/empresas?email=${encodeURIComponent(userEmail)}`)
      }
      const empresasResAny = empresasResRaw as any

      let empresasItems: any[] = []
      if (Array.isArray(empresasResAny)) {
        empresasItems = empresasResAny
      } else if (empresasResAny && Array.isArray(empresasResAny.data)) {
        empresasItems = empresasResAny.data
      } else if (empresasResAny && Array.isArray(empresasResAny.items)) {
        empresasItems = empresasResAny.items
      } else if (empresasResAny) {
        empresasItems = [empresasResAny]
      }

      if (empresasItems.length === 0) {
        throw new Error('Empresa não encontrada')
      }

      const empresaData = empresasItems[0] as any as EmpresaData
      setEmpresa(empresaData)

      // Determinar identificador da empresa (tenta vários nomes possíveis)
      const companyId =
        (empresaData as any).idEmpresa ??
        (empresaData as any).id_empresa ??
        (empresaData as any).id ??
        (empresaData as any).$id ??
        null

      if (!companyId) {
        throw new Error('ID da empresa não encontrado')
      }

      // Guardar o id canônico para exibir no dashboard (para compartilhar com funcionários)
      setCompanyIdDisplay(String(companyId))

      // Buscar funcionários via API; tenta múltiplas query keys para compatibilidade
      const userQueries = [
        `id_empresa=${companyId}`,
        `idEmpresa=${companyId}`,
        `empresaId=${companyId}`,
        `empresa=${companyId}`,
      ]

      let funcionariosData: Funcionario[] = []
      for (const q of userQueries) {
        try {
          const resp = await get(`/users?${q}`)
          const respAny = resp as any
          let items: any[] = []
          if (Array.isArray(respAny)) {
            items = respAny
          } else if (respAny && Array.isArray(respAny.data)) {
            items = respAny.data
          } else if (respAny && Array.isArray(respAny.items)) {
            items = respAny.items
          } else if (respAny) {
            items = [respAny]
          }

          if (items.length > 0) {
            funcionariosData = items as unknown as Funcionario[]
            break
          }
        } catch (_e) {
          // tenta próximo formato
        }
      }

      // Filtra funcionários: manter apenas os que registraram usando o ID da empresa.
      // Aceita vários formatos: strings, números e objetos { id, $id }.
      const canonicalCompanyId = String(companyId)
      const extractId = (val: any) => {
        if (val == null) {
          return null
        }
        if (typeof val === 'string' || typeof val === 'number') {
          return String(val)
        }
        if (typeof val === 'object') {
          // common variants
          if (val.id) {
            return String(val.id)
          }
          if (val.$id) {
            return String(val.$id)
          }
          if (val._id) {
            return String(val._id)
          }
          if (val.companyId) {
            return String(val.companyId)
          }
        }
        return null
      }

      funcionariosData = (funcionariosData || []).filter((f: any) => {
        if (!f) {
          return false
        }
        const candidateFields = [
          f.idEmpresa,
          f.id_empresa,
          f.empresaId,
          f.empresa,
          f.companyId,
          f.empresa_id,
          f.company,
        ]

        for (const c of candidateFields) {
          const v = extractId(c)
          if (v && v === canonicalCompanyId) {
            return true
          }
        }

        // also check if employee.row contains nested company object under other keys
        const nestedCandidates = ['empresa', 'company', 'organization']
        for (const key of nestedCandidates) {
          const obj = (f as any)[key]
          const v = extractId(obj)
          if (v && v === canonicalCompanyId) {
            return true
          }
        }

        return false
      })

      // Normaliza campos que podem ter nomes diferentes no backend
      const normalizedFuncionarios: Funcionario[] = (funcionariosData || []).map((f: any) => {
        const id = (f && (f.$id ?? f.id ?? f.id_usuario ?? f.userId)) || String(Math.random())

        // Name resolution: try many aliases and compose from first/last if needed
        let nome_completo =
          f?.nome_completo ?? f?.nome ?? f?.name ?? f?.full_name ?? f?.fullName ?? ''
        if (!nome_completo) {
          const first = f?.firstName ?? f?.firstname ?? f?.given_name ?? ''
          const last = f?.lastName ?? f?.lastname ?? f?.family_name ?? ''
          nome_completo = [first, last].filter(Boolean).join(' ').trim()
        }

        // Email
        const email = f?.email ?? f?.email_contato ?? f?.emailContact ?? f?.email_contact ?? ''

        // Occupation aliases
        const ocupacao =
          f?.ocupacao ?? f?.ocupation ?? f?.occupation ?? f?.role ?? f?.cargo ?? f?.job_title ?? ''

        // Career level aliases
        const nivel_carreira =
          f?.nivel_carreira ?? f?.nivelCarreira ?? f?.careerLevel ?? f?.nivel ?? f?.level ?? ''

        // Date aliases
        const data_cadastro =
          f?.data_cadastro ??
          f?.created_at ??
          f?.createdAt ??
          f?.date_registered ??
          f?.dateRegistered ??
          f?.data ??
          ''

        // Fallbacks: if no name, try deriving from email local-part
        let finalName = nome_completo
        if (!finalName && email) {
          finalName = String(email).split('@')[0]
        }

        return {
          $id: String(id),
          nome_completo: finalName,
          email,
          ocupacao,
          nivel_carreira,
          data_cadastro,
        }
      })

      setFuncionarios(normalizedFuncionarios)

      // Buscar dados de bem-estar dos funcionários via API
      if (funcionariosData.length > 0) {
        // Primeiro, tente buscar por usuário (muitos formatos de id)
        const bemEstarPromises = funcionariosData.map(async (f) => {
          const candidateIds = [
            (f as any).id,
            (f as any).$id,
            (f as any).id_usuario,
            (f as any).idUser,
            (f as any).userId,
            (f as any).uid,
            (f as any).idUserAlt,
          ].filter(Boolean)

          const candidateEmails = [(f as any).email, (f as any).email_contato].filter(Boolean)

          const tried = new Set<string>()

          for (const id of candidateIds) {
            const idStr = String(id)
            const bemQueries = [
              `userId=${idStr}`,
              `id_usuario=${idStr}`,
              `idUser=${idStr}`,
              `idUsuario=${idStr}`,
              `id=${idStr}`,
            ]

            for (const q of bemQueries) {
              if (tried.has(q)) {
                continue
              }
              tried.add(q)
              try {
                const resp = await get(`/wellBeing?${q}`)
                const respAny = resp as any
                let items: any[] = []
                if (Array.isArray(respAny)) {
                  items = respAny
                } else if (respAny && Array.isArray(respAny.data)) {
                  items = respAny.data
                } else if (respAny && Array.isArray(respAny.items)) {
                  items = respAny.items
                } else if (respAny) {
                  items = [respAny]
                }

                if (items.length === 0) {
                  // wellBeing: no items for query
                  continue
                }

                // wellBeing: items for query

                items.sort((a: any, b: any) => {
                  const da = new Date(a.data_registro ?? a.data ?? 0).getTime()
                  const dbt = new Date(b.data_registro ?? b.data ?? 0).getTime()
                  return dbt - da
                })

                return items[0] as BemEstarData
              } catch (_e) {
                // tenta próxima
              }
            }
          }

          // tentar por email
          for (const em of candidateEmails) {
            const q = `email=${encodeURIComponent(String(em))}`
            if (tried.has(q)) {
              continue
            }
            tried.add(q)
            try {
              const resp = await get(`/wellBeing?${q}`)
              const respAny = resp as any
              let items: any[] = []
              if (Array.isArray(respAny)) {
                items = respAny
              } else if (respAny && Array.isArray(respAny.data)) {
                items = respAny.data
              } else if (respAny && Array.isArray(respAny.items)) {
                items = respAny.items
              } else if (respAny) {
                items = [respAny]
              }

              if (items.length === 0) {
                // wellBeing: no company items for query
                continue
              }

              // wellBeing: company items for query

              items.sort((a: any, b: any) => {
                const da = new Date(a.data_registro ?? a.data ?? 0).getTime()
                const dbt = new Date(b.data_registro ?? b.data ?? 0).getTime()
                return dbt - da
              })

              return items[0] as BemEstarData
            } catch (_e) {
              // ignore
            }
          }

          return undefined
        })

        const bemEstarResults = await Promise.all(bemEstarPromises)
        let validResults = bemEstarResults.filter((r): r is BemEstarData => r !== undefined)

        // Se não encontrou por usuário, tente buscar todos os registros da empresa
        if (validResults.length === 0) {
          const companyBemQueries = [
            `empresaId=${companyId}`,
            `idEmpresa=${companyId}`,
            `id_empresa=${companyId}`,
            `companyId=${companyId}`,
          ]

          for (const cq of companyBemQueries) {
            try {
              const resp = await get(`/wellBeing?${cq}`)
              const respAny = resp as any
              let items: any[] = []
              if (Array.isArray(respAny)) {
                items = respAny
              } else if (respAny && Array.isArray(respAny.data)) {
                items = respAny.data
              } else if (respAny && Array.isArray(respAny.items)) {
                items = respAny.items
              } else if (respAny) {
                items = [respAny]
              }

              if (items.length === 0) {
                continue
              }

              // Agrupar por usuário e pegar o mais recente por usuário
              const grouped = new Map<string, any[]>()
              for (const it of items) {
                const uid = String(
                  it.id_usuario ??
                    it.userId ??
                    it.idUser ??
                    it.user_id ??
                    it.email ??
                    Math.random(),
                )
                const arr = grouped.get(uid) ?? []
                arr.push(it)
                grouped.set(uid, arr)
              }

              const latestPerUser: BemEstarData[] = []
              for (const arr of grouped.values()) {
                arr.sort((a: any, b: any) => {
                  const da = new Date(a.data_registro ?? a.data ?? 0).getTime()
                  const dbt = new Date(b.data_registro ?? b.data ?? 0).getTime()
                  return dbt - da
                })
                latestPerUser.push(arr[0] as BemEstarData)
              }

              validResults = latestPerUser
              break
            } catch (_e) {
              // tenta próxima query
            }
          }
        }

        // Calcular médias com detecção automática de aliases de campo
        if (validResults.length > 0) {
          const sample = validResults[0] as any

          const estresseKeys = [
            'nivel_estresse',
            'estresse',
            'stress',
            'stressLevel',
            'nivelEstresse',
          ]
          const motivacaoKeys = [
            'nivel_motivacao',
            'motivacao',
            'motivation',
            'motivationLevel',
            'nivelMotivacao',
          ]
          const sonoKeys = [
            'qualidade_sono',
            'sono',
            'sleepQuality',
            'sleep_quality',
            'quality_sleep',
          ]

          const findKey = (keys: string[]) => keys.find((k) => k in sample) ?? null

          const kEstresse = findKey(estresseKeys)
          const kMotivacao = findKey(motivacaoKeys)
          const kSono = findKey(sonoKeys)

          const toNumber = (v: any) => {
            if (v == null) {
              return 0
            }
            const n = Number(v)
            return Number.isNaN(n) ? 0 : n
          }

          const somaEstresse = validResults.reduce(
            (acc, r) => acc + toNumber((r as any)[kEstresse ?? 'nivel_estresse']),
            0,
          )
          const somaMotivacao = validResults.reduce(
            (acc, r) => acc + toNumber((r as any)[kMotivacao ?? 'nivel_motivacao']),
            0,
          )
          const somaSono = validResults.reduce(
            (acc, r) => acc + toNumber((r as any)[kSono ?? 'qualidade_sono']),
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
              validResults.length > 0 ? Math.round((somaSono / validResults.length) * 10) / 10 : 0,
          })
        }
      }
    } catch (err) {
      setError(String((err as Error)?.message ?? err))
    } finally {
      setLoading(false)
    }
  }, [userData])

  useEffect(() => {
    // Only fetch company data when the logged user is a company account.
    if ((userData as any)?.tipo_conta === 'empresa') {
      fetchDadosEmpresa()
    }
  }, [userData, fetchDadosEmpresa])

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
              <p className="text-xs text-[var(--text-muted)] sm:text-sm">CNPJ: {empresa?.cnpj}</p>
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
              <h3 className="text-sm font-medium text-[var(--text-secondary)]">Média Estresse</h3>
              <FaHeart className="h-5 w-5 text-red-600 dark:text-red-400" />
            </div>
            <p className="text-2xl font-bold text-[var(--text-primary)] sm:text-3xl">
              {medias.estresse.toFixed(1)}
              <span className="text-base font-normal text-[var(--text-muted)]">/10</span>
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
              <h3 className="text-sm font-medium text-[var(--text-secondary)]">Média Motivação</h3>
              <FaBatteryFull className="h-5 w-5 text-green-600 dark:text-green-400" />
            </div>
            <p className="text-2xl font-bold text-[var(--text-primary)] sm:text-3xl">
              {medias.motivacao.toFixed(1)}
              <span className="text-base font-normal text-[var(--text-muted)]">/10</span>
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
              <h3 className="text-sm font-medium text-[var(--text-secondary)]">Média Sono</h3>
              <FaMoon className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            </div>
            <p className="text-2xl font-bold text-[var(--text-primary)] sm:text-3xl">
              {medias.sono.toFixed(1)}
              <span className="text-base font-normal text-[var(--text-muted)]">/10</span>
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
              <p className="text-[var(--text-secondary)]">Nenhum funcionário cadastrado ainda</p>
              <p className="mt-2 text-sm text-[var(--text-muted)]">
                Os funcionários podem se cadastrar informando o ID da sua empresa
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
                    <tr key={func.$id} className="transition-colors hover:bg-[var(--bg-tertiary)]">
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
                        {func.data_cadastro
                          ? (() => {
                              const d = new Date(func.data_cadastro)
                              return isNaN(d.getTime())
                                ? String(func.data_cadastro)
                                : d.toLocaleDateString('pt-BR')
                            })()
                          : '-'}
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
            Compartilhe este ID com seus funcionários para que eles possam se cadastrar:
          </p>
          <div className="mt-2 flex items-center gap-3">
            <div className="flex-1 rounded bg-white p-3 font-mono text-sm font-bold text-blue-900 dark:bg-gray-900 dark:text-blue-200">
              {companyIdDisplay ?? empresa?.$id ?? '-'}
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => {
                  fetchDadosEmpresa()
                }}
                className="rounded bg-indigo-600 px-3 py-2 text-sm font-medium text-white transition-colors hover:bg-indigo-700"
              >
                Recarregar
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
