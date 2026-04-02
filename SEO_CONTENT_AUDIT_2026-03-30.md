# SEO Content Audit ChocoPix

Date: 2026-03-30

## Focus

This audit covers:
- keyword targeting by page
- search intent alignment
- cannibalization risks
- content gaps on category and product pages

## Executive Summary

Current content SEO is structurally solid, but there is still partial overlap between the homepage, `/cacao-bombs`, and `/gift-sets`.

The main issue is not technical indexation anymore. It is intent separation:
- homepage wants to rank for broad head terms
- `/cacao-bombs` also targets the same head terms
- `/gift-sets` is partially pulled into `/cacao-bombs` instead of owning gift intent more clearly

This creates a realistic cannibalization risk for:
- `какао бомбочки купити`
- `шоколадні бомбочки з маршмелоу`
- `подарункові набори какао бомбочок`

## Findings

### High: homepage and `/cacao-bombs` overlap too much on the same commercial head terms

Files:
- [HomePage.tsx](/var/www/chocopix/frontend/src/pages/HomePage.tsx)
- [CacaoBombsPage.tsx](/var/www/chocopix/frontend/src/pages/CacaoBombsPage.tsx)

What happens:
- Homepage `title` targets `Какао бомбочки купити | Шоколадні бомбочки з маршмелоу...`
- `/cacao-bombs` also targets `Какао бомбочки купити | Шоколадні бомбочки з маршмелоу...`
- Homepage has a major H2 block `Какао бомбочки з маршмелоу` and a full commercial section with transactional copy.
- `/cacao-bombs` also has H1/H2/content around the exact same demand cluster.

Why it matters:
- Two indexable URLs compete for the same primary intent.
- Google may alternate rankings between homepage and category page.
- Internal relevance becomes diluted.

Recommendation:
- Keep homepage focused on broad brand+category discovery:
  `какао бомбочки`, `шоколадні бомбочки`, `маршмелоу`, `подарункові набори`.
- Make `/cacao-bombs` the clear landing page for:
  `какао бомбочки купити`, `шоколадні бомбочки з маршмелоу`, `бомбочки для гарячого шоколаду`.
- Reduce repeated head-term phrasing on homepage body blocks and shift more homepage copy toward overview/navigation intent.

### High: `/cacao-bombs` partially cannibalizes `/gift-sets` by giving gift-set intent too much room

Files:
- [CacaoBombsPage.tsx](/var/www/chocopix/frontend/src/pages/CacaoBombsPage.tsx)
- [GiftSetsPage.tsx](/var/www/chocopix/frontend/src/pages/GiftSetsPage.tsx)

What happens:
- `/cacao-bombs` contains a full top section for gift sets with strong transactional phrasing and product grid.
- `/gift-sets` is supposed to own gift intent, but `/cacao-bombs` is still trying to rank that cluster too aggressively.

Why it matters:
- Query classes like `набір какао бомбочок`, `подарункові набори шоколадних бомбочок`, `какао бомбочки подарунок` may split between two URLs.
- `/gift-sets` becomes less semantically distinct.

Recommendation:
- Keep gift sets on `/cacao-bombs` only as a supporting internal-linking block, not a full competing intent block.
- `/gift-sets` should fully own:
  `подарункові набори какао бомбочок`
  `набір шоколадних бомбочок`
  `солодкий подарунок`
- `/cacao-bombs` should frame gift sets as a secondary option, not a co-primary section.

### Medium: homepage category blocks are useful for UX, but too keyword-heavy for an indexable head page

File:
- [HomePage.tsx](/var/www/chocopix/frontend/src/pages/HomePage.tsx)

What happens:
- Homepage contains several large commercial sections:
  `Какао бомбочки з маршмелоу`
  `Подарункові набори какао бомбочок`
  `Маршмелоу ручної роботи`
- This is good for internal linking, but it also makes homepage semantically compete with all major category pages at once.

Why it matters:
- Homepage starts acting like a mega-category instead of a broad entry point.
- That weakens the uniqueness of dedicated category URLs.

Recommendation:
- Keep the blocks, but shorten and soften the exact-match phrasing.
- Use homepage for overview and navigation intent, not full category ownership.
- Let each category page own its exact transactional keyword cluster.

### Medium: product page templates are improved, but they are still too formulaic to capture long-tail query diversity

File:
- [ProductPage.tsx](/var/www/chocopix/frontend/src/pages/ProductPage.tsx)

What happens:
- Product metadata and body text are generated from a template.
- This is scalable, but many pages still follow nearly identical syntax and semantic structure.

Why it matters:
- Product pages can look thin or near-duplicate at scale.
- Long-tail searches such as flavor-driven, occasion-driven, or audience-driven queries are underused.

Examples of missed long-tail intent:
- `какао бомбочка карамель`
- `шоколадна бомбочка з фундуком`
- `подарунковий набір какао бомбочок для дітей`
- `маршмелоу з корицею купити`

Recommendation:
- Expand product-specific copy using:
  flavor
  occasion
  recipient
  use case
- Avoid only repeating the base product type phrase.
- Add more differentiated product intros for top-selling SKUs manually.

### Medium: `/marshmallow` has clear positioning, but still borrows too much support from cacao/gift contexts

File:
- [MarshmallowPage.tsx](/var/www/chocopix/frontend/src/pages/MarshmallowPage.tsx)

What happens:
- The page is positioned well around `маршмелоу купити`, `крафтове маршмелоу`, `маршмелоу для какао`.
- But much of the framing still depends on cacao bombs and gift sets.

Why it matters:
- It weakens the standalone authority of the marshmallow category.
- The page should rank not only as an add-on, but as its own product type.

Recommendation:
- Strengthen direct standalone intent:
  `маршмелоу ручної роботи`
  `крафтове маршмелоу купити`
  `маршмелоу для десертів`
  `маршмелоу для какао`
- Add more content around texture, serving, flavor profiles, and difference from supermarket marshmallow.

### Low: gift-sets page is commercially focused, but occasion clustering can be expanded

File:
- [GiftSetsPage.tsx](/var/www/chocopix/frontend/src/pages/GiftSetsPage.tsx)

What happens:
- The page clearly targets gifts and gift sets.
- It already aligns better than before, but occasion sub-intents are still mostly generic.

Opportunity:
- Expand around:
  `подарунок на день народження`
  `солодкий подарунок`
  `подарунок дитині`
  `подарунок дівчині`
  `подарунковий набір для сім'ї`

Recommendation:
- Add a short section or FAQ entries mapped to occasion intent.
- This would improve topical breadth without changing page purpose.

## Page Intent Map

### Homepage `/`

Primary role:
- brand + broad catalog entry page

Primary clusters:
- `какао бомбочки`
- `шоколадні бомбочки`
- `шоколадні бомбочки з маршмелоу`

Should not fully own:
- `какао бомбочки купити`
- `подарункові набори какао бомбочок`
- `маршмелоу купити`

### `/cacao-bombs`

Primary role:
- transactional category page for bomb products

Primary clusters:
- `какао бомбочки купити`
- `шоколадні бомбочки з маршмелоу`
- `бомбочки для гарячого шоколаду`

Secondary clusters:
- `какао бомбочки поштучно`

Should not strongly own:
- `подарункові набори какао бомбочок`

### `/gift-sets`

Primary role:
- transactional category page for gift demand

Primary clusters:
- `подарункові набори какао бомбочок`
- `набір шоколадних бомбочок`
- `солодкий подарунок`

### `/marshmallow`

Primary role:
- standalone transactional category for marshmallow

Primary clusters:
- `маршмелоу купити`
- `крафтове маршмелоу`
- `маршмелоу ручної роботи`
- `маршмелоу для какао`

## Cannibalization Matrix

### Risk 1

Keyword cluster:
- `какао бомбочки купити`

Competing URLs:
- `/`
- `/cacao-bombs`

Preferred winner:
- `/cacao-bombs`

### Risk 2

Keyword cluster:
- `подарункові набори какао бомбочок`

Competing URLs:
- `/gift-sets`
- `/cacao-bombs`
- partially `/`

Preferred winner:
- `/gift-sets`

### Risk 3

Keyword cluster:
- `маршмелоу купити`

Competing URLs:
- `/marshmallow`
- partially `/`

Preferred winner:
- `/marshmallow`

## Content Gaps

Missing or underused long-tail layers:
- occasion intent
- flavor intent
- audience intent
- comparison intent
- use-case intent

Examples:
- `какао бомбочки для дітей`
- `какао бомбочки для подарунка`
- `шоколадні бомбочки з полуницею`
- `маршмелоу для гарячого шоколаду`
- `крафтове маршмелоу ручної роботи`
- `солодкий подарунок з доставкою`

## Priority Actions

1. Reduce direct head-term repetition on homepage and push homepage toward overview intent.
2. Downgrade gift-set prominence on `/cacao-bombs` so `/gift-sets` becomes the unambiguous winner for gift queries.
3. Expand `/gift-sets` around occasion-based sub-intents.
4. Expand `/marshmallow` as a standalone category, not only as an add-on to cacao bombs.
5. Manually enrich top product pages with more differentiated long-tail copy.

## Final Assessment

The site is close to a good SEO content architecture, but intent boundaries are still too soft.

Right now the main SEO ceiling is not missing meta tags. It is semantic overlap between key landing pages.

If you fix intent separation between:
- homepage
- `/cacao-bombs`
- `/gift-sets`
- `/marshmallow`

then rankings should become more stable and each URL will have a clearer chance to own its own keyword cluster.
