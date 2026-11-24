# My graduation

A graduation invitation that looks like a Windows 98 desktop. Each section is an
app you open from a desktop icon, the Start menu, or the taskbar.

Totally vibe code because I don't know how to code a website.

## Run locally

```bash
npm install
npm run dev
```

Build the static site with `npm run build` and preview it with `npm run preview`.

## Customize

All app content lives in `src/apps.ts`. Each entry has a label, window title, icon,
width, status-bar text, and an HTML `content` string. Placeholder text is wrapped in
`<span class="placeholder">[...]</span>` so it is easy to find and replace.

- `src/icons.ts` — original pixel-style SVG icons.
- `src/render.ts` — desktop, taskbar, Start menu, and window markup.
- `src/window-manager.ts` — open, focus, drag, minimize, maximize, and close behavior.
- `src/styles.css` — desktop theme and layout, built on top of `98.css`.

The site is plain Vite + TypeScript, so it deploys as static files with no server.
