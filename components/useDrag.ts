"use client";

import { useCallback, useRef, useState } from "react";

type Pos = { x: number; y: number };

/**
 * Pointer-based dragging. Spread `handleProps` on the grab handle and use
 * `pos` as a translate offset (or absolute position) for the element.
 */
export function useDrag(initial: Pos = { x: 0, y: 0 }) {
  const [pos, setPos] = useState<Pos>(initial);
  const start = useRef<{ px: number; py: number; x: number; y: number } | null>(null);

  const onPointerDown = useCallback(
    (e: React.PointerEvent) => {
      if ((e.target as HTMLElement).closest("button")) return;
      start.current = { px: e.clientX, py: e.clientY, x: pos.x, y: pos.y };
      (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    },
    [pos],
  );

  const onPointerMove = useCallback((e: React.PointerEvent) => {
    const s = start.current;
    if (!s) return;
    setPos({ x: s.x + e.clientX - s.px, y: s.y + e.clientY - s.py });
  }, []);

  const onPointerUp = useCallback(() => {
    start.current = null;
  }, []);

  return {
    pos,
    setPos,
    handleProps: { onPointerDown, onPointerMove, onPointerUp, onPointerCancel: onPointerUp },
  };
}
