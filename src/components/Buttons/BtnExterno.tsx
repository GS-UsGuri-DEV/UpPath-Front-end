import type { BtnExternoProps } from '../../types/button'

/**
 * Botão para links externos
 * Usado para navegação para fora da aplicação
 */
export default function BtnExterno({
  href,
  children,
  className = '',
  target = '_blank',
  'aria-label': ariaLabel,
}: BtnExternoProps) {
  return (
    <a
      href={href}
      target={target}
      rel={target === '_blank' ? 'noopener noreferrer' : undefined}
      aria-label={ariaLabel}
      className={`bg-backBtn hover:bg-hoverBtn inline-flex items-center justify-center rounded-md px-3 py-1.5 text-sm font-bold break-words whitespace-normal text-white transition-colors duration-300 sm:text-base ${className} `}
    >
      {children}
    </a>
  )
}
