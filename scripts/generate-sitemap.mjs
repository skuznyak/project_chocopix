import { writeFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { productsCatalog } from '../shared/dist/catalog/products.js'

const baseUrls = [
  'https://chocopix.store/',
  'https://chocopix.store/cacao-bombs',
  'https://chocopix.store/marshmallow',
  'https://chocopix.store/gift-sets',
  'https://chocopix.store/contacts',
]

const productUrls = productsCatalog.map((product) => {
  const slug = product.slug ?? product.id
  return `https://chocopix.store/product/${slug}`
})

const uniqueUrls = [...new Set([...baseUrls, ...productUrls])]
const lastmod = new Date().toISOString().slice(0, 10)

const urlEntries = uniqueUrls
  .map((url) => `  <url>\n    <loc>${url}</loc>\n    <lastmod>${lastmod}</lastmod>\n  </url>`)
  .join('\n')

const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urlEntries}\n</urlset>\n`

const outputPath = resolve('frontend/public/sitemap.xml')
writeFileSync(outputPath, xml, 'utf8')

console.log(`Generated sitemap: ${outputPath} (${uniqueUrls.length} URLs)`)
