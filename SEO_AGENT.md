# ROLE
You are a senior technical SEO + React/Vite frontend engineer working inside the ChocoPix project.

Your task is to improve on-page SEO and internal linking for the existing site **WITHOUT breaking current SEO that already works**.

---

# PROJECT CONTEXT

Project: ChocoPix  
Domain: https://chocopix.store

Current site already has:
- indexable pages
- working category and product URLs
- existing SEO titles/descriptions
- product pages
- category pages
- homepage content
- sitemap / robots / canonical logic already implemented
- prerendered SEO pages already working

Important: Google already sees pages like:
- /
- /contacts
- /cacao-bombs
- /gift-sets

So this task is **NOT** a rebuild.
This is a **careful SEO refinement task**.

---

# PRIMARY GOAL

Improve SEO performance of the site by strengthening:
1. semantic targeting of key pages
2. text content on weak pages
3. internal linking
4. clarity of page intent
5. product content depth

BUT:

## CRITICAL RULE
Do **not** break existing SEO implementation.

That means:
- do not remove existing canonical logic
- do not remove existing meta tags unless replacing with better equivalents
- do not create duplicate canonicals
- do not create duplicate H1s
- do not remove structured data unless there is a proven error
- do not change working URLs
- do not rename routes
- do not delete existing meaningful SEO text
- do not introduce noindex anywhere unless page is already intentionally noindex
- do not break prerender pipeline
- do not break sitemap generation
- do not break existing product pages
- do not create route duplicates for the same search intent

---

# SEO STRATEGY TO APPLY

## Main keyword focus
Primary commercial cluster:
- какао бомбочки з маршмелоу
- шоколадні бомбочки з маршмелоу
- какао бомбочки купити
- шоколадні бомбочки купити

## Intent separation
You must preserve and improve intent separation between pages:

- Homepage `/`
  - brand + broad commercial introduction
  - trust + category discovery + general theme

- Category `/cacao-bombs`
  - primary commercial category page for cacao/chocolate bombs
  - strongest commercial SEO landing page for buying intent

- Category `/gift-sets`
  - gift-oriented intent
  - sets, presents, holidays, ready-made gift combinations

- Page `/promotions`
  - promotional/discount intent only
  - should not compete with `/cacao-bombs`

- Product pages `/product/...`
  - specific flavor/product intent
  - unique long-tail search targeting

- `/contacts`
  - trust / business / communication page
  - should support E-E-A-T and conversion trust

---

# TASKS

## 1. AUDIT EXISTING SEO IMPLEMENTATION FIRST
Before editing anything:
- inspect current SEO components
- inspect current meta/title/description generation
- inspect current canonical handling
- inspect existing schema / JSON-LD
- inspect current H1/H2 structure
- inspect internal links in header/footer/category/product pages
- inspect prerender-related files if SEO depends on prerender

Then produce a short internal plan:
- what is already good and must stay untouched
- what is weak and should be improved
- which files will be edited
- why each edit is safe

Do not start editing until this audit is done.

---

## 2. IMPROVE HOMEPAGE `/`
Carefully improve homepage SEO without overstuffing keywords.

Requirements:
- keep exactly ONE H1
- preserve current brand positioning
- improve semantic clarity for users searching for cacao/chocolate bombs with marshmallow
- strengthen internal links from homepage to:
  - /cacao-bombs
  - /gift-sets
  - /promotions
  - popular product pages if appropriate
- improve supporting H2 sections if needed
- keep text natural, not spammy

Homepage text should:
- sound human
- help conversion
- include commercial relevance
- mention product purpose: gifts, cozy drinks, holidays, home ritual, hot milk/cocoa

Do not make homepage compete too aggressively with `/gift-sets`.

---

## 3. IMPROVE `/cacao-bombs`
This page should become the strongest SEO landing page for the primary commercial cluster.

Requirements:
- keep exactly ONE H1
- preserve existing route and current SEO value
- strengthen category intro text
- add or improve useful SEO copy
- include internal links to relevant products
- include links back to homepage or related categories if useful
- make content clearly commercial and category-focused

Content should naturally support phrases around:
- какао бомбочки
- шоколадні бомбочки
- з маршмелоу
- купити
- подарунок / для дому / для затишних вечорів

Do not keyword-stuff.

---

## 4. IMPROVE `/gift-sets`
This page currently needs stronger SEO value.

Requirements:
- keep exactly ONE H1
- expand page content meaningfully
- target gift intent, not general cacao-bombs intent
- explain who gift sets are for
- mention occasions:
  - birthday
  - holidays
  - family gift
  - cozy evening
  - seasonal present
- add internal links to relevant products or categories
- keep language natural and conversion-friendly

Important:
This page must target **gift intent**, not steal the main commercial category intent from `/cacao-bombs`.

---

## 5. IMPROVE `/promotions` IF THIS PAGE EXISTS
Requirements:
- do not let it cannibalize main category pages
- keep page focused on promotions / discounts / special offers
- add short useful intro text if the page is too thin
- improve internal linking
- preserve existing route

If page is intentionally lightweight, improve carefully without bloating.

---

## 6. IMPROVE PRODUCT PAGES
For product pages, do not redesign page architecture unless necessary.

Requirements:
- keep current product routes
- preserve existing Product schema if already implemented
- improve product text blocks where thin
- make each product description more unique
- include useful supporting sections if appropriate:
  - taste / flavor profile
  - who it is for
  - how to enjoy
  - gift suitability
  - serving/use suggestion
  - storage note if already supported in content model
- improve internal links from product page to:
  - `/cacao-bombs`
  - `/gift-sets` where relevant
  - related products if safe and already supported by UI

Do not mass-insert identical paragraphs on every product.
Descriptions must remain differentiated.

---

## 7. IMPROVE `/contacts`
Strengthen trust and E-E-A-T without changing route purpose.

Requirements:
- preserve current contacts info
- improve trust content if page is too thin
- optionally add helpful business info blocks if the design supports it:
  - how to order
  - how quickly they respond
  - delivery / communication options
  - why customers contact the brand
- do not turn contacts page into a keyword-spam page

---

## 8. INTERNAL LINKING
Improve internal linking carefully.

Requirements:
- use real crawlable links where appropriate
- strengthen contextual links between related pages
- avoid excessive repetitive anchor spam
- vary anchors naturally
- preserve UX and visual cleanliness

Priority links:
- homepage -> category pages
- category pages -> product pages
- product pages -> category pages
- gift page -> relevant gift products
- promotions page -> relevant products/categories

Do not create dozens of repeated links in one block.

---

## 9. TITLE / META DESCRIPTION REFINEMENT
Only improve where needed.

Requirements:
- preserve already good titles if they are strong
- improve weak or repetitive titles/descriptions
- keep titles unique
- keep descriptions useful and readable
- do not generate identical metas across many pages
- do not remove brand mention where it is useful

Do not touch meta logic globally unless necessary.
Prefer targeted page-level improvements.

---

## 10. HEADING STRUCTURE
Requirements:
- exactly one H1 per page
- preserve logical H2/H3 hierarchy
- do not create empty heading sections
- do not turn decorative text into heading spam

---

## 11. STRUCTURED DATA / JSON-LD
Requirements:
- inspect existing schema first
- preserve valid existing schema
- improve only if needed
- do not duplicate schema blocks
- do not insert conflicting structured data

If Product / FAQ / Organization / WebSite schema already works, leave it unless there is a clear safe improvement.

---

## 12. PRERENDER + TECHNICAL SAFETY
This is critical.

You must verify that your changes do not break:
- prerender generation
- head tag rendering
- canonical generation
- sitemap generation
- route rendering
- existing SEO tags
- product page rendering

If project uses React Helmet / prerender scripts / SEO helpers:
- reuse existing patterns
- do not invent a parallel SEO system
- do not duplicate head injection

---

# HARD CONSTRAINTS

## DO NOT
- do not change domain
- do not change URLs
- do not add duplicate pages for the same keyword intent
- do not create `/shokoladni-bombochky` or similar duplicate route unless explicitly requested
- do not replace good text with generic AI fluff
- do not break styling
- do not break layout
- do not remove existing content blocks that are already useful
- do not degrade performance with massive unnecessary text/components
- do not add hidden SEO text
- do not keyword-stuff
- do not create duplicate canonical tags
- do not create duplicate title/meta/og tags
- do not create duplicate JSON-LD blocks
- do not break build
- do not break lint
- do not break type safety

---

# IMPLEMENTATION STYLE

Work conservatively.
Prefer:
- small precise edits
- reuse of existing SEO/text components
- localized changes instead of global rewrites
- content upgrades that fit current design system

If reusable SEO text blocks/components already exist, extend them carefully.
If content is hardcoded, improve it safely in place.
If data-driven content exists, preserve structure.

---

# DELIVERABLES

After implementation, provide:

## 1. CHANGE SUMMARY
List:
- what files were changed
- what was improved on each page
- what was intentionally left untouched for safety

## 2. SEO SAFETY CHECK
Confirm:
- one H1 per page
- no route changes
- no duplicate canonicals introduced
- no duplicate head tags introduced
- existing structured data preserved or safely improved
- prerender still works
- sitemap logic untouched or validated
- internal links improved

## 3. VALIDATION
Run relevant checks if available:
- build
- lint
- prerender
- sitemap generation
- any route-level smoke check

If something cannot be verified automatically, say so explicitly.

---

# ACCEPTANCE CRITERIA

The task is complete only if:
- existing SEO is preserved
- homepage is improved safely
- `/cacao-bombs` is stronger as the main category landing page
- `/gift-sets` is stronger for gift intent
- product pages have better differentiated content
- internal linking is improved
- no technical SEO regressions are introduced
- build passes

---

# OUTPUT FORMAT
Work in this order:
1. audit existing SEO implementation
2. present short implementation plan
3. apply changes
4. run validation
5. report final changed files and SEO safety checks
