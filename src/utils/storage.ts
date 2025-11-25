/**
 * Storage utilities for "Remember Me" functionality
 * @module utils/storage
 */

/**
 * Safe wrapper for localStorage operations
 * Handles errors gracefully when localStorage is unavailable or throws errors
 */
const safeLocalStorage = {
  getItem(key: string): string | null {
    try {
      if (typeof localStorage === 'undefined') {
        return null
      }
      return localStorage.getItem(key)
    } catch (error) {
      console.error(`Error reading from localStorage (${key}):`, error)
      return null
    }
  },

  setItem(key: string, value: string): boolean {
    try {
      if (typeof localStorage === 'undefined') {
        return false
      }
      localStorage.setItem(key, value)
      return true
    } catch (error) {
      console.error(`Error writing to localStorage (${key}):`, error)
      return false
    }
  },

  removeItem(key: string): boolean {
    try {
      if (typeof localStorage === 'undefined') {
        return false
      }
      localStorage.removeItem(key)
      return true
    } catch (error) {
      console.error(`Error removing from localStorage (${key}):`, error)
      return false
    }
  },
}

/**
 * Stores remembered email in localStorage
 * Note: Only email is stored, never passwords!
 *
 * @param email - The email to remember
 */
export function rememberEmail(email: string): void {
  safeLocalStorage.setItem('rememberedEmail', email)
}

/**
 * Retrieves the remembered email from localStorage
 *
 * @returns The remembered email or null if not found
 */
export function getRememberedEmail(): string | null {
  return safeLocalStorage.getItem('rememberedEmail')
}

/**
 * Clears the remembered email from localStorage
 */
export function clearRememberedEmail(): void {
  safeLocalStorage.removeItem('rememberedEmail')
  // Also clear old insecure password storage if it exists
  safeLocalStorage.removeItem('rememberedPassword')
}
