import { FaBook, FaChartLine, FaClock } from 'react-icons/fa'
import type { TrilhaCompleta } from '../../data/cursosData'

type TrilhaCardProps = {
  trilha: TrilhaCompleta
  onClick: () => void
}

export default function TrilhaCard({ trilha, onClick }: TrilhaCardProps) {
  const getNivelColor = (nivel: string) => {
    switch (nivel) {
      case 'Iniciante':
        return 'text-green-600'
      case 'Intermediário':
        return 'text-yellow-600'
      case 'Avançado':
        return 'text-red-600'
      default:
        return 'text-gray-600'
    }
  }

  return (
    <div
      onClick={onClick}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          onClick()
        }
      }}
      role="button"
      tabIndex={0}
      className="group cursor-pointer rounded-xl border-2 border-gray-200 bg-white p-5 shadow-md transition-all duration-200 hover:-translate-y-1 hover:border-purple-500 hover:shadow-xl dark:border-gray-700 dark:bg-[var(--bg-secondary)] dark:hover:border-purple-400"
    >
      <div className="mb-3">
        <h3 className="mb-2 text-xl font-bold text-black group-hover:text-purple-600 dark:text-[var(--text-primary)] dark:group-hover:text-indigo-600">
          {trilha.nome}
        </h3>
        <p className="mb-3 line-clamp-2 text-sm text-gray-700 dark:text-[var(--text-muted)]">
          {trilha.descricao}
        </p>
      </div>

      <div className="mb-4 flex flex-wrap gap-2">
        {trilha.tags.slice(0, 4).map((tag) => (
          <span
            key={tag}
            className="rounded-full bg-gray-300 px-3 py-1 text-xs font-semibold text-black dark:bg-gray-600 dark:text-white"
          >
            {tag}
          </span>
        ))}
      </div>

      <div className="mb-4 grid grid-cols-3 gap-2 text-xs">
        <div className="flex flex-col items-center rounded-lg bg-gray-300 p-2.5 dark:bg-gray-600">
          <FaClock className="mb-1 text-indigo-600 dark:text-indigo-400" />
          <span className="font-bold text-black dark:text-white">{trilha.duracao_total}</span>
        </div>
        <div className="flex flex-col items-center rounded-lg bg-gray-300 p-2.5 dark:bg-gray-600">
          <FaBook className="mb-1 text-indigo-600 dark:text-indigo-400" />
          <span className="font-bold text-black dark:text-white">{trilha.num_cursos} cursos</span>
        </div>
        <div className="flex flex-col items-center rounded-lg bg-gray-300 p-2.5 dark:bg-gray-600">
          <FaChartLine className={`mb-1 ${getNivelColor(trilha.nivel)}`} />
          <span className="font-bold text-black dark:text-white">{trilha.nivel}</span>
        </div>
      </div>

      {trilha.progresso !== undefined && trilha.progresso > 0 && (
        <div className="mt-4">
          <div className="mb-1 flex items-center justify-between text-xs font-medium">
            <span className="text-black dark:text-[var(--text-muted)]">Progresso</span>
            <span className="font-bold text-purple-700 dark:text-indigo-600">
              {trilha.progresso}%
            </span>
          </div>
          <div className="h-2.5 overflow-hidden rounded-full bg-gray-300 dark:bg-gray-700">
            <div
              className="h-full rounded-full bg-gradient-to-r from-indigo-600 to-purple-600"
              style={{ width: `${trilha.progresso}%` }}
            />
          </div>
        </div>
      )}
    </div>
  )
}
