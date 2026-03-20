import { mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'
import { PRERENDER_ROUTES } from './prerender-routes.mjs'

const SITE_URL = 'https://chocopix.store'
const HOMEPAGE_TITLE = 'Шоколадні бомбочки з маршмелоу — ChocoPix'
const HOMEPAGE_CANONICAL = `${SITE_URL}/`
const HOMEPAGE_FAQ_SCHEMA_MARKER = '"@type":"FAQPage"'
const PRODUCT_ROUTE_PREFIX = '/product/'
const ROUTE_VALIDATIONS = {
  '/cart': {
    title: 'Кошик | ChocoPix',
    canonical: `${SITE_URL}/cart`,
    ogUrl: `${SITE_URL}/cart`,
    robots: 'noindex,follow',
    h1: 'Кошик',
  },
  '/checkout': {
    title: 'Оформлення замовлення | ChocoPix',
    canonical: `${SITE_URL}/checkout`,
    ogUrl: `${SITE_URL}/checkout`,
    robots: 'noindex,follow',
    h1: 'Оформлення замовлення',
  },
  '/order-success': {
    title: 'Замовлення підтверджено | ChocoPix',
    canonical: `${SITE_URL}/order-success`,
    ogUrl: `${SITE_URL}/order-success`,
    robots: 'noindex,follow',
    h1: 'Дякуємо за замовлення!',
  },
}
const __dirname = dirname(fileURLToPath(import.meta.url))
const frontendDir = resolve(__dirname, '../frontend')
const distDir = resolve(frontendDir, 'dist')
const ssrEntryPath = resolve(frontendDir, 'dist-server/entry-server.js')
const templatePath = resolve(distDir, 'index.html')

const escapeInlineJson = (value) =>
  JSON.stringify(value)
    .replace(/</g, '\\u003c')
    .replace(/\u2028/g, '\\u2028')
    .replace(/\u2029/g, '\\u2029')

const DYNAMIC_HEAD_TAG_PATTERNS = [
  /<title\b[^>]*>[\s\S]*?<\/title>\s*/gi,
  /<meta\b[^>]*name=["']description["'][^>]*>\s*/gi,
  /<meta\b[^>]*property=["']og:title["'][^>]*>\s*/gi,
  /<meta\b[^>]*property=["']og:description["'][^>]*>\s*/gi,
  /<meta\b[^>]*property=["']og:type["'][^>]*>\s*/gi,
  /<meta\b[^>]*property=["']og:url["'][^>]*>\s*/gi,
  /<meta\b[^>]*property=["']og:image["'][^>]*>\s*/gi,
  /<meta\b[^>]*property=["']og:image:width["'][^>]*>\s*/gi,
  /<meta\b[^>]*property=["']og:image:height["'][^>]*>\s*/gi,
  /<meta\b[^>]*property=["']og:locale["'][^>]*>\s*/gi,
  /<meta\b[^>]*name=["']robots["'][^>]*>\s*/gi,
  /<link\b[^>]*rel=["']canonical["'][^>]*>\s*/gi,
  /<script\b[^>]*type=["']application\/ld\+json["'][^>]*>[\s\S]*?<\/script>\s*/gi,
]

const buildCanonicalUrl = (route) => (route === '/' ? `${SITE_URL}/` : `${SITE_URL}${route}`)

const stripDynamicHeadTags = (markup) =>
  DYNAMIC_HEAD_TAG_PATTERNS.reduce((currentMarkup, pattern) => currentMarkup.replace(pattern, ''), markup)

const stripCanonicalLink = (markup) => markup.replace(/<link\b[^>]*rel=["']canonical["'][^>]*>\s*/gi, '')

const sanitizeTemplate = (template) =>
  stripDynamicHeadTags(template)
    .replace(/<div id="root">[\s\S]*?<\/div>/i, '<div id="root"></div>')
    .replace(/<script>window\.__PRERENDER_QUERY_STATE__=[\s\S]*?<\/script>\s*/gi, '')

const applyHeadMarkup = (template, headMarkup, route) =>
  template.replace(
    '</head>',
    `${stripCanonicalLink(headMarkup)}<link rel="canonical" href="${buildCanonicalUrl(route)}" />\n  </head>`,
  )

const buildHtmlDocument = (template, appHtml, headMarkup, dehydratedState, route) => {
  const withHead = applyHeadMarkup(template, headMarkup, route)
  const stateScript = `<script>window.__PRERENDER_QUERY_STATE__=${escapeInlineJson(dehydratedState)}</script>`

  return withHead.replace(
    '<div id="root"></div>',
    `<div id="root">${appHtml}</div>\n    ${stateScript}`,
  )
}

const assertIncludes = (html, expected, message) => {
  if (!html.includes(expected)) {
    throw new Error(`${message}. Missing: ${expected}`)
  }
}

const assertExcludes = (html, unexpected, message) => {
  if (html.includes(unexpected)) {
    throw new Error(`${message}. Unexpected: ${unexpected}`)
  }
}

const validateUtilityRoute = (route, html) => {
  const expected = ROUTE_VALIDATIONS[route]

  if (!expected) {
    return
  }

  assertIncludes(html, `<title data-rh="true">${expected.title}</title>`, `${route} rendered the wrong title`)
  assertIncludes(html, `<meta data-rh="true" name="robots" content="${expected.robots}"/>`, `${route} rendered the wrong robots tag`)
  assertIncludes(html, `<meta data-rh="true" property="og:url" content="${expected.ogUrl}"/>`, `${route} rendered the wrong og:url`)
  assertIncludes(html, `<link rel="canonical" href="${expected.canonical}" />`, `${route} rendered the wrong canonical`)
  assertIncludes(html, `<h1`, `${route} did not render body content`)
  assertIncludes(html, expected.h1, `${route} did not render its dedicated H1`)
  assertExcludes(html, HOMEPAGE_TITLE, `${route} fell back to the homepage title`)
  assertExcludes(html, `<link rel="canonical" href="${HOMEPAGE_CANONICAL}" />`, `${route} fell back to the homepage canonical`)
  assertExcludes(html, `<meta data-rh="true" property="og:url" content="${HOMEPAGE_CANONICAL}"/>`, `${route} fell back to the homepage og:url`)
  assertExcludes(html, HOMEPAGE_FAQ_SCHEMA_MARKER, `${route} leaked homepage FAQ schema`)
}

const validateProductRoute = (route, html) => {
  if (!route.startsWith(PRODUCT_ROUTE_PREFIX)) {
    return
  }

  const canonical = `${SITE_URL}${route}`

  assertExcludes(html, HOMEPAGE_TITLE, `${route} fell back to the homepage title`)
  assertExcludes(html, HOMEPAGE_FAQ_SCHEMA_MARKER, `${route} leaked homepage FAQ schema`)
  assertIncludes(html, `<meta data-rh="true" property="og:url" content="${canonical}"/>`, `${route} rendered the wrong og:url`)
  assertIncludes(html, `<link rel="canonical" href="${canonical}" />`, `${route} rendered the wrong canonical`)
  assertIncludes(html, '"@type":"Product"', `${route} did not render product schema`)
  assertIncludes(html, '<h1', `${route} did not render product body content`)
}

const routeToOutputPath = (route) =>
  route === '/' ? resolve(distDir, 'index.html') : resolve(distDir, route.slice(1), 'index.html')

const template = sanitizeTemplate(readFileSync(templatePath, 'utf8'))
const { renderRoute } = await import(pathToFileURL(ssrEntryPath).href)

for (const route of PRERENDER_ROUTES) {
  const outputPath = routeToOutputPath(route)
  const { appHtml, headMarkup, dehydratedState } = await renderRoute(route)
  const html = buildHtmlDocument(template, appHtml, headMarkup, dehydratedState, route)

  validateUtilityRoute(route, html)
  validateProductRoute(route, html)

  mkdirSync(dirname(outputPath), { recursive: true })
  writeFileSync(outputPath, html, 'utf8')
}

rmSync(resolve(frontendDir, 'dist-server'), { recursive: true, force: true })

console.log(`Prerendered ${PRERENDER_ROUTES.length} routes into ${distDir}`)
