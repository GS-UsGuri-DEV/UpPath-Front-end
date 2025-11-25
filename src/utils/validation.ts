/**
 * Validation utilities
 * @module utils/validation
 */

/**
 * Regex pattern for validating email addresses
 * Accepts standard email format: user@domain.ext
 */
export const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

/**
 * Validates if a string is a valid email address
 *
 * @param email - The email string to validate
 * @returns true if email is valid, false otherwise
 *
 * @example
 * ```typescript
 * isValidEmail('user@example.com') // true
 * isValidEmail('invalid-email') // false
 * ```
 */
export function isValidEmail(email: string): boolean {
  if (!email || typeof email !== 'string') {
    return false
  }
  return EMAIL_REGEX.test(email.trim())
}

/**
 * Validates if a string is a valid CPF (Brazilian individual taxpayer ID)
 *
 * @param cpf - The CPF string to validate (with or without formatting)
 * @returns true if CPF is valid, false otherwise
 */
export function isValidCPF(cpf: string): boolean {
  if (!cpf) {
    return false
  }

  // Remove formatting
  const cleanCpf = cpf.replace(/\D/g, '')

  // Must have exactly 11 digits
  if (cleanCpf.length !== 11) {
    return false
  }

  // Reject known invalid CPFs (all same digit)
  if (/^(\d)\1{10}$/.test(cleanCpf)) {
    return false
  }

  // Validate check digits
  let sum = 0
  let remainder

  for (let i = 1; i <= 9; i++) {
    sum += parseInt(cleanCpf.substring(i - 1, i)) * (11 - i)
  }
  remainder = (sum * 10) % 11
  if (remainder === 10 || remainder === 11) {
    remainder = 0
  }
  if (remainder !== parseInt(cleanCpf.substring(9, 10))) {
    return false
  }

  sum = 0
  for (let i = 1; i <= 10; i++) {
    sum += parseInt(cleanCpf.substring(i - 1, i)) * (12 - i)
  }
  remainder = (sum * 10) % 11
  if (remainder === 10 || remainder === 11) {
    remainder = 0
  }
  if (remainder !== parseInt(cleanCpf.substring(10, 11))) {
    return false
  }

  return true
}

/**
 * Validates if a string is a valid CNPJ (Brazilian company taxpayer ID)
 *
 * @param cnpj - The CNPJ string to validate (with or without formatting)
 * @returns true if CNPJ is valid, false otherwise
 */
export function isValidCNPJ(cnpj: string): boolean {
  if (!cnpj) {
    return false
  }

  // Remove formatting
  const cleanCnpj = cnpj.replace(/\D/g, '')

  // Must have exactly 14 digits
  if (cleanCnpj.length !== 14) {
    return false
  }

  // Reject known invalid CNPJs (all same digit)
  if (/^(\d)\1{13}$/.test(cleanCnpj)) {
    return false
  }

  // Validate check digits
  let length = cleanCnpj.length - 2
  let numbers = cleanCnpj.substring(0, length)
  const digits = cleanCnpj.substring(length)
  let sum = 0
  let pos = length - 7

  for (let i = length; i >= 1; i--) {
    sum += parseInt(numbers.charAt(length - i)) * pos--
    if (pos < 2) {
      pos = 9
    }
  }

  let result = sum % 11 < 2 ? 0 : 11 - (sum % 11)
  if (result !== parseInt(digits.charAt(0))) {
    return false
  }

  length = length + 1
  numbers = cleanCnpj.substring(0, length)
  sum = 0
  pos = length - 7

  for (let i = length; i >= 1; i--) {
    sum += parseInt(numbers.charAt(length - i)) * pos--
    if (pos < 2) {
      pos = 9
    }
  }

  result = sum % 11 < 2 ? 0 : 11 - (sum % 11)
  if (result !== parseInt(digits.charAt(1))) {
    return false
  }

  return true
}

/**
 * Validates password strength
 *
 * @param password - The password to validate
 * @returns Object with isValid flag and array of error messages
 */
export function validatePassword(password: string): {
  isValid: boolean
  errors: string[]
} {
  const errors: string[] = []

  if (!password || password.length < 8) {
    errors.push('A senha deve ter no mínimo 8 caracteres')
  }

  if (password && password.length > 128) {
    errors.push('A senha deve ter no máximo 128 caracteres')
  }

  return {
    isValid: errors.length === 0,
    errors,
  }
}
