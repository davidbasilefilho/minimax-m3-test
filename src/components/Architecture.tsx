import { Tooltip } from "@base-ui/react/tooltip";
import { useReveal } from "../lib/reveal";
import { Reveal } from "./Reveal";

function FullAttentionGrid({ size = 28 }: { size?: number }) {
  const cells = Array.from({ length: size * size }, (_, i) => {
    const r = Math.floor(i / size);
    const c = i % size;
    const future = c > r;
    const intensity = future ? 0 : 0.35 + ((r * 31 + c * 17) % 100) / 250;
    return { r, c, a: intensity, future };
  });
  return (
    <svg
      viewBox={`0 0 ${size} ${size}`}
      className="block h-full w-full"
      preserveAspectRatio="none"
      aria-label="Full attention: every token attends to every prior token. O of n squared complexity.">
      {cells.map((cell, i) => (
        <rect
          key={i}
          x={cell.c}
          y={cell.r}
          width={0.95}
          height={0.95}
          fill={cell.future ? "rgba(250,245,240,0.025)" : `rgba(229,57,53,${cell.a.toFixed(2)})`}
        />
      ))}
    </svg>
  );
}

function MSAGrid({ size = 28 }: { size?: number }) {
  const BLOCK = 4;
  const blocks = Math.ceil(size / BLOCK);
  const cells = Array.from({ length: size * size }, (_, i) => {
    const r = Math.floor(i / size);
    const c = i % size;
    if (c > r) return { r, c, a: 0, sel: false };
    const seed = (r * 53 + 7) % 997;
    const selectedBlocks = new Set<number>();
    const localBlock = Math.floor(r / BLOCK);
    selectedBlocks.add(localBlock);
    for (let k = 0; k < 3; k++) {
      const s = (seed + k * 197) % 1000;
      selectedBlocks.add(Math.floor((s / 1000) * blocks));
    }
    const block = Math.floor(c / BLOCK);
    const isSelected = selectedBlocks.has(block);
    const intensity = isSelected ? 0.45 + ((r * 7 + c * 13) % 100) / 380 : 0;
    return { r, c, a: intensity, sel: isSelected };
  });
  return (
    <svg
      viewBox={`0 0 ${size} ${size}`}
      className="block h-full w-full"
      preserveAspectRatio="none"
      aria-label="MiniMax Sparse Attention: each query attends to a small number of contiguous blocks, not every token.">
      {cells.map((cell, i) => (
        <rect
          key={i}
          x={cell.c}
          y={cell.r}
          width={0.95}
          height={0.95}
          fill={cell.sel ? `rgba(229,57,53,${cell.a.toFixed(2)})` : "rgba(250,245,240,0.04)"}
        />
      ))}
      {Array.from({ length: blocks + 1 }).map((_, i) => (
        <line
          key={`v${i}`}
          x1={i * BLOCK}
          y1={0}
          x2={i * BLOCK}
          y2={size}
          stroke="rgba(229,57,53,0.18)"
          strokeWidth={0.04}
        />
      ))}
      {Array.from({ length: Math.ceil(size / BLOCK) + 1 }).map((_, i) => (
        <line
          key={`h${i}`}
          x1={0}
          y1={i * BLOCK}
          x2={size}
          y2={i * BLOCK}
          stroke="rgba(229,57,53,0.18)"
          strokeWidth={0.04}
        />
      ))}
    </svg>
  );
}

export function Architecture() {
  const { ref, inView } = useReveal<HTMLDivElement>();

  return (
    <section
      id="architecture"
      className="relative"
      style={{ padding: "clamp(80px, 12vw, 160px) 0" }}>
      <div className="page">
        <Reveal as="div" delay={0}>
          <div className="section-label mb-5">§ 01 — ARCHITECTURE</div>
        </Reveal>

        <Reveal delay={80}>
          <h2
            className="display text-cream mb-6 max-w-[900px]"
            style={{ fontSize: "clamp(36px, 5vw, 72px)" }}>
            We killed sparse attention. <br />
            Then we <em>brought it back.</em>
          </h2>
        </Reveal>

        <Reveal delay={160}>
          <p className="text-cream-dim mb-16 max-w-[720px] text-[17px] leading-[1.6]">
            The M2 generation spent a year on full attention because sparse shortcuts crippled
            multi-hop reasoning. M3 introduces{" "}
            <span className="serif-italic text-red-bright">MiniMax Sparse Attention</span> —
            block-level selection on uncompressed keys and values. No latent compression. No
            precision loss. No prefix-cache breakage. Just sub-quadratic decoding at frontier
            quality.
          </p>
        </Reveal>

        <div
          ref={ref}
          className="border-line bg-bg-1 grid overflow-hidden rounded-[14px] border lg:grid-cols-2">
          <div className="border-line relative border-b p-6 md:p-8 lg:border-r lg:border-b-0">
            <div className="mb-6 flex items-start justify-between">
              <div>
                <div className="mono text-ash mb-2 text-[10px] tracking-[0.18em]">PREVIOUS</div>
                <div className="display text-cream-dim text-[22px] font-bold md:text-[26px]">
                  M2 · Full Attention
                </div>
              </div>
              <Tooltip.Root>
                <Tooltip.Trigger
                  delay={150}
                  render={<span className="tag border-line text-ash cursor-help bg-transparent" />}>
                  O(n²)
                </Tooltip.Trigger>
                <Tooltip.Portal>
                  <Tooltip.Positioner side="top" sideOffset={6}>
                    <Tooltip.Popup className="mono text-cream-dim border-line-strong bg-bg-2/95 z-[60] rounded-md border px-2.5 py-1.5 text-[10.5px] tracking-[0.08em] shadow-[0_20px_60px_-20px_rgba(229,57,53,0.4)] backdrop-blur-md transition-[opacity,transform] duration-150 data-[ending-style]:translate-y-1 data-[ending-style]:opacity-0 data-[starting-style]:translate-y-1 data-[starting-style]:opacity-0">
                      Full attention: compute &amp; memory scale as n² with sequence length
                    </Tooltip.Popup>
                  </Tooltip.Positioner>
                </Tooltip.Portal>
              </Tooltip.Root>
            </div>
            <div
              className="border-line bg-bg-0 mb-5 rounded-lg border p-3"
              style={{
                aspectRatio: "1 / 1",
                opacity: inView ? 1 : 0,
                transition: "opacity 0.8s var(--ease-out-expo)",
              }}>
              <FullAttentionGrid />
            </div>
            <ul className="text-cream-dim grid gap-2 text-[13.5px]">
              {[
                "Every token attends to every prior token",
                "Quadratic cost explodes past ~200K tokens",
                "1M context becomes economically unviable",
              ].map((t) => (
                <li key={t} className="flex gap-2">
                  <span className="text-ash">·</span>
                  {t}
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-bg-2 relative p-6 md:p-8">
            <div className="mb-6 flex items-start justify-between">
              <div>
                <div className="mono text-red mb-2 text-[10px] tracking-[0.18em]">NOW</div>
                <div className="display text-cream text-[22px] font-bold md:text-[26px]">
                  M3 · <span className="text-red">MSA</span>
                </div>
              </div>
              <Tooltip.Root>
                <Tooltip.Trigger delay={150} render={<span className="tag cursor-help" />}>
                  O(n · k)
                </Tooltip.Trigger>
                <Tooltip.Portal>
                  <Tooltip.Positioner side="top" sideOffset={6}>
                    <Tooltip.Popup className="mono text-cream-dim border-line-strong bg-bg-2/95 z-[60] rounded-md border px-2.5 py-1.5 text-[10.5px] tracking-[0.08em] shadow-[0_20px_60px_-20px_rgba(229,57,53,0.4)] backdrop-blur-md transition-[opacity,transform] duration-150 data-[ending-style]:translate-y-1 data-[ending-style]:opacity-0 data-[starting-style]:translate-y-1 data-[starting-style]:opacity-0">
                      MSA: scales as n·k — k is the constant block budget, not the sequence
                    </Tooltip.Popup>
                  </Tooltip.Positioner>
                </Tooltip.Portal>
              </Tooltip.Root>
            </div>
            <div
              className="border-line-strong bg-bg-0 relative mb-5 rounded-lg border p-3"
              style={{
                aspectRatio: "1 / 1",
                boxShadow:
                  "0 0 0 1px var(--color-red-soft), 0 30px 60px -30px var(--color-red-glow)",
                opacity: inView ? 1 : 0,
                transition: "opacity 0.8s var(--ease-out-expo) 0.15s",
              }}>
              <MSAGrid />
            </div>
            <ul className="text-cream grid gap-2 text-[13.5px]">
              {[
                "Block-level selection on real, uncompressed KV",
                "Preserves multi-hop reasoning across 1M tokens",
                "Compatible with prefix caching — no rebuilds",
              ].map((t) => (
                <li key={t} className="flex gap-2">
                  <span className="text-red">✓</span>
                  {t}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-line mt-6 grid grid-cols-2 overflow-hidden rounded-[10px] border md:mt-8 md:grid-cols-4">
          {[
            { k: "Sparsity", v: "~24%", a: "of blocks selected" },
            { k: "Prefill speedup", v: "9.7×", a: "@ 1M tokens" },
            { k: "Decode speedup", v: "15.6×", a: "@ 1M tokens" },
            { k: "Quality loss", v: "≤ 0.4%", a: "on multi-hop eval" },
          ].map((s, i, arr) => {
            const isFirstColumnOnMobile = i % 2 === 0;
            const isFirstRowOnMobile = i < 2;
            const isNotLastOnDesktop = i < arr.length - 1;
            return (
              <div
                key={i}
                className={`p-4 md:p-5 ${
                  isFirstColumnOnMobile ? "border-line-strong border-r" : ""
                } ${isFirstRowOnMobile ? "border-line-strong border-b md:border-b-0" : ""} ${
                  isNotLastOnDesktop ? "md:border-line md:border-r" : ""
                }`}>
                <div className="mono text-ash mb-2 text-[10px] tracking-[0.16em] md:mb-2.5">
                  {s.k.toUpperCase()}
                </div>
                <div className="display text-red text-[26px] leading-none font-bold tracking-[-0.02em] md:text-[32px]">
                  {s.v}
                </div>
                <div className="text-cream-dim mt-1.5 text-[11.5px] md:mt-2 md:text-[12px]">
                  {s.a}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
