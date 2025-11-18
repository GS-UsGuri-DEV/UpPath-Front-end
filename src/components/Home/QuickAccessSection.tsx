import { Link } from 'react-router-dom'
import { FaUser, FaChartBar, FaUsers } from 'react-icons/fa'

interface QuickAccessSectionProps {
  showCadastro: boolean
}

export default function QuickAccessSection({
  showCadastro,
}: QuickAccessSectionProps) {
  return (
    <section className="rounded-xl border bg-white p-6">
      <h2 className="mb-4 text-lg font-semibold">Acesso Rápido</h2>
      <div className="space-y-3">
        <Link
          to="/perfil"
          className="block rounded-lg border p-3 transition-colors hover:border-indigo-500 hover:bg-indigo-50"
        >
          <div className="flex items-center gap-2 font-medium text-gray-800">
            <FaUser /> Meu Perfil
          </div>
          <p className="text-xs text-gray-600">
            Visualize e edite suas informações
          </p>
        </Link>
        <Link
          to="/dashboard"
          className="block rounded-lg border p-3 transition-colors hover:border-green-500 hover:bg-green-50"
        >
          <div className="flex items-center gap-2 font-medium text-gray-800">
            <FaChartBar /> Dashboard
          </div>
          <p className="text-xs text-gray-600">
            Acompanhe seu histórico de bem-estar
          </p>
        </Link>
        {showCadastro && (
          <Link
            to="/cadastro"
            className="block rounded-lg border p-3 transition-colors hover:border-blue-500 hover:bg-blue-50"
          >
            <div className="flex items-center gap-2 font-medium text-gray-800">
              <FaUsers /> Cadastro
            </div>
            <p className="text-xs text-gray-600">Registrar novos usuários</p>
          </Link>
        )}
      </div>
    </section>
  )
}
