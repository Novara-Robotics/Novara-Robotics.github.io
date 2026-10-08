# Novara-Robotics.github.io

The Novara Robotics website at novararobotics.com, the home of Deri. Static, hosted on GitHub Pages (deploys from
`main`). There is no build step: edit the files and push.

## Files

- `index.html`, `styles.css`, `script.js` - the page, its styles and its behaviour (mobile nav, section highlight in the
  nav, reveal on scroll)
- `config.js` - the one booking link that every "Book a demo" button uses. The links are also written into the HTML, so
  the buttons work even without JavaScript.
- `privacy.html`, `terms.html`, `404.html` - legal pages and the branded 404, same shell as the home page
- `assets/` - logo (`logo_nobg.png`) and its source mark (`n_nobg.png`, the icons are generated from it), favicons and
  app icons, share image (`og-card.png`), the hero background (`hero-bg.webp`) and the four product images
- `site.webmanifest`, `favicon.ico`, `robots.txt`, `sitemap.xml`, `CNAME` - metadata. `CNAME` is the custom domain for
  GitHub Pages; keep it.
- `docs/DESIGN.md` - colours, type, shape and the design decisions that still hold. Use it when building product UI so
  it matches the site.

## Notes

- Fonts (Manrope, IBM Plex Mono) are loaded from Google Fonts, so each page makes a third-party request.
- The hero image is a WebP (about 250 KB). Keep a lossless original outside the repo if you edit it again.
- `viewport-fit=cover` and `env(safe-area-inset-*)` keep content clear of notches. The shared edges are the
  `--edge-l` / `--edge-r` custom properties; any column narrower than the container (for example `.doc`) must apply the
  same margins itself or it will sit left-aligned.
- Local preview: `python3 -m http.server 4173`

## Known limitations

Accepted on purpose; everything else was tested and works.

- **Landscape phones:** the hero background is cropped.
- **iPhone Chrome, landscape after rotating from portrait:** Chrome on iOS keeps a stale page width after rotation, so
  the layout can look off until you reload. Safari is fine.
- **Reveal on scroll needs JavaScript.** Without it, a fallback shows the sections directly.
- **Tested on:** Chrome (Ubuntu, Mac, iPhone), Firefox (Ubuntu), Safari (Mac, iPhone, iPad). Not tested: Android, Edge,
  older iOS versions. Safari cannot be run in the dev environment, so Safari behaviour has only been checked by hand.
