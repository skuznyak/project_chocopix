# SEO Audit Report

Date: 2026-03-20
Site: `https://chocopix.store`
Scope: live homepage spot check, local codebase audit, generated production build audit

## Executive Summary

The main historical reason Google could index only a couple of pages was the SPA rendering model. The repository now has SSR prerender support for indexable routes, and the production build currently emits crawlable HTML for 20 eligible URLs:

- 1 home page
- 4 static indexable pages: `/cacao-bombs`, `/gift-sets`, `/promotions`, `/contacts`
- 15 product pages under `/product/*`

If Google still shows only around 2 indexed pages after the next deploy, that is no longer a metadata problem inside the app. It would point to one of these operational causes:

- the updated build has not been deployed yet
- nginx is still serving an older SPA-only build
- Google has not recrawled the new HTML yet
- GSC coverage is holding pages in `Crawled - currently not indexed` or `Discovered - currently not indexed`

## Critical Issues

### 1. SPA indexation was the primary blocker

Status: fixed in repo

What was wrong:

- Category and product pages previously depended on client-side rendering.
- That setup commonly leads to partial indexation, weak discovery, and duplicate homepage-style HTML for deep URLs.

What now exists:

- server prerender entry
- prerender route generation
- static HTML output for all core category and product URLs
- unique title, description, canonical, OG tags, and schema in prerendered HTML

Impact:

- Google can now receive full HTML for product and category pages without executing JS.
- This directly addresses the indexing bottleneck.

### 2. Utility routes could leak homepage HTML to crawlers

Status: fixed in repo

What was wrong:

- `/cart`, `/checkout`, `/order-success`, and `/404` were known nginx routes, but some of them were falling back to `/index.html`.
- In that setup, crawlers could receive homepage HTML on non-indexable utility URLs.

What was changed:

- those routes are now prerendered too
- each route now outputs its own HTML with `noindex`
- `/cart` no longer SSR-renders a `Navigate` no-op

Impact:

- noindex pages now send consistent crawler-visible HTML instead of homepage fallbacks
- duplicate/soft-duplicate risk is reduced

### 3. Legacy `/cups` URL had no server-side canonical resolution

Status: fixed in repo

What was wrong:

- `/cups` existed only as a client-side redirect pattern and was blocked in `robots.txt`
- that is weak for signal consolidation if any historical links or indexed URLs still point there

What was changed:

- nginx route generation now returns `301 /cups -> /cacao-bombs`
- client routing now also redirects `/cups` to `/cacao-bombs`
- `/cups` was removed from `robots.txt` so crawlers can see the redirect

Impact:

- old signals can consolidate into the category page instead of dying on a blocked or JS-only path

## Medium Issues

### 1. SEO content depth is still thin outside transactional pages

Current state:

- indexable commercial pages exist
- there are no informational landing pages or blog pages for discovery beyond direct product intent

Missing pages worth adding:

- `/delivery`
- `/payment`
- `/gift-ideas`
- `/how-to-make-hot-chocolate-bombs`
- `/blog/*` articles targeting seasonal and gift queries

Impact:

- limits non-brand keyword expansion
- reduces internal link depth and topical authority

### 2. Several product names are visually branded but weak for search intent

Examples:

- `Шоколадне серце`
- `Дитяча радість`
- `Романтичний сет`

Problem:

- these names are fine as display names, but not ideal as primary query targets without stronger descriptive support

Recommendation:

- keep the brand-facing product name
- strengthen product H1/body copy with explicit query language such as `какао бомбочка`, `подарунковий набір`, `шоколадне серце з маршмелоу`

### 3. Frontend payload is still moderately heavy

Current build snapshot:

- main JS entry: about `87 kB` before gzip
- React vendor chunk: about `164 kB` before gzip
- motion chunk: about `122 kB` before gzip

This is not the indexing blocker anymore, but it still affects crawl efficiency and mobile UX.

## Low Issues

### 1. `Contacts` uses a favicon as OG image

Problem:

- poor social preview quality

Fix:

- replace with a real branded contact/packaging image

### 2. No dedicated collection copy for some commercial intents

Examples:

- gifts by recipient
- seasonal gifting
- hot chocolate kits

### 3. Off-page signals were not fully auditable from local repo context

What is missing:

- backlink profile
- brand citations
- indexed brand mentions
- GSC coverage/export data

To finish the off-page section, use Ahrefs, GSC, or Search Console links report after deploy.

## Indexation Snapshot

Eligible indexable URLs in current build: 20

Included in sitemap:

- `/`
- `/cacao-bombs`
- `/gift-sets`
- `/promotions`
- `/contacts`
- 15 product URLs

Excluded from indexation intentionally:

- `/cart`
- `/checkout`
- `/order-success`
- `/404`

## Action Plan

### Immediate

- deploy the current build and nginx route config together
- verify that live `View Source` for product/category URLs contains full HTML, canonical, and schema
- resubmit sitemap in Google Search Console
- request indexing for `/cacao-bombs` and 3-5 representative product URLs

### Next 7 Days

- inspect GSC Coverage and URL Inspection for `/cacao-bombs` and product URLs
- confirm Googlebot receives `200` on product/category pages and `301` on `/cups`
- confirm utility routes expose `noindex`

### Next 30 Days

- add 3-5 informational SEO pages
- improve search-intent copy on generic product names
- add stronger internal links from home/category pages into gift and seasonal clusters
- reduce non-critical JS on first load

## Files Changed During Audit Execution

- `scripts/prerender-routes.mjs`
- `scripts/generate-spa-routes.mjs`
- `frontend/src/App.tsx`
- `frontend/src/AppServer.tsx`
- `frontend/src/pages/CartPage.tsx`
- `frontend/public/robots.txt`

