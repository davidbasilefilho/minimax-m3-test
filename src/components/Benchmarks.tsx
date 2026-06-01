import { useReveal, useCounter } from "../lib/reveal";
import { Reveal } from "./Reveal";

interface Bar {
  name: string;
  value: number;
  highlight?: boolean;
}

const BENCHMARKS: { name: string; data: Bar[] }[] = [
  {
    name: "SWE Bench Pro",
    data: [
      { name: "M3", value: 59.0, highlight: true },
      { name: "Opus 4.7", value: 64.3 },
      { name: "GPT 5.5", value: 58.6 },
      { name: "Gemini 3.1 Pro", value: 54.2 },
    ],
  },
  {
    name: "Terminal Bench 2.1",
    data: [
      { name: "M3", value: 66.0, highlight: true },
      { name: "Opus 4.7", value: 66.1 },
      { name: "GPT 5.5", value: 78.2 },
      { name: "Gemini 3.1 Pro", value: 70.0 },
    ],
  },
  {
    name: "VIBE V2",
    data: [
      { name: "M3", value: 50.1, highlight: true },
      { name: "Opus 4.7", value: 55.8 },
      { name: "GPT 5.5", value: 50.5 },
      { name: "Gemini 3.1 Pro", value: 28.0 },
    ],
  },
  {
    name: "SVG-Bench",
    data: [
      { name: "M3", value: 63.7, highlight: true },
      { name: "Opus 4.7", value: 62.3 },
      { name: "GPT 5.5", value: 58.2 },
      { name: "Gemini 3.1 Pro", value: 59.2 },
    ],
  },
  {
    name: "KernelBench Hard",
    data: [
      { name: "M3", value: 28.8, highlight: true },
      { name: "Opus 4.7", value: 30.7 },
      { name: "GPT 5.5", value: 20.9 },
      { name: "Gemini 3.1 Pro", value: 18.6 },
    ],
  },
  {
    name: "BrowseComp",
    data: [
      { name: "M3", value: 83.5, highlight: true },
      { name: "Opus 4.7", value: 79.3 },
      { name: "GPT 5.5", value: 84.4 },
      { name: "Gemini 3.1 Pro", value: 85.9 },
    ],
  },
  {
    name: "GDPval rubric",
    data: [
      { name: "M3", value: 74.7, highlight: true },
      { name: "Opus 4.7", value: 79.8 },
      { name: "GPT 5.5", value: 80.6 },
      { name: "Gemini 3.1 Pro", value: 57.8 },
    ],
  },
  {
    name: "BankerToolBench",
    data: [
      { name: "M3", value: 76.1, highlight: true },
      { name: "Opus 4.7", value: 81.3 },
      { name: "GPT 5.5", value: 70.0 },
      { name: "Gemini 3.1 Pro", value: 67.0 },
    ],
  },
  {
    name: "MCP Atlas",
    data: [
      { name: "M3", value: 74.2, highlight: true },
      { name: "Opus 4.7", value: 77.0 },
      { name: "GPT 5.5", value: 75.3 },
      { name: "Gemini 3.1 Pro", value: 69.2 },
    ],
  },
  {
    name: "OSWorld-verified",
    data: [
      { name: "M3", value: 70.0, highlight: true },
      { name: "Opus 4.7", value: 82.8 },
      { name: "GPT 5.5", value: 78.7 },
      { name: "Gemini 3.1 Pro", value: 76.2 },
    ],
  },
];

function MiniBarChart({ name, data }: { name: string; data: Bar[] }) {
  const { ref, inView } = useReveal<HTMLDivElement>();
  const max = Math.max(...data.map((d) => d.value));
  return (
    <div ref={ref} className="flex h-full flex-col">
      <div className="flex flex-1 items-end justify-around gap-1 px-1 pb-1">
        {data.map((d) => {
          const heightPct = (d.value / max) * 100;
          return (
            <div key={d.name} className="flex flex-1 flex-col items-center gap-1.5">
              <div
                className={`mono text-center text-[7.5px] leading-tight ${
                  d.highlight ? "text-red font-semibold" : "text-cream-dim"
                }`}>
                {d.name}
              </div>
              <div className="flex w-full items-end" style={{ height: 110 }}>
                <div
                  className="relative w-full overflow-hidden rounded-t-[2px]"
                  style={{
                    height: inView ? `${heightPct}%` : "0%",
                    transition: "height 1.1s var(--ease-out-expo)",
                    background: d.highlight
                      ? "linear-gradient(180deg, var(--color-red-bright), var(--color-red-deep))"
                      : "linear-gradient(180deg, var(--color-bg-3), var(--color-bg-4))",
                  }}>
                  <div className="mono text-cream absolute top-1 right-0 left-0 text-center text-[9px] font-semibold">
                    {d.value.toFixed(1)}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="mono text-ash mt-2 text-center text-[9px] tracking-[0.14em]">
        {name.toUpperCase()}
      </div>
    </div>
  );
}

function BigStat({
  value,
  label,
  suffix,
  start,
  isFirstColumnOnMobile,
  isFirstRowOnMobile,
  isNotLastOnDesktop,
}: {
  value: number;
  label: string;
  suffix?: string;
  start: boolean;
  isFirstColumnOnMobile?: boolean;
  isFirstRowOnMobile?: boolean;
  isNotLastOnDesktop?: boolean;
}) {
  const v = useCounter(value, 1800, start);
  return (
    <div
      className={`p-4 md:p-5 ${
        isFirstColumnOnMobile ? "border-line-strong border-r" : ""
      } ${isFirstRowOnMobile ? "border-line-strong border-b md:border-b-0" : ""} ${
        isNotLastOnDesktop ? "md:border-line md:border-r" : ""
      }`}>
      <div
        className="display text-red mb-1.5"
        style={{
          fontSize: "clamp(34px, 5.5vw, 68px)",
          letterSpacing: "-0.04em",
          lineHeight: 0.95,
        }}>
        {v.toFixed(value % 1 === 0 ? 0 : 1)}
        {suffix && <span className="text-cream-dim ml-1 text-[0.5em]">{suffix}</span>}
      </div>
      <div className="mono text-ash text-[10px] tracking-[0.12em] uppercase md:text-[10.5px] md:tracking-[0.14em]">
        {label}
      </div>
    </div>
  );
}

export function Benchmarks() {
  const { ref, inView } = useReveal<HTMLDivElement>();

  return (
    <section
      id="benchmarks"
      className="border-line relative border-t"
      style={{ padding: "clamp(80px, 12vw, 160px) 0" }}>
      <div className="page">
        <Reveal>
          <div className="section-label mb-5">§ 03 — BENCHMARKS</div>
        </Reveal>

        <Reveal delay={80}>
          <h2
            className="display text-cream mb-4 max-w-[900px]"
            style={{ fontSize: "clamp(36px, 5vw, 72px)" }}>
            The first <em>weights-available</em> frontier.
          </h2>
        </Reveal>

        <Reveal delay={140}>
          <p className="text-cream-dim mb-14 max-w-[680px] text-[16px]">
            M3 sits at frontier level on coding and agentic work. Weights-available, no API lock-in.
            Numbers below are from the public technical report — exact runs reproducible via the
            public M3 API.
          </p>
        </Reveal>

        <div
          ref={ref}
          className="border-line bg-bg-1 mb-8 grid grid-cols-2 overflow-hidden rounded-[14px] border md:mb-10 md:grid-cols-4">
          {[
            { value: 59.0, label: "SWE Bench Pro", suffix: "%" },
            { value: 15.6, label: "Decode speedup @ 1M", suffix: "×" },
            { value: 1, label: "M token context", suffix: "M" },
            { value: 20, label: "API / month", suffix: " USD" },
          ].map((s, i, arr) => (
            <BigStat
              key={i}
              value={s.value}
              label={s.label}
              suffix={s.suffix}
              start={inView}
              isFirstColumnOnMobile={i % 2 === 0}
              isFirstRowOnMobile={i < 2}
              isNotLastOnDesktop={i < arr.length - 1}
            />
          ))}
        </div>

        <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3 md:gap-4 lg:grid-cols-5">
          {BENCHMARKS.map((b, i) => (
            <Reveal key={b.name} delay={i * 40}>
              <div className="border-line bg-bg-1 flex h-full rounded-[10px] border p-3 md:p-4">
                <MiniBarChart name={b.name} data={b.data} />
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={200}>
          <div className="mono border-line bg-bg-1/50 text-ash mt-6 rounded-lg border border-dashed p-4 text-[11px] tracking-[0.04em] md:mt-8 md:p-5 md:text-[11.5px] md:tracking-[0.06em]">
            <span className="text-red">note</span> — benchmarks measured at M3 launch (2026-06-01)
            via the public M3 API. Closed-source competitors shown at their respective
            public-reported numbers as of the same date. We're not bluffing.
          </div>
        </Reveal>
      </div>
    </section>
  );
}
