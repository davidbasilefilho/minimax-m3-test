import { Activity } from "react";
import { Ambient } from "./components/Ambient";
import { Architecture } from "./components/Architecture";
import { Benchmarks } from "./components/Benchmarks";
import { Capabilities } from "./components/Capabilities";
import { CodeBlock } from "./components/CodeBlock";
import { Cursor } from "./components/Cursor";
import { Footer } from "./components/Footer";
import { Grain } from "./components/Grain";
import { Hero } from "./components/Hero";
import { Marquee } from "./components/Marquee";
import { Nav } from "./components/Nav";
import { Pricing } from "./components/Pricing";
import { useCursorHover } from "./lib/cursor";

export function App() {
  const { isHover, handlers } = useCursorHover();

  return (
    <>
      <Ambient />
      <Grain />
      <Activity mode={isHover ? "visible" : "hidden"}>
        <Cursor isHover={isHover} />
      </Activity>

      <Nav />

      <main id="main">
        <Hero />
        <Marquee />
        <Architecture />
        <Capabilities />
        <Benchmarks />
        <CodeBlock />
        <Pricing />
      </main>

      <Footer />

      {/* Hit-area for cursor hover detection (kept invisible) */}
      <div
        aria-hidden
        {...handlers}
        style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0 }}
      />
    </>
  );
}
