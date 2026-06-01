import { useReveal, useCounter } from "../lib/reveal";
import { Reveal } from "./Reveal";

interface Bar {
  name: string;
  value: number;
  highlight?: boolean;
  meta?: string;
}

const coding: Bar[] = [
  { name: "MiniMax M3", value: 78.2, highlight: true, meta: "open-weight" },
  { name: "Claude Opus 4.5", value: 79.1, meta: "closed" },
  { name: "GPT-5.1", value: 76.4, meta: "closed" },
  { name: "Gemini 2.5 Pro", value: 74.8, meta: "closed" },
  { name: "DeepSeek V3.2", value: 71.5, meta: "open-weight" },
  { name: "MiniMax M2.7", value: 64.3, meta: "previous" },
];

const longContext: Bar[] = [
  { name: "MiniMax M3", value: 91.4, highlight: true, meta: "MSA · 1M" },
  { name: "Gemini 2.5 Pro", value: 87.2, meta: "1M" },
  { name: "Claude Opus 4.5", value: 84.6, meta: "500K" },
  { name: "GPT-5.1", value: 81.9, meta: "400K" },
  { name: "MiniMax M2.7", value: 71.8, meta: "128K" },
];

function BarChart({ data, label, unit }: { data: Bar[]; label: string; unit: string }) {
  const { ref, inView } = useReveal<HTMLDivElement>();
  const max = Math.max(...data.map((d) => d.value));
  return (
    <div
      ref={ref}
      className="border-line bg-bg-1 relative overflow-hidden rounded-[14px] border p-5 md:p-7">
      <div className="mb-6 flex items-start justify-between">
        <div>
          <div className="mono text-ash mb-2 text-[10px] tracking-[0.18em]">BENCHMARK</div>
          <h4 className="display text-cream text-[22px] font-bold tracking-[-0.02em]">{label}</h4>
        </div>
        <span className="tag">{unit}</span>
      </div>

      <div className="grid gap-3.5">
        {data.map((d, i) => {
          const pct = (d.value / max) * 100;
          return (
            <div key={d.name} className="grid gap-1.5">
              <div className="flex items-baseline justify-between gap-3">
                <div className="flex items-baseline gap-2.5">
                  <span
                    className={`text-[13.5px] ${d.highlight ? "text-red font-semibold" : "text-cream-dim font-medium"}`}>
                    {d.name}
                  </span>
                  {d.meta && (
                    <span className="mono text-ash text-[10px] tracking-[0.1em]">{d.meta}</span>
                  )}
                </div>
                <span
                  className={`mono text-[13.5px] font-semibold ${d.highlight ? "text-red" : "text-cream"}`}>
                  {d.value.toFixed(1)}
                </span>
              </div>
              <div className="border-line bg-bg-0 relative h-2 overflow-hidden rounded-full border">
                <div
                  className={`absolute inset-y-0 left-0 ${
                    d.highlight ? "shadow-[0_0_12px_var(--color-red-glow)]" : ""
                  }`}
                  style={{
                    width: inView ? `${pct}%` : "0%",
                    background: d.highlight
                      ? "linear-gradient(90deg, var(--color-red-deep), var(--color-red), var(--color-red-bright))"
                      : "linear-gradient(90deg, var(--color-bg-3), var(--color-bg-4))",
                    transition: `width 1.2s var(--ease-out-expo) ${i * 80}ms`,
                  }}
                />
              </div>
            </div>
          );
        })}
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
            The first open-weight <em>frontier.</em>
          </h2>
        </Reveal>

        <Reveal delay={140}>
          <p className="text-cream-dim mb-14 max-w-[680px] text-[16px]">
            M3 sits at frontier level on coding and agentic work. Open weights, no API lock-in.
            Numbers below are from the public technical report — exact runs reproducible on the
            released checkpoints.
          </p>
        </Reveal>

        <div
          ref={ref}
          className="border-line bg-bg-1 mb-8 grid grid-cols-2 overflow-hidden rounded-[14px] border md:mb-10 md:grid-cols-4">
          {[
            { value: 78.2, label: "SWE-bench Verified", suffix: "%" },
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

        <div className="grid gap-4 md:gap-5 lg:grid-cols-2">
          <Reveal>
            <BarChart data={coding} label="SWE-bench Verified" unit="accuracy %" />
          </Reveal>
          <Reveal delay={120}>
            <BarChart data={longContext} label="Long-context QA" unit="f1 @ 1M" />
          </Reveal>
        </div>

        <Reveal delay={200}>
          <div className="mono border-line bg-bg-1/50 text-ash mt-6 rounded-lg border border-dashed p-4 text-[11px] tracking-[0.04em] md:mt-8 md:p-5 md:text-[11.5px] md:tracking-[0.06em]">
            <span className="text-red">note</span> — benchmarks measured at M3 launch (2026-06-01)
            under public M3 weights. Closed-source competitors shown at their respective
            public-reported numbers as of the same date. We're not bluffing.
          </div>
        </Reveal>
      </div>
    </section>
  );
}
