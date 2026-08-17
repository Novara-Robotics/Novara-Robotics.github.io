# Required assets

## In use
- `./assets/logo_nobg.png` — Novara Robotics company logo, transparent (nav + footer, `og:image`, schema logo)
- `./assets/n_nobg.png` — Source N mark, transparent (not linked directly; icons below are generated from it)
- `./assets/favicon-96.png` — Primary favicon, 96×96 square, transparent
- `./favicon.ico` — Root fallback that browsers and Googlebot auto-request; 16/32/48 square, transparent
- `./favicon.png` — Root 32×32 square, transparent
- `./assets/apple-touch-icon.png` — 180×180, **opaque white** (iOS flattens alpha to black)
- `./assets/logo.png` — Legacy logo (unused)

## Placeholders (replace when ready)
- `./assets/manager-dashboard.png` — Wide manager/supervisor dashboard screenshot  
  Alt: “Deri manager dashboard showing equipment health, anomalies, and active reliability incidents.”
- `./assets/technician-app.png` — Technician/operator mobile app screenshot  
  Alt: “Deri technician application showing incident context, likely causes, and guided diagnostic actions.”

## Optional / hero candidates
Pick one and wire via CSS `--hero-image` on `.hero` / `.hero-bg`, or copy to `./assets/deri-hero.png`:

- `./assets/hero-candidates/hero-bg-01-factory-wash.png` — faint factory floor (closest to hybrid-01)
- `./assets/hero-candidates/hero-bg-02-robot-sketch.png` — pencil robot-arm sketch (closest to hybrid-03)
- `./assets/hero-candidates/hero-bg-03-signal-paths.png` — abstract technical network
- `./assets/hero-candidates/hero-bg-04-line-equipment.png` — washed production equipment
- `./assets/hero-candidates/hero-bg-05-silhouette.png` — soft industrial silhouette

## Booking
- “Book a demo” CTAs (`.btn-partner`) read `window.SITE_CONFIG.demoBookingUrl` from `config.js`  
  Fallback: `https://calendly.com/saayuj-novararobotics/30min`
