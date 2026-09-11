# Gravity Auto — site 28 of 46

A concept site built entirely from this dealership's own published material.
**Not affiliated with Gravity Auto, and not an official site.**

- **Live:** https://gravity-auto-site.vercel.app
- **Repo:** [gravity-auto-site](https://github.com/omaralaa0707/gravity-auto-site)

## What this page is about

Every site in this series is built around something true and checkable about
the dealer's own account — a pattern in what they publish, a contradiction
between two of their channels, or a fact about their showroom — rather than
around a generic template. The palette, type, 3D piece and motion below were
all chosen to serve that finding.

## Design record

**Palette**
: Achromatic graphite #26282D, sampled off their own concrete showroom facade, with their channel-letter silver #A8AEB6 as the only accent — no invented colour, because their real identity has none

**Type pairing**
: Orbitron + Lexend / Rubik + Vazirmatn (AR)

**3D / signature technique**
: **The gravity well**: their own name taken literally — a real wireframe grid, ~2,200 vertices displaced per frame by an inverse-distance falloff around a moving mass, warping like actual spacetime curvature. Idle orbit when untouched, snaps to the pointer on hover

**Motion language**
: Infall — content drops from slightly above and enlarged, accelerating rather than easing, dips a touch past rest on arrival and recovers, the way a mass actually falls rather than slides or fades into place

## Sources

Everything on the page was sourced from:

- Instagram: https://www.instagram.com/gravityauto.eg/
- Facebook: https://www.facebook.com/gravityauto.eg
- Google Maps: https://www.google.com/maps/place/Gravity+Auto/data=!4m2!3m1!1s0x0:0x70e7b8606bb1fe3c

Photography belongs to the dealership (or, where their frames are watermarked
by an outside studio, to that studio) and is used here only to document their
own published material. No figure on the page is invented: anything the dealer
did not publish is marked as unpublished rather than estimated.

## Running it

```bash
pnpm install
pnpm dev      # http://localhost:3000
pnpm build    # production build — must pass before shipping
pnpm lint     # eslint, zero warnings
```

Requires `node-linker=hoisted` in `.npmrc` (already present) or three.js peer
deps fail to resolve.

## Structure

```
src/content/media.ts      verified facts and figures — the data layer
src/content/en.ts|ar.ts   all copy, both locales, identical shapes
src/content/schema-ext.ts the page-specific content contract
src/components/webgl/     the 3D piece
src/components/site/      the page composition
src/app/globals.css       palette tokens, type, RTL overrides, motion
```

Arabic/English toggle with full RTL. All CSS direction overrides key off
`[dir="rtl"]` (never `[lang]`) and live outside `@layer`. Every Latin or
numeric fragment inside Arabic copy is wrapped in `.latin` for correct bidi.

---

Part of a 46-site series. See the [top-level README](../README.md) for the full
index and [`TRACKING.md`](../TRACKING.md) for the differentiation log.
