# SEO Audit: /marshmallow

Date: 2026-03-27
URL: `https://chocopix.store/marshmallow`
Scope: category page `/marshmallow` and directly related SEO/SSR behavior
Reference brief: `AGENTS_M.md`

## Current Status

### What is working now
- Live URL returns `200 OK`
- Page is indexable again: `noindex` is no longer present
- Canonical is correct: `https://chocopix.store/marshmallow`
- URL is present in `robots.txt` and `sitemap.xml`
- SSR/prerender now renders the real category page instead of the 404 page
- SSR now includes the marshmallow product list in prerendered HTML
- `title`, `meta description`, `og:title`, `og:description` and category schema use Ukrainian positioning

### Snapshot
- Title: `Маршмелоу купити - крафтове для какао та подарунків | ChocoPix`
- Meta description: `Крафтове маршмелоу ручної роботи для какао, подарунків і десертів. Купити маршмелоу від ChocoPix з доставкою по Україні.`
- H1: `Маршмелоу купити для какао та подарунків`
- Canonical: `https://chocopix.store/marshmallow`
- Indexability: `indexable`

## Findings

### 1. Fixed: SSR route for `/marshmallow` was missing
Severity: Critical

Before the fix, the live page rendered the 404 template with `noindex,follow`, which directly caused Google indexing rejection.

Status now:
- fixed in `frontend/src/AppServer.tsx`
- fixed in prerender/live HTML

### 2. Fixed: SSR did not preload marshmallow products
Severity: High

Before the fix, prerendered `/marshmallow` had an empty product grid and empty `ItemList` schema, which weakened the page substantially for SEO.

Status now:
- fixed in `frontend/src/entry-server.tsx`
- live HTML now contains product links and populated `ItemList`

### 3. Product data consistency is weak for several marshmallow items
Severity: High

The category page now indexes correctly, but multiple marshmallow products have mismatched names, slugs, images, flavors or descriptions. This weakens topical relevance and can confuse Google because the category page schema and card links inherit this data.

Examples from `shared/dist/catalog/products.js`:
- `marshmallow-choc-banana`
  - name: `Маршмелоу з Ананасом`
  - description/flavor: banana/chocolate
  - image file: pineapple
- `marshmallow-vanilla-bean-creme`
  - name: `Маршмелоу з Корицею`
  - flavor: vanilla bean creme
  - image/alt reference cinnamon
- `marshmallow-dubai-chocolate-domes`
  - name: `Мʼятно-Шоколадне Маршмелоу`
  - slug suggests different product concept

SEO impact:
- weaker keyword relevance
- lower consistency between category page, product URLs and schema
- risk of poor snippet understanding and lower trust signals

### 4. Title is acceptable but can be stronger
Severity: Medium

Current title:
- `Маршмелоу купити - крафтове для какао та подарунків | ChocoPix`

Issue:
- it dropped the noun phrase `крафтове маршмелоу`
- current version is indexable and acceptable, but the original target in `AGENTS_M.md` is slightly stronger semantically

Recommended version:
- `Маршмелоу купити - крафтове маршмелоу для какао та подарунків | ChocoPix`

### 5. H1 is commercially fine but weaker than the brief target
Severity: Medium

Current H1:
- `Маршмелоу купити для какао та подарунків`

Issue:
- it no longer includes `крафтове` or `ручної роботи`
- the page body compensates for this, but the H1 could carry more topical strength without looking spammy

Recommended direction:
- `Маршмелоу купити для какао та подарунків`
or
- `Крафтове маршмелоу для какао та подарунків`

Current H1 is not broken. This is an optimization, not a blocker.

### 6. OG image is now product-derived, which is better, but still depends on inconsistent product data
Severity: Medium

Current `og:image` is pulled from the first marshmallow product in the sorted list. Since some marshmallow product data is inconsistent, the selected image may not align perfectly with the product slug/name logic.

SEO impact:
- lower social preview consistency
- weaker entity clarity

### 7. Internal linking is decent, but could be tighter
Severity: Low

Current positives:
- links to `/cacao-bombs`
- links to `/gift-sets`
- links to individual marshmallow PDPs

Potential improvement:
- add one short commercial block above or near the grid with stronger intent links like:
  - marshmallow for cocoa
  - marshmallow for gift sets
  - popular flavors

Not required for indexability.

## Code Areas Reviewed

- `frontend/src/pages/MarshmallowPage.tsx`
- `frontend/src/AppServer.tsx`
- `frontend/src/entry-server.tsx`
- `frontend/src/utils/seo.ts`
- `frontend/public/robots.txt`
- `frontend/public/sitemap.xml`
- `shared/dist/catalog/products.js`

## Recommended Priorities

### Priority 1
Normalize marshmallow product data in the catalog:
- product name
- slug intent
- flavor
- image
- alt text
- short description

This is the biggest remaining SEO quality issue for `/marshmallow`.

### Priority 2
Tighten title/H1 to include `крафтове маршмелоу` more explicitly if you want stronger alignment with the original brief.

### Priority 3
Optionally add one small buyer-intent block above the product grid for:
- маршмелоу для какао
- маршмелоу для подарунка
- маршмелоу ручної роботи

## Conclusion

The hard indexing blocker is resolved.

At this point `/marshmallow` is technically indexable and much healthier for Google than before. The main remaining SEO weakness is not routing or meta tags anymore. It is data consistency inside the marshmallow product catalog, because that affects:
- category page relevance
- item list schema
- product anchors in prerendered HTML
- preview consistency

