import { FaChartBar, FaUser, FaUsers } from 'react-icons/fa'
import { Link } from 'react-router-dom'

import type { QuickAccessSectionProps } from '../../types/profile'

export default function QuickAccessSection({
  showCadastro,
}: QuickAccessSectionProps) {
  return (
    <section className="rounded-xl border border-[var(--border-color)] bg-[var(--bg-secondary)] p-6">
      <h2 className="mb-4 text-lg font-semibold text-[var(--text-primary)]">
        Acesso Rápido
      </h2>
      <div className="space-y-3">
        <Link
          to="/perfil"
          className="block rounded-lg border border-[var(--border-color)] p-3 transition-colors hover:border-[var(--border-color)] hover:bg-[var(--bg-secondary)]"
        >
          <div className="flex items-center gap-2 font-medium text-[var(--text-primary)]">
            <FaUser /> Meu Perfil
          </div>
          <p className="text-xs text-[var(--text-muted)]">
            Visualize e edite suas informações
          </p>
        </Link>
        <Link
          to="/dashboard"
          className="block rounded-lg border border-[var(--border-color)] p-3 transition-colors hover:border-[var(--border-color)] hover:bg-[var(--bg-secondary)]"
        >
          <div className="flex items-center gap-2 font-medium text-[var(--text-primary)]">
            <FaChartBar /> Dashboard
          </div>
          <p className="text-xs text-[var(--text-muted)]">
            Acompanhe seu histórico de bem-estar
          </p>
        </Link>
        {showCadastro && (
          <Link
            to="/cadastro"
            className="block rounded-lg border border-[var(--border-color)] p-3 transition-colors hover:border-[var(--border-color)] hover:bg-[var(--bg-secondary)]"
          >
            <div className="flex items-center gap-2 font-medium text-[var(--text-primary)]">
              <FaUsers /> Cadastro
            </div>
            <p className="text-xs text-[var(--text-muted)]">
              Registrar novos usuários
            </p>
          </Link>
        )}
      </div>
    </section>
  )
}
