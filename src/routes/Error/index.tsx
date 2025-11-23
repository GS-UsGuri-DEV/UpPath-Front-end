import { FaHome, FaSearch } from 'react-icons/fa'
import { TbError404 } from 'react-icons/tb'
import { Link, useNavigate } from 'react-router-dom'

export default function Error404() {
  const navigate = useNavigate()

  return (
    <div className="flex min-h-screen items-center justify-center bg-[var(--bg-primary)] p-4">
      <div className="w-full max-w-2xl text-center">
        <div className="mb-8 flex justify-center">
          <div className="relative">
            <TbError404 className="h-32 w-32 animate-pulse text-red-500 sm:h-40 sm:w-40 md:h-48 md:w-48" />
            <div className="absolute -inset-4 animate-ping rounded-full bg-red-500/20 blur-xl" />
          </div>
        </div>

        <h1 className="mb-4 text-4xl font-bold text-[var(--text-primary)] sm:text-5xl md:text-6xl">
          Oops! Página não encontrada
        </h1>

        <p className="mb-2 text-lg text-[var(--text-secondary)] sm:text-xl">
          Parece que você se perdeu no caminho...
        </p>
        <p className="mb-8 text-base text-[var(--text-muted)] sm:text-lg">
          A página que você está procurando não existe ou foi movida.
        </p>

        <div className="mb-8 rounded-lg border border-[var(--border-color)] bg-[var(--bg-secondary)] p-6">
          <h2 className="mb-4 text-lg font-semibold text-[var(--text-primary)]">
            O que você pode fazer:
          </h2>
          <ul className="space-y-2 text-left text-[var(--text-secondary)]">
            <li className="flex items-start gap-2">
              <span className="mt-1 text-indigo-500">•</span>
              <span>Verifique se o endereço foi digitado corretamente</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1 text-indigo-500">•</span>
              <span>Volte para a página inicial e navegue a partir de lá</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1 text-indigo-500">•</span>
              <span>Use o botão voltar do seu navegador</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1 text-indigo-500">•</span>
              <span>Entre em contato conosco se o problema persistir</span>
            </li>
          </ul>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Link
            to="/"
            className="flex items-center justify-center gap-2 rounded-lg bg-indigo-600 px-6 py-3 text-base font-medium text-white transition-all hover:bg-indigo-700 hover:shadow-lg sm:text-lg"
          >
            <FaHome className="h-5 w-5" />
            Voltar para Home
          </Link>
          <button
            onClick={() => navigate(-1)}
            className="flex items-center justify-center gap-2 rounded-lg border border-[var(--border-color)] bg-[var(--bg-secondary)] px-6 py-3 text-base font-medium text-[var(--text-primary)] transition-all hover:bg-[var(--bg-tertiary)] sm:text-lg"
          >
            <FaSearch className="h-5 w-5" />
            Voltar à Página Anterior
          </button>
        </div>

        <div className="mt-8 flex flex-wrap justify-center gap-4 text-sm text-[var(--text-muted)]">
          <Link
            to="/faq"
            className="transition-colors hover:text-[var(--text-primary)] hover:underline"
          >
            FAQ
          </Link>
          <span>•</span>
          <Link
            to="/contato"
            className="transition-colors hover:text-[var(--text-primary)] hover:underline"
          >
            Contato
          </Link>
          <span>•</span>
          <Link
            to="/cursos"
            className="transition-colors hover:text-[var(--text-primary)] hover:underline"
          >
            Cursos
          </Link>
        </div>
      </div>
    </div>
  )
}
