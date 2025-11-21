// Tipos para formulários genéricos
import type { InputHTMLAttributes, ReactNode } from 'react'

export type FormInputProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string
  name?: string
  error?: string
  rightIcon?: ReactNode
  onRightIconClick?: () => void
  isValid?: boolean
}
