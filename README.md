# MiniMax M3 Landing Page

A fully responsive, single-page marketing site for the MiniMax M3 model launch.

This project also serves as a stress test of MiniMax M3's frontend code-generation capabilities — every component, layout, and responsive breakpoint was produced as an evaluation artifact for the model.

## Stack

- **Vite** + **React 19** + **TypeScript**
- **Tailwind CSS v4** (via `@tailwindcss/vite`)
- **Shiki** for code highlighting
- **oxlint** + **oxfmt** for linting and formatting
- **Bun 1.3.14** + **Node 26** (pinned via `mise.toml`)
- Deployed to **GitHub Pages** via `.github/workflows/deploy.yml`

## Local development

```sh
mise install      # picks bun@1.3.14 + node@26 from mise.toml
bun install
bun run dev       # start the Vite dev server on http://localhost:5173
```

## Quality gates

```sh
bun run typecheck   # tsc -b --noEmit
bun run lint        # oxlint .
bun run format      # oxfmt .
```

## Deployment

Pushes to `main` trigger `.github/workflows/deploy.yml`, which runs typecheck, lint, format, build, then uploads `dist/` to GitHub Pages.

Live: https://davidbasilefilho.github.io/minimax-m3-test/

## License

MIT — see [LICENSE](./LICENSE).
