import { useCursor } from "../lib/cursor";

export function Cursor({ isHover }: { isHover: boolean }) {
  const { dotRef, ringRef } = useCursor();
  return (
    <>
      <div ref={ringRef} className={`cursor-ring ${isHover ? "is-hover" : ""}`} aria-hidden />
      <div ref={dotRef} className={`cursor-dot ${isHover ? "is-hover" : ""}`} aria-hidden />
    </>
  );
}
