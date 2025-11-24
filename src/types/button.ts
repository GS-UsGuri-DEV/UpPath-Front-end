import type { ReactNode } from 'react'

export type ButtonBaseProps = {
  children: ReactNode
  className?: string
  disabled?: boolean
  'aria-label'?: string
}

export type BtnExternoProps = {
  href: string
  target: '_blank'
} & ButtonBaseProps
