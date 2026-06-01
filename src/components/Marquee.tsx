const items = [
  "OPEN WEIGHTS",
  "·",
  "MSA: MiniMax Sparse Attention",
  "·",
  "1M TOKEN CONTEXT",
  "·",
  "NATIVE MULTIMODAL",
  "·",
  "NATIVE TOOL & DESKTOP USE",
  "·",
  "FRONTIER CODING",
  "·",
  "AVAILABLE NOW",
  "·",
  "HONG KONG: SEHK 0100",
  "·",
  "SHANGHAI LAB",
  "·",
];

export function Marquee() {
  const doubled = [...items, ...items];
  return (
    <div className="border-line bg-bg-1 relative overflow-hidden border-y py-3.5" aria-hidden>
      <div className="flex w-max [animation:marquee_38s_linear_infinite] gap-9 will-change-transform">
        {doubled.map((item, i) => (
          <span
            key={i}
            className={`mono text-xs font-medium tracking-[0.16em] whitespace-nowrap ${
              item === "·" ? "text-red" : "text-cream-dim"
            }`}>
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
