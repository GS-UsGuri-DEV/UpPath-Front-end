import { FaBook, FaLightbulb, FaBullseye } from 'react-icons/fa'

export default function ResourcesSection() {
  return (
    <section className="rounded-xl border bg-white p-6">
      <h2 className="mb-3 text-lg font-semibold">Recursos e Suporte</h2>
      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
        <div className="rounded border p-3 transition-colors hover:border-gray-400">
          <div className="mb-1 flex items-center gap-2 text-sm font-medium">
            <FaBook /> Guias
          </div>
          <p className="text-xs text-gray-600">Aprenda a usar a plataforma</p>
        </div>
        <div className="rounded border p-3 transition-colors hover:border-gray-400">
          <div className="mb-1 flex items-center gap-2 text-sm font-medium">
            <FaLightbulb /> Dicas
          </div>
          <p className="text-xs text-gray-600">Melhore seu bem-estar diário</p>
        </div>
        <div className="rounded border p-3 transition-colors hover:border-gray-400">
          <div className="mb-1 flex items-center gap-2 text-sm font-medium">
            <FaBullseye /> Objetivos
          </div>
          <p className="text-xs text-gray-600">Defina e acompanhe metas</p>
        </div>
      </div>
    </section>
  )
}
