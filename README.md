# Tact Portfolio by Aryan Sharma ~ [@aryanjohnsharma](https://github.com/aryanjohnsharma)

A cinematic, dark-themed React portfolio built to feel fast, intentional, and editorial from the first scroll.  
No gimmicks, no bloat—just focused interactions, smooth transitions, and a clean content flow.

## Why this project

- Build a portfolio experience that feels premium without sacrificing performance.
- Keep the architecture straightforward enough to ship and iterate quickly.
- Blend product storytelling with motion and visual depth in a React SPA with multiple client-side routes.

## Tech stack (and what each piece does)

- **React 18** — component-driven UI and state orchestration.
- **Vite 5** — fast local dev server + optimized production bundling.
- **React Router v6** — route-level navigation and page transitions.
- **Framer Motion** — micro-interactions, section reveals, and animated route presence.
- **OGL** — GPU-powered visual layer for custom background effects.
- **Lucide React** — consistent icon system for navigation, CTAs, and contact actions.
- **Cal.com Embed (`@calcom/embed-react`)** — in-page scheduling widget integration.
- **[React Bits](https://reactbits.dev)** — animated UI patterns (wired in via the shadcn-style registry in `components.json` as `@react-bits`); used as the source for elevated pieces such as **DarkVeil** (dark-mode veil background) and **ShinyText** (hero headline treatment).
- **ESLint** — code quality and consistency checks before shipping.
- **GitHub Pages + `gh-pages`** — simple, reliable static deployment pipeline.

## Component / library shoutouts

- **[React Bits](https://reactbits.dev)** — drop-in motion and visual components; this repo pulls from the `@react-bits` registry for standout UI without reinventing every animation from scratch.
- **Framer Motion** — interaction quality across core sections and transitions.
- **OGL** — high-impact visual treatment in the background layer.
- **Lucide React** — lightweight, consistent iconography.
- **Cal.com Embed** — contact flow becomes scheduling, not just a form.

## Getting started

1. **Clone the repository**

   ```bash
   git clone https://github.com/aryanjohnsharma/aryanjohnsharma.github.io.git
   cd aryanjohnsharma.github.io
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start the dev server**

   ```bash
   npm run dev
   ```

4. **Open the app** — in your browser go to [http://localhost:5173](http://localhost:5173) (Vite’s default; check the terminal if the port differs).

## Production build

```bash
npm run build
```

Static output lands in `dist/`. To publish to GitHub Pages using the repo’s script:

```bash
npm run deploy
```

## Customize

There is no separate config package: copy and section content live in `src/components/`. Common entry points:

- `Hero.jsx` — headline, intro, primary CTAs  
- `About.jsx` — bio and story  
- `Skills.jsx` — skill list (`skillsData` array at the top of the file)  
- `Contact.jsx` / `CalWidget.jsx` — contact and scheduling  
- `Setup.jsx`, `SpotifyWidget.jsx` — gear and music blocks  
- `Navbar.jsx`, `Footer.jsx` — links and socials  
- `App.jsx` — routes and global layout (e.g. background)
