import { Reveal } from "./Reveal";

const plans = [
  {
    name: "Open",
    sub: "Weights only",
    price: "$0",
    period: "forever",
    cta: "Download weights",
    href: "#",
    features: [
      "Full M3-7B / M3-40B checkpoints",
      "Apache-2.0 license",
      "Run locally, no telemetry",
      "Self-host inference",
    ],
    accent: false,
  },
  {
    name: "API",
    sub: "Hosted inference",
    price: "$20",
    period: "/ month · includes 10M output tokens",
    cta: "Start building",
    href: "#",
    features: [
      "Full M3 endpoint · OpenAI-compatible",
      "Native tool & desktop use",
      "Streaming & function calling",
      "Usage-based beyond included",
      "Email support, 24h SLA",
    ],
    accent: true,
    badge: "MOST POPULAR",
  },
  {
    name: "Enterprise",
    sub: "Custom deployment",
    price: "Custom",
    period: "volume pricing, on-prem available",
    cta: "Contact sales",
    href: "#",
    features: [
      "Dedicated M3 cluster",
      "Private fine-tuning",
      "SOC 2, HIPAA, regional residency",
      "SLA & 24/7 named support",
      "Architecture review with our team",
    ],
    accent: false,
  },
];

export function Pricing() {
  return (
    <section
      id="pricing"
      className="border-line relative border-t"
      style={{ padding: "clamp(80px, 12vw, 160px) 0" }}>
      <div className="page">
        <Reveal>
          <div className="section-label mb-5">§ 05 — PRICING</div>
        </Reveal>

        <Reveal delay={80}>
          <h2
            className="display text-cream mb-4 max-w-[900px]"
            style={{ fontSize: "clamp(36px, 5vw, 72px)" }}>
            $20 a month. <em>Or zero, if you'd rather.</em>
          </h2>
        </Reveal>

        <Reveal delay={140}>
          <p className="text-cream-dim mb-14 max-w-[680px] text-[16px]">
            We're a public company that still believes in open weights. Pick hosted convenience or
            run the model on your own metal. No fine print.
          </p>
        </Reveal>

        <div className="grid gap-4 md:gap-5 xl:grid-cols-3">
          {plans.map((p, i) => (
            <Reveal key={i} delay={i * 100}>
              <div
                className={`group relative flex h-full flex-col rounded-[14px] p-6 transition-transform duration-300 [transition-timing-function:var(--ease-out-quart)] hover:-translate-y-[3px] md:p-7 ${
                  p.accent
                    ? "border-red border shadow-[0_30px_80px_-30px_var(--color-red-glow)]"
                    : "border-line border"
                }`}
                style={{
                  background: p.accent
                    ? "linear-gradient(180deg, rgba(229,57,53,0.06) 0%, var(--color-bg-1) 60%)"
                    : "var(--color-bg-1)",
                }}>
                {p.badge && (
                  <div className="mono bg-red text-bg-0 absolute -top-2.5 left-6 rounded px-2.5 py-1 text-[9.5px] font-bold tracking-[0.16em] md:left-7">
                    {p.badge}
                  </div>
                )}

                <div className="mb-5 md:mb-6">
                  <div className="display text-cream text-[22px] font-bold tracking-[-0.02em] md:text-[24px]">
                    {p.name}
                  </div>
                  <div className="text-ash mt-1 text-[12.5px] md:text-[13px]">{p.sub}</div>
                </div>

                <div className="mb-5 md:mb-6">
                  <div
                    className={`display text-[clamp(36px,4vw,56px)] leading-none font-bold tracking-[-0.04em] ${
                      p.accent ? "text-red" : "text-cream"
                    }`}>
                    {p.price}
                  </div>
                  <div className="mono text-ash mt-2 text-[10.5px] tracking-[0.04em] md:text-[11px]">
                    {p.period}
                  </div>
                </div>

                <a
                  href={p.href}
                  data-cursor="hover"
                  className={`mb-6 block rounded-lg px-4 py-3 text-center text-[13.5px] font-semibold transition-colors md:mb-7 ${
                    p.accent
                      ? "bg-red text-bg-0 hover:bg-red-bright"
                      : "border-line-strong text-cream hover:border-red hover:bg-red-faint hover:text-red-bright border"
                  }`}>
                  {p.cta} →
                </a>

                <ul className="mt-auto grid gap-3">
                  {p.features.map((f) => (
                    <li
                      key={f}
                      className="text-cream-dim flex gap-2.5 text-[13px] leading-[1.4] md:text-[13.5px]">
                      <span aria-hidden className="mono text-red mt-0.5 text-[12px]">
                        +
                      </span>
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={200}>
          <div className="border-line bg-bg-1 mt-6 flex flex-col gap-4 rounded-[10px] border p-5 md:mt-8 md:flex-row md:flex-wrap md:items-center md:justify-between md:gap-6 md:p-6">
            <div className="mono text-ash text-[10px] tracking-[0.16em] md:text-[10.5px] md:tracking-[0.18em]">
              USAGE-BASED PRICING · BEYOND INCLUDED
            </div>
            <div className="mono text-cream-dim flex flex-wrap gap-x-6 gap-y-2 text-[12px] md:gap-8 md:text-[13px]">
              <span>
                <span className="text-ash">input</span> · <span className="text-cream">$0.03</span>{" "}
                / M tok
              </span>
              <span>
                <span className="text-ash">output</span> · <span className="text-cream">$0.30</span>{" "}
                / M tok
              </span>
              <span>
                <span className="text-ash">cache hit</span> ·{" "}
                <span className="text-red">$0.003</span> / M tok
              </span>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
