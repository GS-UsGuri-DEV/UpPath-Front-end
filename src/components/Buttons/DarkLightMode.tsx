import { MdDarkMode, MdLightMode } from 'react-icons/md'
import { useTheme } from '../../hooks/useTheme'

export default function DarkLightMode() {
  const { isDark, toggleTheme } = useTheme()

  return (
    <button
      onClick={toggleTheme}
      className="flex items-center justify-center rounded-lg p-2 text-[var(--text-primary)] transition-all duration-200 hover:scale-110 hover:bg-[var(--bg-secondary)] active:scale-95"
      aria-label={isDark ? 'Mudar para modo claro' : 'Mudar para modo escuro'}
      type="button"
    >
      {isDark ? (
        <MdLightMode className="text-2xl" />
      ) : (
        <MdDarkMode className="text-2xl" />
      )}
    </button>
  )
}
