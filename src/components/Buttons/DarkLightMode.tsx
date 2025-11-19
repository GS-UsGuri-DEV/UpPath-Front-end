import { MdDarkMode, MdLightMode } from 'react-icons/md'
import { useTheme } from '../../hooks/useTheme'

export default function DarkLightMode() {
  const { isDark, toggleTheme } = useTheme()

  return (
    <button
      onClick={toggleTheme}
      className="flex items-center justify-center rounded-lg bg-[var(--bg-tertiary)] p-2 transition-all duration-200 hover:scale-110 hover:bg-[var(--bg-secondary)] active:scale-95 dark:bg-[var(--bg-tertiary)] dark:hover:bg-[var(--bg-secondary)]"
      aria-label={isDark ? 'Mudar para modo claro' : 'Mudar para modo escuro'}
      type="button"
    >
      {isDark ? (
        <MdLightMode className="text-2xl text-yellow-400" />
      ) : (
        <MdDarkMode className="text-2xl text-slate-200" />
      )}
    </button>
  )
}
