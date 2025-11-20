import { createContext, useEffect, useState, type ReactNode } from 'react'
import type { ThemeContextType } from '../types/themeContext'

export const ThemeContext = createContext<ThemeContextType | undefined>(
  undefined,
)

export default function ThemeProvider({ children }: { children: ReactNode }) {
  const getInitial = () => {
    try {
      const stored = localStorage.getItem('theme')
      if (stored === 'dark') return true
      if (stored === 'light') return false
      return (
        typeof window !== 'undefined' &&
        window.matchMedia &&
        window.matchMedia('(prefers-color-scheme: dark)').matches
      )
    } catch {
      return false
    }
  }

  const [isDark, setisDark] = useState<boolean>(getInitial)

  useEffect(() => {
    try {
      localStorage.setItem('theme', isDark ? 'dark' : 'light')
    } catch {}
    if (typeof document !== 'undefined' && document.documentElement) {
      document.documentElement.classList.remove('dark-mode', 'light-mode')
      document.documentElement.classList.add(
        isDark ? 'dark-mode' : 'light-mode',
      )
    }
  }, [isDark])

  const toggleTheme = () => {
    setisDark((prevIsDark) => !prevIsDark)
  }

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}
