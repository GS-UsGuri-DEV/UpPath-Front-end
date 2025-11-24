/**
 * Tipos para componentes de formulário
 * @module types/form
 */

import type { InputHTMLAttributes, ReactNode } from 'react'

/**
 * Props do componente FormInput
 * Estende atributos nativos de <input> com funcionalidades extras
 * @example
 * <FormInput
 *   label="Email"
 *   name="email"
 *   type="email"
 *   error="Email inválido"
 *   rightIcon={<EyeIcon />}
 *   onRightIconClick={togglePasswordVisibility}
 *   isValid={true}
 * />
 */
export type FormInputProps = InputHTMLAttributes<HTMLInputElement> & {
  /** Label exibida acima do input */
  label?: string
  /** Nome do campo (usado em formulários) */
  name?: string
  /** Mensagem de erro a ser exibida abaixo do input */
  error?: string
  /** Ícone exibido à direita do input (ex: olho para senha) */
  rightIcon?: ReactNode
  /** Callback executado ao clicar no ícone direito */
  onRightIconClick?: () => void
  /** Indica visualmente se o campo está válido */
  isValid?: boolean
}
