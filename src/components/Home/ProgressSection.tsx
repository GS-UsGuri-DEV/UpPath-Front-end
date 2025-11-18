import { FaFire } from 'react-icons/fa'

export default function ProgressSection() {
  return (
    <section className="rounded-xl border bg-white p-6">
      <h2 className="mb-4 text-lg font-semibold">Seu Progresso</h2>
      <div className="space-y-4">
        <div className="rounded-lg border border-green-200 bg-gradient-to-r from-green-50 to-emerald-50 p-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm text-gray-600">Registros esta semana</div>
              <div className="text-2xl font-bold text-green-700">—</div>
            </div>
            <div className="text-4xl text-orange-500">
              <FaFire />
            </div>
          </div>
        </div>
        <div className="rounded-lg border bg-gray-50 p-4">
          <div className="mb-2 text-sm text-gray-600">Continue sua jornada</div>
          <p className="text-xs text-gray-500">
            Registre seu bem-estar hoje usando o card no canto da tela! →
          </p>
        </div>
      </div>
    </section>
  )
}
