/**
 * Storage utilities for "Remember Me" functionality
 * @module utils/storage
 */

/**
 * Stores remembered email in localStorage
 * Note: Only email is stored, never passwords!
 *
 * @param email - The email to remember
 */
export function rememberEmail(email: string): void {
  try {
    localStorage.setItem('rememberedEmail', email)
  } catch (error) {
    console.error('Error storing email:', error)
  }
}

/**
 * Retrieves the remembered email from localStorage
 *
 * @returns The remembered email or null if not found
 */
export function getRememberedEmail(): string | null {
  try {
    return localStorage.getItem('rememberedEmail')
  } catch (error) {
    console.error('Error retrieving email:', error)
    return null
  }
}

/**
 * Clears the remembered email from localStorage
 */
export function clearRememberedEmail(): void {
  localStorage.removeItem('rememberedEmail')
  // Also clear old insecure password storage if it exists
  localStorage.removeItem('rememberedPassword')
}
