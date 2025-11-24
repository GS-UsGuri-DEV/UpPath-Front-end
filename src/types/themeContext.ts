/**
 * Tipos para contexto de tema (dark/light mode)
 * @module types/themeContext
 */

/**
 * Contexto global de tema da aplicação
 * Gerencia estado dark/light mode e persistência
 * @example
 * const { isDark, toggleTheme } = useTheme()
 *
 * return (
 *   <button onClick={toggleTheme}>
 *     {isDark ? 'Modo Claro' : 'Modo Escuro'}
 *   </button>
 * )
 */
export type ThemeContextType = {
  /** True se tema escuro está ativo, false para tema claro */
  isDark: boolean
  /** Função para alternar entre dark/light mode */
  toggleTheme: () => void
}
