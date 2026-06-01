import { Button } from "@base-ui/react/button";
import { Progress } from "@base-ui/react/progress";
import { Tabs } from "@base-ui/react/tabs";
import { useEffect, useRef, useState } from "react";
import { codeToHtml } from "shiki";
import { Reveal } from "./Reveal";

const SAMPLES = {
  chat: `import OpenAI from "openai";

const client = new OpenAI({
  baseURL: "https://api.minimax.io/v1",
  apiKey: process.env.MINIMAX_API_KEY,
});

const stream = await client.chat.completions.create({
  model: "MiniMax-M3",
  messages: [
    { role: "system", content: "You are M3. You think in code." },
    { role: "user", content: "Refactor this 200K-token codebase to TypeScript." },
  ],
  stream: true,
  max_tokens: 8192,
});

for await (const chunk of stream) {
  process.stdout.write(chunk.choices[0]?.delta?.content ?? "");
}`,
  msa: `# MSA is on by default at > 32K context.
# Override the block budget if you want to spend more.

curl https://api.minimax.io/v1/chat/completions \\
  -H "Authorization: Bearer $MINIMAX_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "model": "MiniMax-M3",
    "msa": {
      "block_budget": 256,
      "local_window": 64,
      "global_tokens": 16
    },
    "messages": [ ... ]
  }'`,
  tools: `// M3 operates a real desktop. Native tool use, no glue code.
const result = await m3.run({
  goal: "Find the failing test in the checkout repo and patch it.",
  tools: ["bash", "read", "edit", "browser"],
  max_steps: 80,
  // 1M context — the whole repo fits.
});

// result.transcript  // every tool call, every diff
// result.patch       // unified diff of the final fix
// result.tests       // green?`,
} as const;

type Sample = keyof typeof SAMPLES;

const LANG: Record<Sample, string> = {
  chat: "typescript",
  msa: "bash",
  tools: "typescript",
};

const streamText = `// → M3 is reasoning across the whole repo.
// → It opens 14 files, reads 1 test, edits 2 lines.
// → Returns a passing test run in 38.4 seconds.`;

export function CodeBlock() {
  const [sample, setSample] = useState<Sample>("chat");
  const [running, setRunning] = useState(false);
  const [progress, setProgress] = useState(0);
  const [output, setOutput] = useState("");
  const [html, setHtml] = useState<string>("");
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    let cancelled = false;
    codeToHtml(SAMPLES[sample], {
      lang: LANG[sample],
      theme: "github-dark",
    })
      .then((out) => {
        if (!cancelled) setHtml(out);
      })
      .catch(() => {
        if (!cancelled) setHtml("");
      });
    return () => {
      cancelled = true;
    };
  }, [sample]);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  const run = () => {
    if (running) return;
    setRunning(true);
    setProgress(0);
    setOutput("");
    const start = performance.now();
    const total = 2400;
    timerRef.current = window.setInterval(() => {
      const t = (performance.now() - start) / total;
      const p = Math.min(1, t);
      setProgress(p);
      const charCount = Math.floor(p * streamText.length);
      setOutput(streamText.slice(0, charCount));
      if (p >= 1) {
        if (timerRef.current) clearInterval(timerRef.current);
        timerRef.current = null;
        setRunning(false);
      }
    }, 30) as unknown as number;
  };

  return (
    <section
      id="api"
      className="border-line relative border-t"
      style={{ padding: "clamp(80px, 12vw, 160px) 0" }}>
      <div className="page">
        <Reveal>
          <div className="section-label mb-5">§ 04 — THE API</div>
        </Reveal>

        <Reveal delay={80}>
          <h2
            className="display text-cream mb-4 max-w-[900px]"
            style={{ fontSize: "clamp(36px, 5vw, 72px)" }}>
            Drop-in <em>compatible.</em> <br />
            Hard to outrun.
          </h2>
        </Reveal>

        <Reveal delay={160}>
          <p className="text-cream-dim mb-14 max-w-[680px] text-[16px]">
            M3 speaks the OpenAI protocol. Same SDK, same tool-calling schema, same streaming shape.
            The only change is the <code className="mono text-red">baseURL</code>.
          </p>
        </Reveal>

        <Reveal delay={200}>
          <div
            className="border-line-strong bg-bg-1 overflow-hidden rounded-[14px] border"
            style={{ boxShadow: "0 40px 100px -40px rgba(0,0,0,0.6)" }}>
            <div className="border-line bg-bg-2 flex flex-wrap items-center gap-3 border-b px-4 py-3 md:gap-4">
              <div className="flex gap-1.5">
                <span className="border-line bg-bg-4 block h-2.5 w-2.5 rounded-full border" />
                <span className="border-line bg-bg-4 block h-2.5 w-2.5 rounded-full border" />
                <span className="border-line bg-bg-4 block h-2.5 w-2.5 rounded-full border" />
              </div>

              <Tabs.Root value={sample} onValueChange={(v) => setSample(v as Sample)}>
                <Tabs.List
                  className="mono border-line bg-bg-0 flex gap-1 rounded-md border p-[3px]"
                  aria-label="Code sample">
                  {(["chat", "msa", "tools"] as const).map((s) => (
                    <Tabs.Tab
                      key={s}
                      value={s}
                      className="mono data-[active]:bg-red data-[active]:text-bg-0 text-cream-dim hover:text-cream cursor-pointer rounded px-3 py-1.5 text-[10.5px] font-semibold tracking-[0.08em] uppercase transition-colors">
                      {s}
                    </Tabs.Tab>
                  ))}
                </Tabs.List>
              </Tabs.Root>

              <div className="mono text-ash ml-auto hidden text-[11px] tracking-[0.06em] md:block">
                ~/m3-sdk · main
              </div>
            </div>

            <div className="grid min-h-[440px] lg:grid-cols-2">
              <div className="border-line bg-bg-1 overflow-auto border-b p-5 text-[12.5px] leading-[1.7] md:p-6 md:text-[13.5px] lg:border-r lg:border-b-0">
                {html ? (
                  <div className="codeblock-shiki" dangerouslySetInnerHTML={{ __html: html }} />
                ) : (
                  <div className="mono text-ash">// loading…</div>
                )}
              </div>

              <div className="bg-bg-0 flex flex-col gap-4 p-5">
                <div className="flex items-center justify-between">
                  <div className="mono text-ash text-[10px] tracking-[0.16em]">
                    CONSOLE · STREAM
                  </div>
                  <Button
                    onClick={run}
                    disabled={running}
                    data-cursor="hover"
                    className={`mono rounded text-[11px] font-semibold tracking-[0.08em] uppercase transition-colors ${
                      running
                        ? "bg-bg-3 text-ash px-3.5 py-1.5"
                        : "bg-red text-bg-0 hover:bg-red-bright px-3.5 py-1.5"
                    }`}>
                    {running ? "⏵ running" : "▶ run"}
                  </Button>
                </div>

                <div className="mono border-line bg-bg-1 text-cream-dim relative min-h-[200px] flex-1 overflow-auto rounded-lg border p-4 text-[12px] leading-[1.7] whitespace-pre-wrap md:min-h-[280px] md:text-[12.5px]">
                  {output || <span className="text-ash">// press ▶ to stream a live response</span>}
                  {running && (
                    <span
                      aria-hidden
                      className="bg-red ml-0.5 inline-block h-3.5 w-1.5 animate-pulse align-text-bottom"
                    />
                  )}

                  <Progress.Root
                    value={progress * 100}
                    className="bg-bg-3 absolute inset-x-0 bottom-0 h-0.5 overflow-hidden">
                    <Progress.Track className="h-full">
                      <Progress.Indicator
                        className="bg-red h-full transition-[width] duration-75"
                        style={{
                          boxShadow: "0 0 8px var(--color-red-glow)",
                        }}
                      />
                    </Progress.Track>
                  </Progress.Root>
                </div>

                <div className="border-line grid grid-cols-3 overflow-hidden rounded-lg border">
                  {[
                    { k: "TTFT", v: "142 ms" },
                    { k: "TOKENS", v: `${Math.floor(progress * 84)} / 84` },
                    { k: "TPS", v: "312" },
                  ].map((s, i, arr) => (
                    <div
                      key={i}
                      className={`p-2.5 ${i < arr.length - 1 ? "border-line border-r" : ""}`}>
                      <div className="mono text-ash text-[9px] tracking-[0.14em]">{s.k}</div>
                      <div className="mono text-cream mt-0.5 text-[12px] font-semibold md:text-[13.5px]">
                        {s.v}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
