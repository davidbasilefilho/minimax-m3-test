import { useEffect, useRef } from "react";
import { clamp } from "../lib/motion";

export function AttentionField({ mode }: { mode: "msa" | "full" }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const mouseRef = useRef({ x: 0, y: 0, active: false });

  useEffect(() => {
    const canvas = canvasRef.current;
    const wrap = wrapRef.current;
    if (!canvas || !wrap) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // —— Layout constants ——
    const VISIBLE_BLOCKS = 96;
    const BLOCK_GAP = 1;
    const ROWS = 3;
    const TOP_PAD = 32;
    const BOTTOM_PAD = 48;
    const STATS_H = 52;
    const MINIMAP_H = 22;
    const GAP = 16;

    let blockW = 6;
    let blockH = 6;
    let W = 0;
    let H = 0;
    let fieldX = 0;
    let fieldY = 0;
    let fieldW = 0;
    let fieldH = 0;
    let mmX = 0;
    let mmY = 0;
    let mmW = 0;
    let cellW = 0;

    const resize = () => {
      const rect = wrap.getBoundingClientRect();
      W = rect.width;
      H = rect.height;
      canvas.width = W * dpr;
      canvas.height = H * dpr;
      canvas.style.width = `${W}px`;
      canvas.style.height = `${H}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      fieldW = W - TOP_PAD * 2;
      fieldH = H - TOP_PAD - BOTTOM_PAD - MINIMAP_H - STATS_H - GAP * 2;
      fieldX = TOP_PAD;
      fieldY = TOP_PAD;

      const totalGap = BLOCK_GAP * (VISIBLE_BLOCKS - 1);
      blockW = Math.max(2, Math.floor((fieldW - totalGap) / VISIBLE_BLOCKS));
      blockH = Math.max(8, Math.floor((fieldH - (ROWS - 1) * 6) / ROWS));

      mmX = TOP_PAD;
      mmY = fieldY + fieldH + GAP;
      mmW = fieldW;
      cellW = Math.max(0.5, mmW / 1000); // 1000 cells representing 1M tokens
    };

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(wrap);

    // —— Animation state ——
    let start = performance.now();
    let raf = 0;
    // Pre-generate "interesting" blocks per query position (deterministic)
    const precomputePattern = (q: number) => {
      const seed = q * 9301 + 49297;
      const selected: number[] = [];
      for (let r = 0; r < ROWS; r++) {
        const count = mode === "msa" ? 6 + (r % 2) * 3 : 22 + r * 4;
        for (let i = 0; i < count; i++) {
          const s = (seed + r * 7919 + i * 104729) % 233280;
          const f = s / 233280;
          // Sparse attention tends to cluster around the query (local) + sparse globals
          const distBias = Math.pow(f, 0.6);
          const local = Math.floor(distBias * VISIBLE_BLOCKS * 0.5);
          const global = Math.floor((f * VISIBLE_BLOCKS * 0.95) % VISIBLE_BLOCKS);
          const block = r === 2 ? global : i % 2 === 0 ? local : global;
          selected.push(block);
        }
      }
      return selected;
    };

    const draw = (now: number) => {
      const t = (now - start) / 1000;
      const reducedRate = reduced ? 0 : 1;

      ctx.clearRect(0, 0, W, H);

      // Subtle vignette
      const grad = ctx.createRadialGradient(W / 2, H / 2, 0, W / 2, H / 2, W * 0.6);
      grad.addColorStop(0, "rgba(229,57,53,0.04)");
      grad.addColorStop(1, "rgba(10,5,5,0)");
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, W, H);

      // —— Field grid ——
      const queryPos = reduced
        ? Math.floor(VISIBLE_BLOCKS * 0.5)
        : Math.floor((Math.sin(t * 0.18) * 0.5 + 0.5) * VISIBLE_BLOCKS);
      const pattern = precomputePattern(queryPos);

      // Mouse interaction: light up blocks near cursor
      const mouseInfluence = mouseRef.current.active
        ? clamp(
            1 -
              Math.hypot(mouseRef.current.x - W / 2, mouseRef.current.y - fieldY - fieldH / 2) /
                200,
            0,
            1,
          )
        : 0;

      for (let r = 0; r < ROWS; r++) {
        const y = fieldY + r * (blockH + 6);
        for (let i = 0; i < VISIBLE_BLOCKS; i++) {
          const x = fieldX + i * (blockW + BLOCK_GAP);
          const isQuery = i === queryPos;
          const inPattern = pattern.includes(i) && pattern.indexOf(i) % ROWS === r;

          if (isQuery) {
            ctx.fillStyle = "rgba(229,57,53,0.95)";
          } else if (inPattern) {
            const phase = Math.sin(t * 2 + i * 0.3 + r) * 0.5 + 0.5;
            const a = mode === "msa" ? 0.55 + phase * 0.4 : 0.18 + phase * 0.12;
            ctx.fillStyle = `rgba(229,57,53,${a.toFixed(3)})`;
          } else {
            ctx.fillStyle = "rgba(250,245,240,0.05)";
          }

          ctx.fillRect(x, y, blockW, blockH);

          // Glow on selected
          if (inPattern && !isQuery) {
            ctx.shadowColor = "rgba(229,57,53,0.6)";
            ctx.shadowBlur = 6 * reducedRate;
            ctx.fillRect(x, y, blockW, blockH);
            ctx.shadowBlur = 0;
          }

          if (isQuery) {
            // cursor line
            ctx.fillStyle = "rgba(229,57,53,0.9)";
            ctx.fillRect(x - 0.5, y - 4, 1.2, blockH + 8);
          }
        }
      }

      // Top frame line
      ctx.strokeStyle = "rgba(229,57,53,0.25)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(fieldX, fieldY - 14);
      ctx.lineTo(fieldX + 80, fieldY - 14);
      ctx.stroke();
      ctx.font = '10px "JetBrains Mono", monospace';
      ctx.textBaseline = "middle";

      const qLabel = "Q·" + String(queryPos).padStart(3, "0");
      ctx.fillStyle = "rgba(229,57,53,0.9)";
      ctx.fillText(qLabel, fieldX, fieldY - 18);
      const qLabelW = ctx.measureText(qLabel).width;

      const readout = mode === "msa" ? "MSA · SPARSE" : "FULL ATTENTION";
      ctx.fillStyle = "rgba(250,245,240,0.45)";
      const text = readout + " · 1.0M TOK";
      ctx.fillText(text, fieldX + qLabelW + 10, fieldY - 18);

      // Mouse cursor ring
      if (mouseRef.current.active) {
        ctx.strokeStyle = `rgba(229,57,53,${(0.4 + mouseInfluence * 0.4).toFixed(3)})`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(mouseRef.current.x, mouseRef.current.y, 18 + mouseInfluence * 12, 0, Math.PI * 2);
        ctx.stroke();
      }

      // —— Minimap (full 1M tokens as 1000 cells) ——
      // Frame
      ctx.strokeStyle = "rgba(250,245,240,0.08)";
      ctx.lineWidth = 1;
      ctx.strokeRect(mmX, mmY, mmW, MINIMAP_H);

      // Faint baseline cells
      for (let i = 0; i < 1000; i++) {
        const x = mmX + i * cellW;
        const noise = (Math.sin(i * 12.9898) * 43758.5453) % 1;
        const a = 0.04 + Math.abs(noise) * 0.06;
        ctx.fillStyle = `rgba(250,245,240,${a.toFixed(3)})`;
        ctx.fillRect(x, mmY, Math.max(0.6, cellW - 0.1), MINIMAP_H);
      }

      // Query window indicator (the visible 96 blocks on the field)
      const winStart = (queryPos / VISIBLE_BLOCKS) * 1000;
      const winWidth = (96 / VISIBLE_BLOCKS) * 1000 * cellW;
      ctx.fillStyle = "rgba(229,57,53,0.18)";
      ctx.fillRect(mmX + winStart * cellW, mmY, winWidth, MINIMAP_H);
      ctx.strokeStyle = "rgba(229,57,53,0.9)";
      ctx.lineWidth = 1;
      ctx.strokeRect(mmX + winStart * cellW, mmY, winWidth, MINIMAP_H);

      // Live query position
      const qx = mmX + (queryPos / VISIBLE_BLOCKS) * 1000 * cellW;
      ctx.fillStyle = "#ff5757";
      ctx.fillRect(qx - 0.5, mmY - 2, 1.5, MINIMAP_H + 4);

      // Labels
      ctx.font = '9px "JetBrains Mono", monospace';
      ctx.fillStyle = "rgba(250,245,240,0.4)";
      ctx.textBaseline = "bottom";
      ctx.fillText("0", mmX, mmY - 2);
      const endLabel = "1,048,576";
      const endW = ctx.measureText(endLabel).width;
      ctx.fillText(endLabel, mmX + mmW - endW, mmY - 2);
      ctx.fillStyle = "rgba(229,57,53,0.9)";
      ctx.textAlign = "center";
      ctx.fillText("Q", qx, mmY - 2);
      ctx.textAlign = "left";

      // —— Stats footer ——
      const sy = mmY + MINIMAP_H + GAP;
      ctx.fillStyle = "rgba(250,245,240,0.05)";
      ctx.fillRect(fieldX, sy, fieldW, STATS_H);

      const colW = fieldW / 3;
      const stats =
        mode === "msa"
          ? [
              { k: "BLOCKS SELECTED", v: "23 / 96", a: "23.9%" },
              { k: "PREFILL @ 1M", v: "9.7×", a: "vs M2" },
              { k: "DECODE @ 1M", v: "15.6×", a: "vs M2" },
            ]
          : [
              { k: "BLOCKS SELECTED", v: "96 / 96", a: "100%" },
              { k: "PREFILL @ 1M", v: "1.0×", a: "baseline" },
              { k: "DECODE @ 1M", v: "1.0×", a: "baseline" },
            ];

      ctx.font = '9px "JetBrains Mono", monospace';
      ctx.textBaseline = "top";
      for (let i = 0; i < stats.length; i++) {
        const x = fieldX + colW * i + 14;
        const y = sy + 6;
        ctx.fillStyle = "rgba(250,245,240,0.4)";
        ctx.fillText(stats[i].k, x, y);
        ctx.font = '600 16px "JetBrains Mono", monospace';
        ctx.fillStyle = i === 0 ? "rgba(250,245,240,0.9)" : "rgba(229,57,53,1)";
        ctx.fillText(stats[i].v, x, y + 14);
        ctx.font = '9px "JetBrains Mono", monospace';
        ctx.fillStyle = "rgba(250,245,240,0.4)";
        ctx.fillText(stats[i].a, x, y + 34);
      }

      raf = requestAnimationFrame(draw);
    };

    raf = requestAnimationFrame(draw);

    const onMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top, active: true };
    };
    const onLeave = () => {
      mouseRef.current.active = false;
    };
    canvas.addEventListener("mousemove", onMove);
    canvas.addEventListener("mouseleave", onLeave);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      canvas.removeEventListener("mousemove", onMove);
      canvas.removeEventListener("mouseleave", onLeave);
    };
  }, [mode]);

  return (
    <div ref={wrapRef} style={{ position: "relative", width: "100%", height: "100%" }}>
      <canvas
        ref={canvasRef}
        className="absolute inset-0 h-full w-full"
        aria-label="Animated visualization of MiniMax Sparse Attention operating over a 1-million token context. A query cursor scans across the sequence, selecting a sparse subset of blocks per step."
        // oxlint-disable-next-line jsx-a11y/prefer-tag-over-role
        role="img"
      />
    </div>
  );
}
