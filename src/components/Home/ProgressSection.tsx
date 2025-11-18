import { FaFire } from 'react-icons/fa';

export default function ProgressSection() {
  return (
    <section className="rounded-xl border bg-white p-6">
      <h2 className="text-lg font-semibold mb-4">Seu Progresso</h2>
      <div className="space-y-4">
        <div className="p-4 rounded-lg bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200">
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
        <div className="p-4 rounded-lg bg-gray-50 border">
          <div className="text-sm text-gray-600 mb-2">Continue sua jornada</div>
          <p className="text-xs text-gray-500">Registre seu bem-estar hoje usando o card no canto da tela! →</p>
        </div>
      </div>
    </section>
  );
}
