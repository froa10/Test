# Ledgerline UI

Free, copy-paste React and Next.js components with live previews: device
mockups, widgets, forms, social cards, tables, loaders and more. Built with
TypeScript, Tailwind CSS v4 and Lucide icons.

## Origin and license

Ledgerline UI is a fork of [Opensource UI](https://github.com/bidyut10/opensourceui)
by Bidyut Kundu, released under the MIT License. The original copyright notice
is kept in [`LICENSE`](LICENSE), and that file must stay with any copy of this
project or its components.

Changes in this fork:

- Rebranded as Ledgerline UI (name, logo, favicon, Open Graph image, metadata).
- Removed the original project's sponsorship, careers, about and contact pages,
  testimonials, hard-coded traffic stats and personal details. Sample data in
  components now uses a fictional placeholder person.
- Removed PostHog analytics and Sentry error tracking (including the original
  project's hard-coded Sentry DSN), and narrowed the Content Security Policy to
  match.
- Replaced photos, wallpapers and third-party images whose licensing could not
  be confirmed with original generated artwork (`scripts/brand/`).
- Rewrote the privacy and terms pages as templates for this fork.

## Getting started

Requires Node.js 22 (see `.node-version`).

```bash
npm install
npm run dev        # http://localhost:3000
```

Useful scripts:

| Command                | What it does                                              |
| ---------------------- | --------------------------------------------------------- |
| `npm run build`        | Static export to `out/`                                   |
| `npm run verify:quick` | Format check, lint, typecheck, catalog checks, unit tests |
| `npm run test:e2e`     | Playwright smoke tests (after a build)                    |

## Project layout

- `components/`: the copy-paste components, one file per component.
- `lib/showcase/showcase.tsx`: the catalog. Each `c(slug, <Preview />, file, exportName, opts)` entry adds a component page.
- `app/(docs)/components`: catalog, category and component detail pages. Code shown on a page is read from the component's real source file at build time.
- `app/(marketing)`: home, privacy and terms pages.
- `lib/site.ts`: site name, URL, GitHub repo and license links.

## Before you launch

1. Set `url` in `lib/site.ts` to your production domain.
2. Review and complete the privacy and terms pages (they are marked as templates).
3. Replace the generated placeholder images in `public/` with your own artwork if you like.
   Re-run `node scripts/brand/generate-brand-assets.mjs` after changing the logo.
4. If you want analytics or error tracking, add your own accounts and update the CSP in `vercel.json` and `public/_headers`.

## Deploy

The site is a static export (`output: "export"`). On Vercel, import the repo and
set **Root Directory** to `ledgerline-ui`; `vercel.json` sets the security headers.
`wrangler.toml` and `npm run cf:deploy` cover Cloudflare Workers static assets.
