import ChangePassword from '../../components/Perfil/ChangePassword'
import ProfileCard from '../../components/Perfil/ProfileCard'
import Spinner from '../../components/Spinner/Spinner'
import { useAuth } from '../../contexts/useAuth'

export default function Perfil() {
  const { userData, loading } = useAuth()

  const displayName = (userData as any)?.nome_completo ?? (userData as any)?.name ?? '—'
  const displayEmail = String(userData?.email ?? '—')
  const profileImage = String((userData && (userData.profile_image as unknown)) ?? '')
  const nivelCarreira = (userData as any)?.nivel_carreira ?? (userData as any)?.nivelCarreira ?? '—'
  const occupation = (userData as any)?.ocupacao ?? (userData as any)?.occupation ?? '—'
  const gender = (userData as any)?.genero ?? (userData as any)?.gender ?? '—'
  const dateRegistered =
    (userData as any)?.data_cadastro ??
    (userData as any)?.dateRegistered ??
    (userData as any)?.dateRegistered ??
    ''
  function fmtDate(d: string | undefined) {
    if (!d) {
      return '—'
    }
    try {
      const s = String(d)
      const iso = s.split('T')[0]
      if (!iso) {
        return '—'
      }
      const parts = iso.split('-')
      if (parts.length >= 3) {
        return `${parts[2]}/${parts[1]}/${parts[0]}`
      }
      const dd = new Date(d)
      if (Number.isNaN(dd.getTime())) {
        return d
      }
      return dd.toLocaleDateString()
    } catch {
      return d
    }
  }

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[var(--bg-primary)]">
        <Spinner text="Carregando perfil..." />
      </div>
    )
  }

  // Oculta o perfil para empresas
  if (userData?.tipo_conta === 'empresa') {
    return null
  }

  return (
    <div className="min-h-screen bg-[var(--bg-primary)]">
      <div className="mx-auto max-w-3xl space-y-6 p-6">
        <h1 className="text-2xl font-bold text-[var(--text-primary)]">Meu Perfil</h1>

        <ProfileCard
          profileImage={profileImage}
          displayName={displayName}
          displayEmail={displayEmail}
        />

        <section className="rounded-xl border border-[var(--border-color)] bg-[var(--bg-secondary)] p-4">
          <h3 className="mb-2 font-semibold text-[var(--text-primary)]">Detalhes</h3>
          <div className="grid grid-cols-1 gap-2 text-[var(--text-secondary)]">
            <div>
              <strong>Carreira:</strong> {nivelCarreira}
            </div>
            <div>
              <strong>Ocupação:</strong> {occupation}
            </div>
            <div>
              <strong>Gênero:</strong> {gender}
            </div>
            <div>
              <strong>Data de cadastro:</strong> {fmtDate(dateRegistered)}
            </div>
          </div>
        </section>

        <ChangePassword />
      </div>
    </div>
  )
}
