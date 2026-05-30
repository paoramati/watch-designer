# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Watch Designer — a free app for designing a watch face via menus (like a character creator), with AI filling gaps when menus don't cover what the user wants.

Stack: SvelteKit + Svelte 5 (runes mode enforced), TypeScript, Tailwind CSS v4, deployed to Vercel.

## Commands

```sh
npm run dev          # dev server
npm run build        # production build
npm run preview      # preview production build

npm run check        # svelte-check + tsc
npm run lint         # prettier + eslint
npm run format       # prettier --write

npm run test:unit    # vitest (watch mode)
npm run test         # vitest --run + playwright e2e
npm run test:e2e     # playwright only
```

Run a single unit test file: `npx vitest run src/lib/path/to/file.spec.ts`

## Architecture

- **Svelte 5 runes mode** is forced project-wide via `svelte.config.js` — use `$state`, `$derived`, `$effect`, `$props` etc., never the legacy Options API.
- Routes live in `src/routes/`. The main page is `src/routes/+page.svelte`.
- Shared code goes in `src/lib/` and is imported via the `$lib` alias.
- `src/routes/layout.css` holds global styles; Tailwind v4 is configured via `@tailwindcss/vite`.
- Adapter is `@sveltejs/adapter-vercel`.

## Svelte MCP Tools

Use the Svelte MCP server for all Svelte/SvelteKit work:

1. **`list-sections`** — call first to discover relevant docs sections.
2. **`get-documentation`** — fetch all sections relevant to the task.
3. **`svelte-autofixer`** — run on every Svelte file written; repeat until no issues.
4. **`playground-link`** — only on user request, never for files written to the project.
