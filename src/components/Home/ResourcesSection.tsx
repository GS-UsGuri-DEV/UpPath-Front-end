import { FaBook, FaLightbulb, FaBullseye } from 'react-icons/fa';

export default function ResourcesSection() {
  return (
    <section className="rounded-xl border bg-white p-6">
      <h2 className="text-lg font-semibold mb-3">Recursos e Suporte</h2>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
        <div className="p-3 rounded border hover:border-gray-400 transition-colors">
          <div className="text-sm font-medium mb-1 flex items-center gap-2">
            <FaBook /> Guias
          </div>
          <p className="text-xs text-gray-600">Aprenda a usar a plataforma</p>
        </div>
        <div className="p-3 rounded border hover:border-gray-400 transition-colors">
          <div className="text-sm font-medium mb-1 flex items-center gap-2">
            <FaLightbulb /> Dicas
          </div>
          <p className="text-xs text-gray-600">Melhore seu bem-estar diário</p>
        </div>
        <div className="p-3 rounded border hover:border-gray-400 transition-colors">
          <div className="text-sm font-medium mb-1 flex items-center gap-2">
            <FaBullseye /> Objetivos
          </div>
          <p className="text-xs text-gray-600">Defina e acompanhe metas</p>
        </div>
      </div>
    </section>
  );
}
