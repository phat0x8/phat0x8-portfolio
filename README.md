# phat0x8 — Tan Phat Nguyen | Security & Operations Portfolio

Personal cybersecurity portfolio for **Tan Phat Nguyen (`@phat0x8`)**, built with **Astro** + **Cloudflare Workers Static Assets** in a **Cyber Emerald-Teal HUD** theme.

## Key Features
- **Bilingual Instant Toggle (`EN | VI`)** with zero-FOUC persistence (`localStorage`) across Astro View Transitions.
- **Persistent 2-Column Recruiter-Friendly HUD Layout** with sticky `OPERATOR // PHAT0X8` dossier sidebar, quick navigation, verified credentials, and direct **CV PDF (EN / VN)** downloads.
- **5 Dedicated Views:** Home (`/`), AI & Binary Research (`/research/` + detail studies), Projects (`/projects/`), DFIR & SysAdmin Casebooks (`/casebooks/` + Markdown reader), and About (`/about/`).
- **Interactive Utilities:** Live Casebook search & category filtering, collapsible Table of Contents, one-click code-block Copy buttons, live GitHub repository sync (`@phat0x8`), and optional Web Audio retro terminal SFX (`SFX: OFF/ON`).

## Quick Commands

```bash
# 1. Install dependencies
npm install

# 2. Run local dev server
npm run dev

# 3. Build static site into ./dist
npm run build

# 4. Deploy to Cloudflare Workers (Static Assets)
npm run deploy
```

## Adding a New DFIR Lab / Incident RCA Casebook
Drop a new `.md` file into `src/content/casebooks/` with the required frontmatter (`title`, `titleVi`, `summary`, `summaryVi`, `category`, `date`, `readTime`, `tags`, `impact`, `impactVi`) and rebuild or `git push`.
