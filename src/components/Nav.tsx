import { useEffect, useState } from "react";

const links = [
  { href: "#architecture", label: "Architecture" },
  { href: "#capabilities", label: "Capabilities" },
  { href: "#benchmarks", label: "Benchmarks" },
  { href: "#api", label: "API" },
  { href: "#pricing", label: "Pricing" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close menu on resize past lg breakpoint
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const onChange = (e: MediaQueryListEvent) => {
      if (e.matches) setOpen(false);
    };
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (open) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = prev;
      };
    }
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 flex h-17 items-center transition-[background,backdrop-filter,border-color] duration-400 [transition-timing-function:var(--ease-out-quart)] ${
        scrolled || open
          ? "border-line bg-bg-0/85 border-b [backdrop-filter:blur(20px)_saturate(160%)]"
          : "border-b border-transparent bg-transparent"
      }`}
      style={{ padding: "0 var(--gutter)" }}>
      <div className="page flex w-full items-center justify-between gap-3 md:gap-6">
        <a
          href="#main"
          className="text-cream flex shrink-0 items-center gap-2.5 text-[17px] font-bold tracking-[-0.02em] md:text-[18px]"
          style={{ fontFamily: "var(--font-display)" }}
          aria-label="MiniMax home">
          <Logo />
          <span>
            MiniMax<span className="text-red">.</span>M3
          </span>
        </a>

        {/* Desktop nav links */}
        <nav aria-label="Primary" className="hidden lg:flex lg:gap-1">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-cream-dim hover:bg-red-faint hover:text-cream rounded-md px-3.5 py-2 text-[13.5px] font-medium transition-colors">
              {l.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2 md:gap-2.5">
          <span
            className="mono text-ash hidden items-center gap-1.5 text-[11px] md:inline-flex"
            aria-label="Model version">
            <span
              aria-hidden
              className="bg-red h-1.5 w-1.5 rounded-full"
              style={{
                boxShadow: "0 0 10px var(--color-red-glow)",
                animation: "pulse 2s infinite",
              }}
            />
            v3.0 · LIVE
          </span>
          <a
            href="#api"
            className="bg-red text-bg-0 hover:bg-red-bright rounded-md px-3.5 py-2 text-[12.5px] font-semibold transition-colors md:px-4 md:text-[13px]"
            style={{ letterSpacing: "-0.005em" }}>
            Try API →
          </a>

          {/* Mobile menu toggle */}
          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((v) => !v)}
            className="text-cream hover:text-red-bright grid h-10 w-10 place-items-center rounded-md transition-colors lg:hidden">
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              aria-hidden
              className="overflow-visible">
              {open ? (
                <>
                  <line
                    x1="4"
                    y1="4"
                    x2="16"
                    y2="16"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="square"
                  />
                  <line
                    x1="16"
                    y1="4"
                    x2="4"
                    y2="16"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="square"
                  />
                </>
              ) : (
                <>
                  <line
                    x1="3"
                    y1="6"
                    x2="17"
                    y2="6"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="square"
                  />
                  <line
                    x1="3"
                    y1="14"
                    x2="17"
                    y2="14"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="square"
                  />
                </>
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu panel */}
      <div
        id="mobile-menu"
        className={`bg-bg-0/95 absolute inset-x-0 top-full overflow-hidden border-b [backdrop-filter:blur(20px)_saturate(160%)] transition-[max-height,opacity] duration-300 ease-out [transition-timing-function:var(--ease-out-quart)] lg:hidden ${
          open
            ? "border-line max-h-[calc(100vh-4.25rem)] opacity-100"
            : "pointer-events-none max-h-0 border-transparent opacity-0"
        }`}
        style={{ padding: "0 var(--gutter)" }}>
        <nav aria-label="Primary mobile" className="page flex w-full flex-col gap-1 py-5">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="text-cream-dim hover:bg-red-faint hover:text-cream flex items-center justify-between rounded-md px-3 py-3 text-[15px] font-medium transition-colors">
              <span>{l.label}</span>
              <span aria-hidden className="text-ash text-[13px]">
                ↗
              </span>
            </a>
          ))}
          <div className="border-line mt-3 flex items-center gap-2 border-t pt-4">
            <span
              className="bg-red h-1.5 w-1.5 rounded-full"
              aria-hidden
              style={{
                boxShadow: "0 0 10px var(--color-red-glow)",
                animation: "pulse 2s infinite",
              }}
            />
            <span className="mono text-ash text-[10.5px] tracking-[0.12em] uppercase">
              v3.0 · Live · SEHK 0100
            </span>
          </div>
        </nav>
      </div>
    </header>
  );
}

function Logo() {
  return (
    <svg width="26" height="26" viewBox="0 0 32 32" aria-hidden>
      <rect width="32" height="32" rx="6" className="fill-bg-2 stroke-line-strong" />
      <path
        d="M7 10 L7 22 M7 10 L15 10 M7 16 L13 16 M7 22 L14 22"
        className="stroke-red"
        strokeWidth="2.4"
        strokeLinecap="square"
        fill="none"
      />
      <circle cx="22" cy="16" r="5.2" className="stroke-red fill-none" strokeWidth="2.4" />
      <circle cx="22" cy="16" r="1.8" className="fill-red" />
    </svg>
  );
}
