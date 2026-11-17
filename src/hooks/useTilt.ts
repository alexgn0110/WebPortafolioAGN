import { useCallback, type PointerEvent } from 'react';

const MAX_TILT_DEG = 4;

const canTilt = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(hover: hover) and (pointer: fine)').matches &&
  !window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/**
 * Solid drawing in 3D: tilts a flat card toward the pointer so it reads as an object with depth.
 * Writes CSS variables only (no re-renders); the transform itself lives in CSS.
 */
export function useTilt<T extends HTMLElement>() {
  const onPointerMove = useCallback((event: PointerEvent<T>) => {
    if (!canTilt()) return;
    const el = event.currentTarget;
    const rect = el.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    el.style.setProperty('--tilt-x', `${(-y * MAX_TILT_DEG).toFixed(2)}deg`);
    el.style.setProperty('--tilt-y', `${(x * MAX_TILT_DEG).toFixed(2)}deg`);
  }, []);

  const onPointerLeave = useCallback((event: PointerEvent<T>) => {
    event.currentTarget.style.removeProperty('--tilt-x');
    event.currentTarget.style.removeProperty('--tilt-y');
  }, []);

  return { onPointerMove, onPointerLeave };
}
