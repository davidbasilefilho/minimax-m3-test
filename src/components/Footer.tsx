export function Footer() {
  const groups = [
    {
      title: "Product",
      links: ["M3 API", "Open Weights", "Code Mode", "Desktop Use", "MSA Docs"],
    },
    {
      title: "Research",
      links: ["Technical Report", "MSA Paper", "Benchmarks", "Forge (RL)", "Hailuo Video"],
    },
    {
      title: "Company",
      links: ["About", "Newsroom", "Careers", "Hong Kong Listing", "Contact"],
    },
  ];
  return (
    <footer
      className="border-line bg-bg-0 relative z-10 border-t"
      style={{ padding: "clamp(60px, 8vw, 100px) 0 40px" }}>
      <div className="page">
        <div className="mb-12 grid gap-10 sm:grid-cols-2 sm:gap-8 md:mb-16 lg:mb-20 lg:grid-cols-[1.4fr_1fr_1fr_1fr] lg:gap-12">
          <div className="sm:col-span-2 lg:col-span-1">
            <div
              className="display text-cream mb-5 leading-[0.85] font-extrabold tracking-[-0.05em] md:mb-6"
              style={{ fontSize: "clamp(56px, 9vw, 128px)" }}>
              M3<span className="text-red">.</span>
            </div>
            <p className="text-cream-dim mb-5 max-w-[380px] text-[14.5px] leading-[1.6] md:mb-6 md:text-[15px]">
              <span className="serif-italic text-red-bright">
                "Co-create intelligence with everyone."
              </span>{" "}
              A frontier model from a Shanghai lab, listed on the Hong Kong Stock Exchange.
            </p>
            <div className="mono text-ash flex flex-wrap gap-x-3 gap-y-1 text-[10px] tracking-[0.1em] md:text-[10.5px] md:tracking-[0.12em]">
              <span>SHANGHAI</span>
              <span className="text-line-strong">·</span>
              <span>HONG KONG · SEHK 0100</span>
              <span className="text-line-strong">·</span>
              <span>FOUNDED 2021</span>
            </div>
          </div>

          {groups.map((g) => (
            <div key={g.title}>
              <div className="mono text-ash mb-4 text-[10px] tracking-[0.16em] md:mb-5 md:text-[10.5px] md:tracking-[0.18em]">
                {g.title.toUpperCase()}
              </div>
              <ul className="grid gap-2.5 md:gap-3">
                {g.links.map((l) => (
                  <li key={l}>
                    <a
                      href={`#${l.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}
                      className="text-cream-dim hover:text-red-bright text-[13.5px] transition-colors md:text-[14px]">
                      {l}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="hairline mb-5 md:mb-6" />

        <div className="flex flex-col items-start justify-between gap-3 md:flex-row md:items-center md:gap-6">
          <div className="mono text-ash text-[10.5px] tracking-[0.04em] md:text-[11px] md:tracking-[0.06em]">
            © 2026 MiniMax Group Inc. · 稀宇科技 · All rights reserved
          </div>
          <div className="mono text-ash text-[10.5px] tracking-[0.04em] md:text-right md:text-[11px] md:tracking-[0.06em]">
            Built with React 19.2 · React Compiler · Vite · Rolldown · Bun · Tailwind v4
          </div>
        </div>
      </div>
    </footer>
  );
}
