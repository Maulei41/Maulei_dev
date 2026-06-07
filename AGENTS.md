# maulei.dev — Portfolio

## Project Overview

React + Vite portfolio site for **Li Ho Yin**, a CS student at HKU. Apple-inspired editorial design with Inter Tight / Inter typography, blue accent palette, glassmorphism bottom navigation, and scroll-reveal animations.

## Tech Stack

- **React 19** + TypeScript
- **Vite 8** (dev server, build)
- **Tailwind CSS v4** (styling)
- **Phosphor Icons** (Bold weight via `@phosphor-icons/react`)
- **CSS Transitions** (scroll-reveal, hover effects — minimal Framer Motion legacy)

## Frontend Architecture

### Directory Structure

```
src/
├── components/
│   ├── layout/        # Navbar, Footer, Container
│   ├── ui/            # Button, Card, Tag, SectionLabel, ScrollReveal
│   └── effects/       # MagneticCursor (legacy, unused)
├── sections/          # Hero, About, Skills, Projects, Experience, Contact
├── data/              # projects.ts, experience.ts, contact.ts, skills.ts
├── types/             # Shared TypeScript interfaces
├── animations/        # Framer Motion variants (legacy)
├── hooks/             # Custom React hooks (legacy)
├── i18n/              # Internationalization (legacy English + Chinese)
├── pages/             # Dev-only pages: DesignSystemPreview
├── assets/            # Static assets
├── App.tsx            # Root component, section orchestration
├── main.tsx           # Entry point
└── index.css          # Design system CSS variables + Tailwind import
```

### Component Categories

**UI Components** (`src/components/ui/`) — Atomic, reusable, presentational:

| Component    | Purpose                                    | Props                                         |
|-------------|--------------------------------------------|-----------------------------------------------|
| `Button`     | Apple-style button                         | variant, size, href, icon, iconPosition       |
| `Card`       | Bordered card container                    | hoverable, padding, as                        |
| `Tag`        | Pill-shaped skill/badge label              | variant ('default' / 'dark')                  |
| `SectionLabel` | Uppercase mono eyebrow label             | dark                                          |
| `ScrollReveal` | IntersectionObserver fade-in on scroll   | delay, stagger                                |

**Layout Components** (`src/components/layout/`) — Page structure:

| Component    | Purpose                                    |
|-------------|---------------------------------------------|
| `Navbar`     | Fixed bottom-center glassmorphism pill nav  |
| `Footer`     | Minimal dark footer with copyright          |
| `Container`  | Max-width content wrapper (1120px)          |

**Sections** (`src/sections/`) — Page sections composed from UI components:

| Section      | Background   | Content                         |
|-------------|-------------|---------------------------------|
| `Hero`       | Dark (#000)  | Logo, name, subtitle, CTAs      |
| `About`      | Pale gray    | Bio paragraphs                  |
| `Skills`     | White        | Tech stack tag cloud            |
| `Projects`   | Pale gray    | Project card grid               |
| `Experience` | White        | Chronological timeline          |
| `Contact`    | Dark (#000)  | Contact pill links              |

## Design System

### Colors

| Usage                | Hex       | CSS Variable           |
|---------------------|-----------|------------------------|
| Dark backgrounds    | `#000000` | `--black`              |
| Alt section bg      | `#f5f5f7` | `--pale-gray`          |
| Default bg / cards  | `#ffffff` | `--white`              |
| Body text           | `#1d1d1f` | `--ink`                |
| Primary blue        | `#0071e3` | `--blue-primary`       |
| Link blue           | `#0066cc` | `--blue-link`          |
| Bright blue (dark)  | `#2997ff` | `--blue-bright`        |
| Secondary text      | `#6e6e73` | `--text-secondary`     |
| Borders             | `#d2d2d7` | `--border-light`       |

Tailwind v4 classes: `text-[#0071e3]`, `bg-[#f5f5f7]`, `border-[#d2d2d7]`, etc.

### Typography

| Usage           | Font         | Weight | Size     |
|----------------|-------------|--------|----------|
| Display/Headings | Inter Tight  | 600    | 56px h1  |
| Body           | Inter        | 400    | 17px     |
| Mono/Labels    | JetBrains Mono | 500  | 0.75rem  |

### Spacing

- Section padding: `--section-gap` = 120px desktop, 80px mobile
- Container max-width: 1120px
- Card padding: 32px (24px on mobile via `max-sm:`)

### Section Rhythm

Sections alternate backgrounds: **Dark → Gray → White → Gray → White → Dark → Footer(Black)**. This binary rhythm gives the page a clear editorial beat.

## Component Reuse Guidelines

### When building new pages:

1. **FIRST** check if existing UI components (`Button`, `Card`, `Tag`, `SectionLabel`, `ScrollReveal`) fulfill the need
2. **SECOND** extend existing components via props, variants, or `className` overrides
3. **ONLY** create new components when existing ones cannot fulfill requirements

### Data-driven sections:

- Sections import data from `src/data/` files
- Never hardcode content in section components if a data file exists for it
- Content is in English; i18n translations exist for legacy components only

### Styling precedence:

1. Tailwind utility classes (highest priority for one-off adjustments)
2. CSS custom properties (design system tokens in `index.css`)
3. Component-level CSS classes

### Example: Adding a new skill

```tsx
// 1. Add to data
// src/data/skills.ts
skills.push('New Skill')

// 2. It appears automatically in the Skills section
// Done — ScrollReveal + Tag handle presentation
```

## Development

### Commands

```bash
npm run dev       # Start Vite dev server
npm run build     # TypeScript check + production build
npm run preview   # Preview production build
```

### Design System Preview

A comprehensive reference page is available in **development mode only** at the bottom of the page (hidden in production). It displays:
- Color palette with swatches
- Typography scale
- All UI component variants (Button, Card, Tag, SectionLabel)
- Layout examples

To view: run `npm run dev` and scroll to the bottom of the page, or look for the "Design System" section.

## Future Development Notes

- **Dark mode**: Currently light-only, matching the Apple aesthetic. If dark mode is needed, use `prefers-color-scheme` and add `dark:` variants — but maintain the blue accent throughout. No color drift.
- **Animations**: Prefer CSS transitions over Framer Motion. Only reach for Motion for complex choreography (stagger, spring physics).
- **Color lock**: Maintain the `#0071e3` apple-blue accent throughout the entire page. No secondary accents, no gradients on CTAs.
- **New sections**: Match the alternating background rhythm (white/gray/white/gray). Use `ScrollReveal` for entry animations.
- **Image assets**: The logo uses `/Maulei_logo.jpeg`. Keep image paths relative to `public/`.
- **Performance**: All animations use `transform` and `opacity` only. No layout-triggering properties.
