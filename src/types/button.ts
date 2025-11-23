

import type { ReactNode } from 'react';


export interface ButtonBaseProps {
  children: ReactNode;
  className?: string;
  disabled?: boolean;
  'aria-label'?: string;
}

export interface BtnExternoProps extends ButtonBaseProps {
  href: string;
  target: '_blank';
}

