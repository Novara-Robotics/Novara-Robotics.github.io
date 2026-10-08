# Deri / Novara Robotics — Design

Use this document when building product UI (dashboard, technician app, admin) so it matches the marketing site at [novararobotics.com](https://novararobotics.com/).

Attach screenshots of the live site alongside this file when briefing an agent or designer.

---

## Brand

| | |
|---|---|
| **Company** | Novara Robotics |
| **Product** | Deri |
| **Category** | AI reliability engineer for factories |
| **Legal** | Novara Robotics Inc., Austin, TX |
| **Tone** | Industrial, calm, serious ops software |

Deri should feel like factory tooling: measured, readable, quiet. Not playful SaaS, not “AI purple,” not dark neon console.

---

## Color

Light theme only. One accent color.

| Token | Hex | Use |
|---|---|---|
| `--color-bg` | `#ffffff` | Page / app canvas |
| `--color-bg-muted` | `#f6f5f3` | Alternating bands, sidebar wash, table header |
| `--color-surface` | `#ffffff` | Panels, cards, inputs |
| `--color-text` | `#141414` | Primary text, headings |
| `--color-text-muted` | `#5c5c5c` | Body, secondary copy |
| `--color-text-faint` | `#6e6e6e` | Labels, metadata, placeholders |
| `--color-border` | `#e6e4e1` | Dividers, input borders |
| `--color-border-strong` | `#d0cdc8` | Emphasized frames, boards |
| `--color-accent` | `#a55b3c` | Copper — CTAs, active states, key rules, sparse icons |
| `--color-accent-hover` | `#8f4c31` | Hover / pressed accent |
| `--color-accent-soft` | copper @ ~12% on white | Soft fills, selected rows, callout backgrounds |
| `--color-hero-ink` | `#0f0f0f` | Near-black for strong display type |

**Focus / selection:** copper-based outlines and highlights. Do not default to browser blue.

**Status colors (product UI only — use sparingly):**
keep semantic reds/greens/ambers for alarm / success / warn, but let copper remain the brand accent. Do not recolor the whole chrome around status.

---

## Typography

| Role | Family | Notes |
|---|---|---|
| UI / body | **Manrope** | 400–700; primary face for almost everything |
| Mono / labels | **IBM Plex Mono** | 400–600; section labels, IDs, timestamps, step numbers, KPIs |

Avoid Inter, Roboto, Arial, or system UI as the primary face.

### Hierarchy

- **Headings:** weight 600, line-height ~1.15–1.2, letter-spacing ~`-0.02em`
- **Section labels:** mono, uppercase, small (~0.7–0.8rem), copper or faint gray, tracked slightly
- **Body:** Manrope, muted gray for supporting copy
- **Dense dashboard text** can sit slightly smaller than marketing; keep the same families and contrast roles

### Marketing type scale (reference)

```text
xs     0.8125rem
sm     1rem
base   1.125rem
lg     1.35rem      ← step titles, board titles
xl     ~1.75–2.35rem
2xl    ~2.25–3.15rem
hero   very large display (marketing only)
```

For dashboard, prefer `sm` / `base` / `lg` equivalents; reserve display sizes for empty states or page titles.

---

## Shape, borders, depth

- Default radius: **`0.25rem`** (sharp, machined)
- Soft radius ok on pills / nested controls: **`~0.55–0.85rem`**
- Prefer **1px borders** over shadows
- Shadows: none or a single very soft elevation if needed for overlays/modals
- No glow, glassmorphism, or stacked fancy shadows
- Icons: thin stroke (~1.15), copper or faint gray; line icons, not emoji

---

## Layout principles

1. **White canvas first** — muted bands for structure, not decoration
2. **One job per region** — clear page title, one primary action when possible
3. **Cards only when useful** — grouping interactive content; not card spam
4. **Hairline structure** — boards, tables, and split panes with quiet borders
5. **Accent is sparse** — primary buttons, active nav, critical links, thin rules
6. **Readable density** — factories need information; avoid cluttered chrome

### Patterns from the marketing site to echo

- Mono uppercase labels above titles
- Copper primary button (filled), quiet secondary text links
- Zigzag / split rows for narrative feature blocks
- 2×2 measurement board for KPI-style grids
- Pill labels for grouping (`Existing factory systems`, etc.)

---

## Motion

- Fast, quiet: ~`160ms` with `cubic-bezier(0.16, 1, 0.3, 1)`
- Prefer opacity / small translate — not bounce or springy marketing motion
- Respect `prefers-reduced-motion`

---

## Do not use

- Dark mode as the default product theme
- Purple / indigo “AI startup” gradients
- Warm cream editorial layouts with terracotta-as-everything
- Oversized rounded-full pill clusters
- Multi-layer shadows and glow accents
- Decorative emoji in chrome
- Fake precision metrics without labeling demo/sample data

---

## CSS tokens (copy into app)

```css
:root {
  --color-bg: #ffffff;
  --color-bg-muted: #f6f5f3;
  --color-surface: #ffffff;
  --color-text: #141414;
  --color-text-muted: #5c5c5c;
  --color-text-faint: #6e6e6e;
  --color-border: #e6e4e1;
  --color-border-strong: #d0cdc8;
  --color-accent: #a55b3c;
  --color-accent-hover: #8f4c31;
  --color-accent-soft: color-mix(in srgb, var(--color-accent) 12%, white);

  --font-body: "Manrope", "Helvetica Neue", sans-serif;
  --font-mono: "IBM Plex Mono", "Courier New", monospace;

  --radius: 0.25rem;
  --transition: 160ms cubic-bezier(0.16, 1, 0.3, 1);
}

body {
  font-family: var(--font-body);
  color: var(--color-text);
  background: var(--color-bg);
  -webkit-font-smoothing: antialiased;
}

:focus-visible {
  outline: 2px solid var(--color-accent);
  outline-offset: 3px;
}
```

Load fonts:

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500;600&family=Manrope:wght@400;500;600;700&display=swap" rel="stylesheet">
```

---

## Agent brief (paste with screenshots)

```text
Build Deri dashboard UI using DESIGN_SYSTEM.md and the attached Novara/Deri website screenshots.

Match: white canvas, copper accent #a55b3c, Manrope + IBM Plex Mono, hairline borders, sparse accent, industrial ops feel.

Do not invent a new visual language. Adapt density for product UI, but keep the same tokens, type, and tone.
```

---

## Source of truth

Token values live in [`styles.css`](../styles.css) (`:root`). If marketing and this doc disagree, update both — prefer the live site.

---

## Decisions that still hold

Kept from the earlier design-direction notes (the mockup rounds they described have been removed).

- **Brand hierarchy:** Novara Robotics is the company; Deri is the product. The hero and the product story are about Deri.
- **Light, minimal.** No dark default, no yellow-and-navy.
- **One primary call to action, sitewide:** "Book a demo", in the nav and in the closing section. No buttons in the hero.
- **Hero:** the robots-and-machines background with a light left-to-right wash, no left timeline rail.
- **How Deri works:** four terse columns, numbered 01 to 04, no icons.
- **Product in action:** two large restrained frames, Manager view and Technician view. No fake telemetry.
- **Deployment and outcomes:** spec-sheet rows and a 2x2 board; no invented metrics.
- **Pilot:** one line ("Bring Deri into one real workflow, and expand only when it proves value.") and a single call to action.
- **Footer:** email, location, copyright, LinkedIn, Privacy, Terms.
- **Copy:** no em dashes.
