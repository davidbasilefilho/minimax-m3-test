import { useEffect, useRef, useState } from "react";

/**
 * Tracks cursor position with smoothing and a hover state.
 * Used by the custom cursor component.
 */
export function useCursor() {
  const dotRef = useRef<HTMLDivElement | null>(null);
  const ringRef = useRef<HTMLDivElement | null>(null);
  const target = useRef({ x: 0, y: 0 });
  const current = useRef({ x: 0, y: 0 });
  const rafId = useRef<number | null>(null);

  useEffect(() => {
    const isCoarse = window.matchMedia("(hover: none), (pointer: coarse)").matches;
    if (isCoarse) return;

    const onMove = (e: MouseEvent) => {
      target.current = { x: e.clientX, y: e.clientY };
    };

    const tick = () => {
      const ease = 0.18;
      current.current.x += (target.current.x - current.current.x) * ease;
      current.current.y += (target.current.y - current.current.y) * ease;
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${current.current.x}px, ${current.current.y}px, 0)`;
      }
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${current.current.x}px, ${current.current.y}px, 0)`;
      }
      rafId.current = requestAnimationFrame(tick);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    rafId.current = requestAnimationFrame(tick);
    return () => {
      window.removeEventListener("mousemove", onMove);
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, []);

  return { dotRef, ringRef };
}

/**
 * Hook that returns handlers for detecting hover over interactive elements.
 * Used at the App level so the cursor can react to any button/link.
 */
export function useCursorHover() {
  const [isHover, setIsHover] = useState(false);
  const handlers = {
    onMouseOver: (e: React.MouseEvent) => {
      const t = e.target as HTMLElement;
      if (t.closest('a, button, [data-cursor="hover"], input, textarea, select, [role="button"]')) {
        setIsHover(true);
      }
    },
    onMouseOut: (e: React.MouseEvent) => {
      const t = e.relatedTarget as HTMLElement | null;
      if (
        !t ||
        !t.closest('a, button, [data-cursor="hover"], input, textarea, select, [role="button"]')
      ) {
        setIsHover(false);
      }
    },
  };
  return { isHover, handlers };
}
