import type { SpinnerProps } from '../../types/spinner'

export default function Spinner({
  text,
  className = '',
  size = 64,
}: SpinnerProps) {
  return (
    <div
      className={`flex items-center justify-center gap-4 ${className}`}
      role="status"
      aria-label={text || 'Carregando'}
    >
      <span
        className="mr-4 inline-block animate-spin rounded-full border-4 border-t-4 border-gray-400 border-t-indigo-500"
        style={{ width: size, height: size }}
      >
        <span className="sr-only">{text || 'Carregando'}</span>
      </span>
      {text && <span className="text-lg">{text}</span>}
    </div>
  )
}
