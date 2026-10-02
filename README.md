# Pixel Glide — Girish Browser

**Girish Browser** — a pixel-perfect, interactive mockup of a modern web browser, built as a React web app. Explore a full browser chrome UI — tab bar, address bar, sidebar, incognito mode, and content area — all running in your browser as a design demo.

## Features

- **Browser chrome UI** — tab bar with open/close/reorder, address bar, sidebar, and status bar
- **Tab management** — open new tabs, close tabs, switch between them (with toast notifications)
- **Incognito mode** — themed dark-purple incognito appearance
- **Home screen** — stylized start page with shortcuts
- **Simulated loading** — animated loading bar when "navigating"
- **Smooth animations** — pixel-glide transitions powered by Tailwind + framer-style CSS animations
- **shadcn/ui components** — full Radix-based component library (dialogs, tooltips, toasts, dropdowns)

## Tech Stack

- React 18 + TypeScript + Vite 5
- Tailwind CSS + shadcn/ui (Radix primitives)
- react-router-dom (client-side routing)
- TanStack Query, lucide-react icons, sonner toasts
- Fully client-side — no backend, no API keys needed

## Quick Start

Requirements: Node.js 18+ and npm.

```bash
git clone https://github.com/girishlade111/pixel-glide-girish-browser.git
cd pixel-glide-girish-browser
npm install --legacy-peer-deps
npm run dev
```

Open http://localhost:8080 — the dev server port is configured in `vite.config.ts`.

## Project Structure

```
.
├── index.html                 # Entry HTML, page title
├── vite.config.ts             # Vite config (dev port 8080, @ alias)
├── src/
│   ├── main.tsx               # React entry
│   ├── App.tsx                # Providers + routes (BrowserRouter)
│   ├── pages/
│   │   ├── Index.tsx          # Home page -> BrowserUI
│   │   └── NotFound.tsx
│   ├── components/
│   │   ├── browser/           # BrowserUI, TabBar, AddressBar, Sidebar, MainContent, StatusBar, HomeScreen
│   │   └── ui/                # shadcn/ui primitives
│   ├── hooks/
│   └── lib/
├── public/                    # Static assets
└── package.json
```

## Build

```bash
npm run build        # outputs to dist/
npm run preview      # preview the production build
```

## Deployment

Static SPA — the build output in `dist/` deploys anywhere:

- **Cloudflare Pages** — build command `npm run build`, output dir `dist` (includes `_redirects` for SPA routing)
- **Netlify / Vercel** — same build command and output dir
- **GitHub Pages** — deploy `dist/` contents

Note: the app uses `BrowserRouter`; hosts that don't rewrite unknown paths to `index.html` will 404 on client-side routes — a `_redirects` file (`/* /index.html 200`) is included in `public/` for Cloudflare Pages / Netlify.

---

Built by Girish Lade — https://ladestack.in
