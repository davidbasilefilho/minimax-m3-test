import { Tabs } from "@base-ui/react/tabs";
import { Tooltip } from "@base-ui/react/tooltip";
import { IconArrowRight } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { AttentionField } from "./AttentionField";

type AttentionMode = "msa" | "full";

const stats = [
  { v: "1,048,576", l: "context window", sub: "tokens", long: true },
  { v: "9.7×", l: "prefill speedup", sub: "vs M2 @ 1M" },
  { v: "15.6×", l: "decode speedup", sub: "vs M2 @ 1M" },
  { v: "$0.30", l: "per million tokens", sub: "API output" },
];

export function Hero() {
  const [time, setTime] = useState(() => new Date());
  const [attnMode, setAttnMode] = useState<AttentionMode>("msa");
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
            MiniMax M3 is the first model to combine frontier-level coding, a 1-million-token
            context window, and native image &amp; video understanding — all in one model. Built on{" "}
            <span className="serif-italic text-red-bright">MiniMax Sparse Attention</span>.
          </p>

          <div className="mb-10 flex flex-wrap items-center gap-3 md:mb-11">
            <a href="#api" data-cursor="hover" className="btn-primary whitespace-nowrap">
              Try the API
              <IconArrowRight aria-hidden size={14} stroke={1.6} />
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
            <Tooltip.Root>
              <Tooltip.Trigger delay={150} render={<span className="cursor-default" />}>
                SEHK · 0100
              </Tooltip.Trigger>
              <Tooltip.Portal>
                <Tooltip.Positioner side="top" sideOffset={6}>
                  <Tooltip.Popup className="mono text-cream-dim border-line-strong bg-bg-2/95 z-[60] rounded-md border px-2.5 py-1.5 text-[10.5px] tracking-[0.08em] shadow-[0_20px_60px_-20px_rgba(229,57,53,0.4)] backdrop-blur-md transition-[opacity,transform] duration-150 data-[ending-style]:translate-y-1 data-[ending-style]:opacity-0 data-[starting-style]:translate-y-1 data-[starting-style]:opacity-0">
                    Listed on the Hong Kong Stock Exchange · ticker 0100
                  </Tooltip.Popup>
                </Tooltip.Positioner>
              </Tooltip.Portal>
            </Tooltip.Root>
            <span className="text-line-strong" aria-hidden>
              |
            </span>
            <Tooltip.Root>
              <Tooltip.Trigger delay={150} render={<span className="cursor-default" />}>
                SHANGHAI LAB
              </Tooltip.Trigger>
              <Tooltip.Portal>
                <Tooltip.Positioner side="top" sideOffset={6}>
                  <Tooltip.Popup className="mono text-cream-dim border-line-strong bg-bg-2/95 z-[60] rounded-md border px-2.5 py-1.5 text-[10.5px] tracking-[0.08em] shadow-[0_20px_60px_-20px_rgba(229,57,53,0.4)] backdrop-blur-md transition-[opacity,transform] duration-150 data-[ending-style]:translate-y-1 data-[ending-style]:opacity-0 data-[starting-style]:translate-y-1 data-[starting-style]:opacity-0">
                    MiniMax Group Inc. · research HQ in Shanghai
                  </Tooltip.Popup>
                </Tooltip.Positioner>
              </Tooltip.Portal>
            </Tooltip.Root>
            <span className="text-line-strong" aria-hidden>
              |
            </span>
            <Tooltip.Root>
              <Tooltip.Trigger delay={150} render={<span className="cursor-default" />}>
                EST. 2021
              </Tooltip.Trigger>
              <Tooltip.Portal>
                <Tooltip.Positioner side="top" sideOffset={6}>
                  <Tooltip.Popup className="mono text-cream-dim border-line-strong bg-bg-2/95 z-[60] rounded-md border px-2.5 py-1.5 text-[10.5px] tracking-[0.08em] shadow-[0_20px_60px_-20px_rgba(229,57,53,0.4)] backdrop-blur-md transition-[opacity,transform] duration-150 data-[ending-style]:translate-y-1 data-[ending-style]:opacity-0 data-[starting-style]:translate-y-1 data-[starting-style]:opacity-0">
                    Founded 2021 · five years from lab to frontier
                  </Tooltip.Popup>
                </Tooltip.Positioner>
              </Tooltip.Portal>
            </Tooltip.Root>
            <span className="text-line-strong" aria-hidden>
              |
            </span>
            <Tooltip.Root>
              <Tooltip.Trigger
                delay={150}
                render={<span className="text-red-bright cursor-default" />}>
                v3.0 / 2026-06-01
              </Tooltip.Trigger>
              <Tooltip.Portal>
                <Tooltip.Positioner side="top" sideOffset={6}>
                  <Tooltip.Popup className="mono text-cream-dim border-line-strong bg-bg-2/95 z-[60] rounded-md border px-2.5 py-1.5 text-[10.5px] tracking-[0.08em] shadow-[0_20px_60px_-20px_rgba(229,57,53,0.4)] backdrop-blur-md transition-[opacity,transform] duration-150 data-[ending-style]:translate-y-1 data-[ending-style]:opacity-0 data-[starting-style]:translate-y-1 data-[starting-style]:opacity-0">
                    Production launch · 1 June 2026 · M3.0 stable
                  </Tooltip.Popup>
                </Tooltip.Positioner>
              </Tooltip.Portal>
            </Tooltip.Root>
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

          <div className="mono text-ash absolute inset-x-3 top-3 z-2 flex items-center justify-between text-[8.5px] tracking-[0.12em] uppercase md:inset-x-4 md:top-9 md:text-[9.5px]">
            <span>FIG. 01 / ATTENTION MAP</span>
            <Tabs.Root value={attnMode} onValueChange={(v) => setAttnMode(v as AttentionMode)}>
              <Tabs.List className="border-line bg-bg-0/70 flex rounded border backdrop-blur-md">
                <Tabs.Tab
                  value="msa"
                  className="data-[active]:bg-red data-[active]:text-bg-0 text-cream-dim rounded px-2 py-0.5 text-[9px] font-semibold tracking-[0.1em] uppercase">
                  MSA
                </Tabs.Tab>
                <Tabs.Tab
                  value="full"
                  className="data-[active]:bg-red data-[active]:text-bg-0 text-cream-dim rounded px-2 py-0.5 text-[9px] font-semibold tracking-[0.1em] uppercase">
                  Full
                </Tabs.Tab>
              </Tabs.List>
            </Tabs.Root>
          </div>

          <AttentionField mode={attnMode} />

          <div className="mono text-ash absolute inset-x-3 bottom-3 z-2 flex justify-between text-[8.5px] tracking-[0.12em] uppercase md:inset-x-4 md:bottom-9 md:text-[9.5px]">
            <span>1 block = 10,922 tokens</span>
            <span>MSA · BLOCK-LEVEL SELECT</span>
          </div>
        </div>
      </div>
    </section>
  );
}
