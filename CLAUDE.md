# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev       # Start Vite dev server (localhost:5173)
npm run build     # Production build → dist/
npm run preview   # Preview production build locally
npm run lint      # ESLint across all .js/.jsx files
```

No test suite is configured.

## Architecture

Single-page React portfolio with a futuristic dark theme. No routing — the page is one long scroll.

**Entry point:** `src/main.jsx` → `src/App.jsx`

`App.jsx` composes the page in order:
`Header` → `Hero` → `About` → `Skill` → `EducationSection` → `InternshipGlobe` → `Work` → `Contact` → `SiteFeedback` → `Footer`

`InternshipGlobe` is lazy-loaded via `React.lazy` / `Suspense` because it pulls in Three.js.

**Animation system (global, defined in `App.jsx`):**
- `ReactLenis` wraps the whole app for smooth scrolling
- GSAP + ScrollTrigger drives scroll-reveal animations via CSS class conventions: `.reveal-up`, `.reveal-left`, `.reveal-right`, `.parallax-soft`
- Framer Motion is used inside individual components for finer-grained animations
- All animations are disabled when `prefers-reduced-motion: reduce` is set

**Data layer (`src/data/`):**
- `workProjects.js` — portfolio project cards (title, description, tags, links, image)
- `skillCloudItems.js` — skill icons shown in the rotating cloud
- `educationData.js` — education timeline entries
- `internshipLocations.js` — globe pin data for the InternshipGlobe section
- `siteLinks.js` — social/external links used across components
- `emailjsConfig.js` — EmailJS service/template/public-key (used by Contact and SiteFeedback)

**3D components (`@react-three/fiber` + `@react-three/drei`):**
- `InternshipGlobe` (lazy) renders an interactive globe; split into `GlobeCanvas` and `InternshipTooltip`
- `Honors3D` inside EducationSection is another Three.js scene

**Styling:**
- Tailwind CSS v3 for utility classes
- CSS design tokens defined in `src/index.css` under `:root` (colors, fonts, spacing)
- Fonts: `Syne` (display/headings) and `JetBrains Mono` (body/mono)
- Section-level CSS lives next to its component (e.g., `hero.css`, `skill-cloud/skill-cloud.css`)

**Static assets:** All images and SVG logos live in `public/images/`. Skill logos are under `public/images/official-logos/`. The built output mirrors this into `dist/images/`.
