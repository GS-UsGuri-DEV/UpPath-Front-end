import { useCallback, useEffect, useId, useRef, useState } from 'react';
import type { CarrosselBaseProps } from '../../types/carousel';

export default function CarrosselBase({
  total,
  startIndex = 0,
  autoMs = null,
  className,
  viewportClassName,
  onChangeIndex,
  renderItem,
  renderControls,
  renderIndicators,
}: CarrosselBaseProps) {
  const [index, setIndex] = useState(() =>
    Math.min(Math.max(0, startIndex), Math.max(0, total - 1))
  );
  const [paused, setPaused] = useState(false);
  const id = useId();
  const viewportRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<number | null>(null);

  const goTo = useCallback((i: number) => setIndex(((i % total) + total) % total), [total]);
  const next = useCallback(() => setIndex((i) => (i + 1) % total), [total]);
  const prev = useCallback(() => setIndex((i) => (i - 1 + total) % total), [total]);

  useEffect(() => {
    onChangeIndex?.(index);
  }, [index, onChangeIndex]);

  useEffect(() => {
    if (!autoMs || autoMs <= 0 || paused || total <= 1) return;
    timerRef.current = window.setInterval(next, autoMs);
    return () => {
      if (timerRef.current) window.clearInterval(timerRef.current);
    };
  }, [autoMs, paused, total, next]);
  const handleMouseEnter = () => setPaused(true);
  const handleMouseLeave = () => setPaused(false);
  const handleFocusIn = () => setPaused(true);
  const handleFocusOut = () => setPaused(false);

  useEffect(() => {
    const vp = viewportRef.current;
    if (!vp) return;
    const onKey = (e: KeyboardEvent) => {
      if (document.activeElement && vp.contains(document.activeElement)) {
        if (e.key === 'ArrowRight') {
          e.preventDefault();
          next();
        }
        if (e.key === 'ArrowLeft') {
          e.preventDefault();
          prev();
        }
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [next, prev]);

  return (
    <div
      className={['relative', className || ''].join(' ').trim()}
      aria-roledescription='carousel'
      aria-label={`carousel-${id}`}
    >
      <div
        id={`${id}-viewport`}
        ref={viewportRef}
        role='group'
        aria-live='polite'
        className={['relative w-full', viewportClassName || ''].join(' ').trim()}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onFocus={handleFocusIn}
        onBlur={handleFocusOut}
      >
        {renderItem(index)}

        {renderControls?.({ prev, next, index, total })}
      </div>

      {renderIndicators?.({ goTo, index, total })}
    </div>
  );
}
