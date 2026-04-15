# Mohamed Aziz Nacib — Portfolio

Personal portfolio site for Mohamed Aziz Nacib, a Computer Science Engineering graduate from ESPRIT, Tunisia, with international experience across Tunisia and the Netherlands.

---

## Sections

| Section | Description |
|---|---|
| **Hero** | Animated intro with typewriter role titles, portrait, availability badge, and CTAs (resume download, GitHub, contact) |
| **About** | Personal background and summary |
| **Skills** | Rotating 3D skill cloud with 40+ technologies |
| **Education** | Timeline of the 5-year engineering program at ESPRIT (2020–2025, graduated with honors), with a Three.js 3D honors scene |
| **Internship Globe** | Interactive 3D globe with pinned internship locations — Tunisia (IPACT Consult, 2024) and Netherlands (RV Websolutions, 2025) |
| **Work** | Project cards for shipped projects with live demo links |
| **Contact** | EmailJS-powered contact form |
| **Site Feedback** | Secondary EmailJS feedback form |

---

## Featured Projects

- **Flous** — 3D Tunisian dinar visualization. Enter an amount and denomination and watch stacks of bills build in a Three.js scene with GSAP-driven animation. *(React, Three.js, GSAP, Tailwind CSS)*
- **ResuMatch** — AI-powered résumé vs. job description matcher. Surfaces skill overlap, suggests CV improvements via Hugging Face inference, and includes a LaTeX CV builder with live HTML preview. *(Next.js, TypeScript, Hugging Face)*
- **Elite** — Production-oriented women's fashion & makeup storefront with product discovery and checkout. *(React, Node.js, MongoDB)*
- **FreeAI** — Showcase app bundling 8 prompt-driven AI tools: image generation, YouTube script & title generators, caption generator, text humanizer, domain name generator, and more. *(Next.js, TypeScript, OpenAI API)*
- **AI PDF Reader** — Web app to upload PDFs and explore AI-assisted reading and extraction.

---

## Tech Stack

### Core

| Layer | Technology |
|---|---|
| Framework | React 18 |
| Build tool | Vite 5 |
| Language | JavaScript (ES modules) |
| Styling | Tailwind CSS v3 + custom CSS design tokens |
| Fonts | Syne (display/headings), JetBrains Mono (body/mono) |

### Animation

| Library | Usage |
|---|---|
| GSAP + ScrollTrigger | Global scroll-reveal animations — `.reveal-up`, `.reveal-left`, `.reveal-right`, `.parallax-soft` |
| Framer Motion | Component-level micro-animations and entrance transitions |
| Lenis (`lenis/react`) | Smooth scrolling wrapper around the whole page |

### 3D

| Library | Usage |
|---|---|
| Three.js | Internship globe and education honors scene |
| `@react-three/fiber` | React renderer for Three.js |
| `@react-three/drei` | Camera controls, helpers, and abstractions |

`InternshipGlobe` is lazy-loaded via `React.lazy` / `Suspense` to keep the initial bundle size down.

### Communication

- **EmailJS** (`@emailjs/browser`) — powers both the contact form and the site feedback form with no backend required.

### Dev Tooling

- ESLint with `eslint-plugin-react`, `eslint-plugin-react-hooks`, `eslint-plugin-react-refresh`
- PostCSS + Autoprefixer
- `prop-types` for runtime prop validation

---

## Project Structure

```
src/
├── App.jsx                    # Root — composes all sections, registers GSAP plugins
├── main.jsx                   # Entry point
├── index.css                  # Global CSS design tokens (:root), base styles
│
├── components/
│   ├── Hero.jsx               # Landing section — typewriter, portrait, CTAs
│   ├── About.jsx
│   ├── Skill.jsx              # Skills section shell
│   ├── EducationSection.jsx   # Timeline + 3D honors scene
│   ├── InternshipGlobe.jsx    # Lazy-loaded globe section
│   ├── Work.jsx               # Project cards grid
│   ├── Contact.jsx            # EmailJS contact form
│   ├── SiteFeedback.jsx       # Secondary feedback form
│   ├── Header.jsx
│   ├── Navbar.jsx
│   ├── Footer.jsx
│   ├── skill-cloud/           # Rotating 3D skill icon cloud + styles
│   ├── internship-globe/      # GlobeCanvas + InternshipTooltip
│   └── education/             # TimelineItem, GraduationCard, Honors3D
│
└── data/
    ├── workProjects.js        # Portfolio project definitions (title, description, tags, links, image)
    ├── skillCloudItems.js     # Skill icons + labels for the cloud
    ├── educationData.js       # Education timeline entries
    ├── internshipLocations.js # Globe pin data (city, lat/lng, company, tasks)
    ├── siteLinks.js           # Social and external links used across components
    └── emailjsConfig.js       # EmailJS service / template / public-key config
```

Static assets live in `public/images/`. Skill logos are under `public/images/official-logos/`.

---

## Getting Started

**Prerequisites:** Node.js 18+

```bash
# Install dependencies
npm install

# Start dev server → http://localhost:5173
npm run dev

# Production build → dist/
npm run build

# Preview production build locally
npm run preview

# Lint
npm run lint
```

---

## Before Deploying

1. **Resume** — Add your CV as `public/resume.pdf` so the Hero "Resume" button works. To use a hosted URL instead, update `SITE_LINKS.resume` in `src/data/siteLinks.js`.
2. **EmailJS** — Set your service ID, template ID, and public key in `src/data/emailjsConfig.js`.
3. **SEO / link previews** — If deploying to a custom domain, update:
   - `SITE_ORIGIN` in `src/data/siteLinks.js`
   - In `index.html`: `link rel="canonical"`, `og:url`, `og:image`, and `twitter:image` (must be absolute URLs)

---

## Accessibility

All scroll-reveal and parallax animations are disabled automatically when the user has `prefers-reduced-motion: reduce` set in their OS settings.
