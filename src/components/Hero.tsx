import { useEffect, useState } from "react";
import { AttentionField } from "./AttentionField";

const stats = [
  { v: "1,048,576", l: "context window", sub: "tokens", long: true },
  { v: "9.7×", l: "prefill speedup", sub: "vs M2 @ 1M" },
  { v: "15.6×", l: "decode speedup", sub: "vs M2 @ 1M" },
  { v: "$0.30", l: "per million tokens", sub: "API output" },
];

export function Hero() {
  const [time, setTime] = useState(() => new Date());
  useEffect(() => {
    const id = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  const utc = `${time.toISOString().replace("T", " ").slice(0, 19)} UTC`;

  return (
    <section
      className="relative flex min-h-screen items-center pb-10 md:pb-14"
      style={{ paddingTop: "calc(var(--nav-h) + 40px)" }}>
      <div className="page grid w-full items-center lg:[grid-template-columns:minmax(0,1.05fr)_minmax(0,1fr)] lg:gap-x-[clamp(28px,5vw,80px)]">
        <div>
          <div className="eyebrow mb-5 md:mb-6">{`INTRODUCING · M3.0 · ${utc}`}</div>

          <h1
            className="display text-cream mb-6 md:mb-7"
            style={{ fontSize: "clamp(40px, 7.2vw, 104px)" }}>
            Frontier <em>coding.</em>
            <br />
            <span className="text-cream">1M context.</span>
            <br />
            Native <em>multimodality.</em>
          </h1>

          <p className="text-cream-dim mb-8 max-w-[540px] text-[16px] leading-[1.55] font-normal md:mb-9 md:text-[18px]">
            MiniMax M3 is the first open-weight model to combine frontier-level coding, a
            1-million-token context window, and native image &amp; video understanding — all in one
            model. Built on{" "}
            <span className="serif-italic text-red-bright">MiniMax Sparse Attention</span>.
          </p>

          <div className="mb-10 flex flex-wrap items-center gap-3 md:mb-11">
            <a href="#api" data-cursor="hover" className="btn-primary whitespace-nowrap">
              Try the API
              <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden>
                <path
                  d="M1 7h11M8 3l4 4-4 4"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  fill="none"
                  strokeLinecap="square"
                />
              </svg>
            </a>
            <a href="#architecture" data-cursor="hover" className="btn-ghost whitespace-nowrap">
              Read the report
            </a>
          </div>

          <div className="border-line bg-bg-1/40 grid grid-cols-2 overflow-hidden rounded-[10px] border [backdrop-filter:blur(8px)] md:grid-cols-4">
            {stats.map((s, i) => {
              const isFirstColumnOnMobile = i % 2 === 0;
              const isFirstRowOnMobile = i < 2;
              const isNotLastOnDesktop = i < 3;
              return (
                <div
                  key={i}
                  className={`min-w-0 overflow-hidden p-3.5 md:p-4 ${
                    isFirstColumnOnMobile ? "border-line-strong border-r" : ""
                  } ${isFirstRowOnMobile ? "border-line-strong border-b md:border-b-0" : ""} ${
                    isNotLastOnDesktop ? "md:border-line md:border-r" : ""
                  }`}>
                  <div
                    className={`mono mb-1.5 overflow-hidden leading-none font-semibold tracking-[-0.02em] text-ellipsis whitespace-nowrap md:mb-2 ${
                      s.long ? "text-[clamp(13px,1.15vw,17px)]" : "text-[clamp(15px,1.45vw,20px)]"
                    } ${i === 1 || i === 2 ? "text-red" : "text-cream"}`}>
                    {s.v}
                  </div>
                  <div className="text-cream-dim truncate text-[11px] leading-[1.3] font-medium md:text-[11.5px]">
                    {s.l}
                  </div>
                  <div className="mono text-ash mt-0.5 truncate text-[9.5px] tracking-[0.08em] md:text-[10px]">
                    {s.sub}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mono text-ash mt-6 flex flex-wrap gap-x-5 gap-y-2 text-[10.5px] tracking-[0.06em] md:mt-7 md:flex-nowrap md:gap-6 md:text-[11px]">
            <span>SEHK · 0100</span>
            <span className="text-line-strong">|</span>
            <span>SHANGHAI LAB</span>
            <span className="text-line-strong">|</span>
            <span>EST. 2021</span>
            <span className="text-line-strong">|</span>
            <span className="text-red-bright">v3.0 / 2026-06-01</span>
          </div>
        </div>

        <div
          className="border-line-strong relative overflow-hidden rounded-[14px] border lg:aspect-[5/5.6]"
          style={{
            aspectRatio: "1 / 1.05",
            minHeight: 360,
            background: "linear-gradient(180deg, rgba(16,7,7,0.7) 0%, rgba(10,5,5,0.95) 100%)",
            boxShadow: "0 40px 80px -40px rgba(229,57,53,0.3), inset 0 1px 0 rgba(229,57,53,0.12)",
          }}>
          {(["tl", "tr", "bl", "br"] as const).map((c) => {
            const isLeft = c.includes("l");
            const isTop = c.includes("t");
            return (
              <span
                key={c}
                aria-hidden
                className={`corner-frame h-2.5 w-2.5 ${isTop ? "top-1" : "bottom-1"} ${
                  isLeft ? "left-1" : "right-1"
                } ${isTop ? "border-t" : "border-b"} ${isLeft ? "border-l" : "border-r"}`}
              />
            );
          })}

          <div className="mono text-ash absolute inset-x-3 top-3 z-2 flex justify-between text-[8.5px] tracking-[0.12em] uppercase md:inset-x-4 md:top-9 md:text-[9.5px]">
            <span>FIG. 01 / ATTENTION MAP</span>
            <span className="text-red">● LIVE</span>
          </div>

          <AttentionField />

          <div className="mono text-ash absolute inset-x-3 bottom-3 z-2 flex justify-between text-[8.5px] tracking-[0.12em] uppercase md:inset-x-4 md:bottom-9 md:text-[9.5px]">
            <span>1 block = 10,922 tokens</span>
            <span>MSA · BLOCK-LEVEL SELECT</span>
          </div>
        </div>
      </div>
    </section>
  );
}
