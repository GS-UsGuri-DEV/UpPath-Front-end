import { useState } from 'react'
import { FaBook, FaRoad, FaSearch, FaTimes } from 'react-icons/fa'
import CursoCard from '../../components/Cursos/CursoCard'
import TrilhaCard from '../../components/Cursos/TrilhaCard'
import Footer from '../../components/Footer'
import {
  categorias,
  cursosDisponiveis,
  trilhasDisponiveis,
} from '../../data/cursosData'

export default function Cursos() {
  const [visualizacao, setVisualizacao] = useState<'cursos' | 'trilhas'>(
    'trilhas',
  )
  const [categoriaFiltro, setCategoriaFiltro] = useState('Todas')
  const [busca, setBusca] = useState('')

  const cursosFiltrados = cursosDisponiveis.filter((curso) => {
    const matchCategoria =
      categoriaFiltro === 'Todas' || curso.categoria === categoriaFiltro
    const matchBusca =
      busca === '' ||
      curso.titulo.toLowerCase().includes(busca.toLowerCase()) ||
      curso.descricao.toLowerCase().includes(busca.toLowerCase()) ||
      curso.tags.some((tag) => tag.toLowerCase().includes(busca.toLowerCase()))
    return matchCategoria && matchBusca
  })

  const trilhasFiltradas = trilhasDisponiveis.filter((trilha) => {
    const matchCategoria =
      categoriaFiltro === 'Todas' || trilha.categoria === categoriaFiltro
    const matchBusca =
      busca === '' ||
      trilha.nome.toLowerCase().includes(busca.toLowerCase()) ||
      trilha.descricao.toLowerCase().includes(busca.toLowerCase()) ||
      trilha.tags.some((tag) => tag.toLowerCase().includes(busca.toLowerCase()))
    return matchCategoria && matchBusca
  })

  return (
    <div className="min-h-screen bg-[var(--bg-primary)]">
      <div className="mx-auto max-w-7xl px-4 py-8 pb-16 sm:px-6 sm:py-12 sm:pb-24">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="mb-4 text-4xl font-bold text-[var(--text-primary)]">
            Cursos e Trilhas
          </h1>
          <p className="text-lg text-[var(--text-muted)]">
            Descubra trilhas personalizadas e cursos para acelerar sua carreira
          </p>
        </div>

        {/* Toggle Visualização */}
        <div className="mb-6 flex justify-center">
          <div className="inline-flex rounded-lg border border-[var(--border-color)] bg-[var(--bg-secondary)] p-1">
            <button
              onClick={() => setVisualizacao('trilhas')}
              className={`flex items-center gap-2 rounded-md px-6 py-2 text-sm font-medium transition-colors ${
                visualizacao === 'trilhas'
                  ? 'bg-indigo-600 text-white'
                  : 'text-[var(--text-muted)] hover:text-[var(--text-primary)]'
              }`}
            >
              <FaRoad />
              Trilhas
            </button>
            <button
              onClick={() => setVisualizacao('cursos')}
              className={`flex items-center gap-2 rounded-md px-6 py-2 text-sm font-medium transition-colors ${
                visualizacao === 'cursos'
                  ? 'bg-indigo-600 text-white'
                  : 'text-[var(--text-muted)] hover:text-[var(--text-primary)]'
              }`}
            >
              <FaBook />
              Cursos
            </button>
          </div>
        </div>

        {/* Busca e Filtros */}
        <div className="mb-6 grid gap-4 md:grid-cols-2">
          {/* Busca */}
          <div className="relative">
            <FaSearch className="absolute top-1/2 left-3 -translate-y-1/2 text-[var(--text-muted)]" />
            <input
              type="text"
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
              placeholder={`Buscar ${visualizacao}...`}
              className="w-full rounded-lg border border-[var(--border-color)] bg-[var(--bg-secondary)] py-2 pr-10 pl-10 text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:border-indigo-600 focus:ring-2 focus:ring-indigo-300/30 focus:outline-none"
            />
            {busca && (
              <button
                onClick={() => setBusca('')}
                className="absolute top-1/2 right-3 -translate-y-1/2 text-[var(--text-muted)] hover:text-[var(--text-primary)]"
              >
                <FaTimes />
              </button>
            )}
          </div>

          {/* Filtro de Categoria */}
          <div className="flex gap-2 overflow-x-auto pb-2">
            {categorias.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategoriaFiltro(cat)}
                className={`rounded-lg px-4 py-2 text-sm font-medium whitespace-nowrap transition-colors ${
                  categoriaFiltro === cat
                    ? 'bg-indigo-600 text-white'
                    : 'border border-[var(--border-color)] bg-[var(--bg-secondary)] text-[var(--text-muted)] hover:bg-[var(--bg-tertiary)] hover:text-[var(--text-primary)]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Contador */}
        <div className="mb-4 text-sm text-[var(--text-muted)]">
          {visualizacao === 'cursos'
            ? `${cursosFiltrados.length} cursos encontrados`
            : `${trilhasFiltradas.length} trilhas encontradas`}
        </div>

        {/* Grid de Cards */}
        {visualizacao === 'trilhas' ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {trilhasFiltradas.map((trilha) => (
              <TrilhaCard
                key={trilha.id}
                trilha={trilha}
                onClick={() => {
                  console.log('Trilha clicada:', trilha.id)
                }}
              />
            ))}
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {cursosFiltrados.map((curso) => (
              <CursoCard
                key={curso.id}
                curso={curso}
                onClick={() => {
                  console.log('Curso clicado:', curso.id)
                }}
              />
            ))}
          </div>
        )}

        {/* Mensagem quando vazio */}
        {((visualizacao === 'cursos' && cursosFiltrados.length === 0) ||
          (visualizacao === 'trilhas' && trilhasFiltradas.length === 0)) && (
          <div className="py-12 text-center">
            <p className="mb-2 text-lg text-[var(--text-muted)]">
              Nenhum resultado encontrado
            </p>
            <button
              onClick={() => {
                setBusca('')
                setCategoriaFiltro('Todas')
              }}
              className="text-indigo-600 hover:underline"
            >
              Limpar filtros
            </button>
          </div>
        )}
      </div>

      <Footer />
    </div>
  )
}
