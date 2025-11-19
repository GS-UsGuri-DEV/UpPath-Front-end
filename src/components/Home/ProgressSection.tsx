import { FaFire } from 'react-icons/fa'

export default function ProgressSection() {
  return (
    <section className="rounded-xl border border-[var(--border-color)] bg-[var(--bg-secondary)] p-6">
      <h2 className="mb-4 text-lg font-semibold text-[var(--text-primary)]">
        Seu Progresso
      </h2>
      <div className="space-y-4">
        <div className="rounded-lg border border-[var(--accent-success-border)] bg-[var(--accent-success-bg)] p-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm text-[var(--text-muted)]">
                Registros esta semana
              </div>
              <div className="text-2xl font-bold text-[var(--accent-success)]">
                —
              </div>
            </div>
            <div className="text-4xl text-[var(--accent-warning)]">
              <FaFire />
            </div>
          </div>
        </div>
        <div className="rounded-lg border border-[var(--border-color)] bg-[var(--bg-secondary)] p-4">
          <div className="mb-2 text-sm text-[var(--text-secondary)]">
            Continue sua jornada
          </div>
          <p className="text-xs text-[var(--text-secondary)]">
            Registre seu bem-estar hoje usando o card no canto da tela! →
          </p>
        </div>
      </div>
    </section>
  )
}
