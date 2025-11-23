import type { ReactNode } from 'react';

export interface ControlsAPI {
  prev: () => void;
  next: () => void;
  index: number;
  total: number;
}


export interface IndicatorsAPI {
  goTo: (index: number) => void;
  index: number;
  total: number;
}

export interface CarrosselBaseProps {
  total: number;
  startIndex?: number;
  autoMs?: number | null;
  className?: string;
  viewportClassName?: string;
  onChangeIndex?: (index: number) => void;
  renderItem: (index: number) => ReactNode;
  renderControls?: (api: ControlsAPI) => ReactNode;
  renderIndicators?: (api: IndicatorsAPI) => ReactNode;
}
