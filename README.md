# Mohamed Aziz — Portfolio

React + Vite + Tailwind personal site.

## Before you deploy

1. **Resume** — Add your CV as `public/resume.pdf` so the Hero “Resume” button works. To use a hosted file instead, change `SITE_LINKS.resume` in `src/data/siteLinks.js`.
2. **SEO & link previews** — If your live URL is not GitHub Pages (`https://aziiz01.github.io/my_portfolio/`), update:
   - `SITE_ORIGIN` in `src/data/siteLinks.js` (reference for the app)
   - In `index.html`: `link rel="canonical"`, `og:url`, `og:image`, and `twitter:image` (must be **absolute** URLs)

---

## React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh
