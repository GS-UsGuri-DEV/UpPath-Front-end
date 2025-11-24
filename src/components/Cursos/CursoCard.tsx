import { FaClock, FaBook, FaStar } from 'react-icons/fa'
import type { Curso } from '../../data/cursosData'

type CursoCardProps = {
  curso: Curso
  onClick: () => void
}

export default function CursoCard({ curso, onClick }: CursoCardProps) {
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
      className="group cursor-pointer rounded-xl border-2 border-gray-200 bg-white p-4 shadow-md transition-all duration-200 hover:-translate-y-1 hover:border-indigo-500 hover:shadow-xl dark:border-gray-700 dark:bg-[var(--bg-secondary)] dark:hover:border-indigo-400"
    >
      <div className="mb-3 flex items-start justify-between">
        <div className="flex-1">
          <h3 className="mb-2 text-lg font-bold text-black group-hover:text-indigo-600 dark:text-[var(--text-primary)]">
            {curso.titulo}
          </h3>
          <p className="mb-3 line-clamp-2 text-sm text-gray-700 dark:text-[var(--text-muted)]">
            {curso.descricao}
          </p>
        </div>
      </div>

      <div className="mb-3 flex flex-wrap gap-2">
        {curso.tags.slice(0, 3).map((tag) => (
          <span
            key={tag}
            className="rounded-full bg-gray-300 px-3 py-1 text-xs font-semibold text-black dark:bg-gray-600 dark:text-white"
          >
            {tag}
          </span>
        ))}
      </div>

      <div className="mb-3 flex items-center justify-between text-xs font-medium text-black dark:text-[var(--text-muted)]">
        <div className="flex items-center gap-1">
          <FaClock className="text-indigo-600 dark:text-indigo-500" />
          <span>{curso.duracao}</span>
        </div>
        <div className="flex items-center gap-1">
          <FaBook className="text-indigo-600 dark:text-indigo-500" />
          <span>{curso.plataforma}</span>
        </div>
        <span className={`flex items-center gap-1 font-semibold ${getNivelColor(curso.nivel)}`}>
          <FaStar />
          {curso.nivel}
        </span>
      </div>

      {curso.progresso !== undefined && curso.progresso > 0 && (
        <div className="mt-3">
          <div className="mb-1 flex items-center justify-between text-xs font-medium">
            <span className="text-black dark:text-[var(--text-muted)]">Progresso</span>
            <span className="font-bold text-indigo-700 dark:text-indigo-600">
              {curso.progresso}%
            </span>
          </div>
          <div className="h-2.5 overflow-hidden rounded-full bg-gray-300 dark:bg-gray-700">
            <div
              className="h-full rounded-full bg-gradient-to-r from-indigo-600 to-purple-600"
              style={{ width: `${curso.progresso}%` }}
            />
          </div>
        </div>
      )}
    </div>
  )
}
