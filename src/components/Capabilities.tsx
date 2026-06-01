import { Reveal } from "./Reveal";

const caps = [
  {
    n: "01",
    title: "Frontier Coding",
    serif: "thinks in code.",
    body: "Native code reasoning that competes with closed-source frontier models on SWE-bench, Aider Polyglot, and Terminal-Bench. Operates a real desktop. Reads, edits, and runs.",
    stats: [
      { k: "SWE-bench", v: "verified" },
      { k: "Tool use", v: "native" },
    ],
    icon: (
      <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden>
        <path
          d="M9 8l-5 4 5 4M15 8l5 4-5 4M14 5l-4 14"
          stroke="currentColor"
          strokeWidth="1.6"
          fill="none"
          strokeLinecap="square"
        />
      </svg>
    ),
  },
  {
    n: "02",
    title: "1M Token Context",
    serif: "actually usable.",
    body: "MSA makes a 1-million-token context window economically viable. Read entire codebases. Whole books. Hours of video. Recall a clause from page 847 without latency collapse.",
    stats: [
      { k: "Context", v: "1,048,576" },
      { k: "Decoding", v: "15.6× faster" },
    ],
    icon: (
      <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden>
        <rect
          x="3"
          y="4"
          width="18"
          height="16"
          rx="2"
          stroke="currentColor"
          strokeWidth="1.6"
          fill="none"
        />
        <path d="M3 9h18M7 4v16" stroke="currentColor" strokeWidth="1.6" />
        <circle cx="15" cy="14" r="2" fill="currentColor" />
      </svg>
    ),
  },
  {
    n: "03",
    title: "Native Multimodality",
    serif: "sees what you see.",
    body: "Image and video input from day one. No adapter layers, no projection heads bolted on at the end. Mixed-modality training from step zero means text, vision, and code share the same semantic space.",
    stats: [
      { k: "Modalities", v: "text · image · video" },
      { k: "Training", v: "native from step 0" },
    ],
    icon: (
      <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden>
        <rect
          x="2"
          y="5"
          width="14"
          height="14"
          rx="2"
          stroke="currentColor"
          strokeWidth="1.6"
          fill="none"
        />
        <path
          d="M16 9l6-4v14l-6-4z"
          stroke="currentColor"
          strokeWidth="1.6"
          fill="none"
          strokeLinejoin="miter"
        />
      </svg>
    ),
  },
];

export function Capabilities() {
  return (
    <section
      id="capabilities"
      className="border-line relative border-t"
      style={{ padding: "clamp(80px, 12vw, 160px) 0" }}>
      <div className="page">
        <Reveal>
          <div className="section-label mb-5">§ 02 — CAPABILITIES</div>
        </Reveal>

        <Reveal delay={80}>
          <h2
            className="display text-cream mb-10 max-w-[900px] md:mb-16"
            style={{ fontSize: "clamp(36px, 5vw, 72px)" }}>
            Three capabilities <br />
            we refused to <em>trade off.</em>
          </h2>
        </Reveal>

        <div className="border-line bg-bg-1 grid grid-cols-1 overflow-hidden rounded-[14px] border md:grid-cols-2 xl:grid-cols-3">
          {caps.map((cap, i) => {
            const isNotLast = i < caps.length - 1;
            const isFirstColumnOnTablet = i % 2 === 0;
            const isFirstRowOnTablet = i < 2;
            const isFirstTwoOnDesktop = i < 2;
            return (
              <Reveal key={i} delay={i * 100}>
                <div
                  className={`group hover:bg-bg-2 relative h-full transition-colors duration-400 [transition-timing-function:var(--ease-out-quart)] ${
                    isNotLast ? "border-line-strong border-b" : ""
                  } ${isFirstColumnOnTablet ? "md:border-line md:border-r" : ""} ${
                    isFirstRowOnTablet ? "md:border-line-strong md:border-b xl:border-b-0" : ""
                  } ${isFirstTwoOnDesktop ? "xl:border-line xl:border-r" : ""}`}
                  style={{ padding: "28px 24px 26px" }}>
                  <div className="mb-7 flex items-start justify-between md:mb-8">
                    <div className="mono text-ash text-[11px] tracking-[0.18em]">CAP · {cap.n}</div>
                    <div className="text-red">{cap.icon}</div>
                  </div>

                  <h3 className="display text-cream mb-2 text-[26px] leading-[1.05] font-bold tracking-[-0.025em] md:text-[32px]">
                    {cap.title}
                  </h3>
                  <div className="serif-italic text-red-bright mb-5 text-[20px] leading-none md:mb-6 md:text-[22px]">
                    {cap.serif}
                  </div>

                  <p className="text-cream-dim mb-6 text-[14px] leading-[1.6] md:mb-7 md:min-h-[130px] md:text-[14.5px]">
                    {cap.body}
                  </p>

                  <div className="hairline bg-line mb-4" />

                  <div className="grid gap-1.5">
                    {cap.stats.map((s, j) => (
                      <div key={j} className="flex items-baseline justify-between gap-2">
                        <span className="mono text-ash text-[10px] tracking-[0.14em] uppercase">
                          {s.k}
                        </span>
                        <span className="mono text-cream text-[12.5px] font-medium">{s.v}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
