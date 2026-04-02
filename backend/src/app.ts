import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import dotenv from 'dotenv'
import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import { productRouter } from './routes/products.js'
import { orderRouter } from './routes/orders.js'
import { novaPoshtaRouter } from './routes/novaposhta.js'
import { callbackRouter } from './routes/callback.js'
import { promoCodeRouter } from './routes/promoCodes.js'
import { errorHandler } from './middleware/errorHandler.js'

const currentFilePath = fileURLToPath(import.meta.url)
const backendRoot = path.resolve(path.dirname(currentFilePath), '..')
const envPath = path.join(backendRoot, '.env')
const envLocalPath = path.join(backendRoot, '.env.local')
const envProductionPath = path.join(backendRoot, '.env.production')
const envProductionLocalPath = path.join(backendRoot, '.env.production.local')

if (fs.existsSync(envPath)) {
  dotenv.config({ path: envPath })
}

if (fs.existsSync(envLocalPath)) {
  dotenv.config({ path: envLocalPath, override: true })
}

if (process.env.NODE_ENV === 'production' && fs.existsSync(envProductionPath)) {
  dotenv.config({ path: envProductionPath })
}

if (process.env.NODE_ENV === 'production' && fs.existsSync(envProductionLocalPath)) {
  dotenv.config({ path: envProductionLocalPath, override: true })
}

const app = express()
const port = Number(process.env.PORT ?? 3000)
const isDevelopment = process.env.NODE_ENV !== 'production'
const corsOriginRaw = (process.env.CORS_ORIGIN ?? '').trim()
const allowedOrigins = corsOriginRaw
  .split(',')
  .map((origin) => origin.trim())
  .filter((origin) => origin.length > 0 && origin !== '*')
const allowAllOrigins = corsOriginRaw === '*' || (!isDevelopment && allowedOrigins.length === 0)

if (allowAllOrigins && !isDevelopment) {
  console.warn('CORS is open for all origins because CORS_ORIGIN is empty or set to "*"')
}

const isAllowedDevelopmentOrigin = (origin: string) => {
  try {
    const url = new URL(origin)
    return ['localhost', '127.0.0.1'].includes(url.hostname)
  } catch {
    return false
  }
}

const LOOPBACK_IPS = new Set<string>(['127.0.0.1', '::1', '::ffff:127.0.0.1'])
const isLoopbackRequest = (request: express.Request) => {
  const forwardedFor = request.ip ?? ''
  const remoteAddress = request.socket.remoteAddress

  return LOOPBACK_IPS.has(forwardedFor) || LOOPBACK_IPS.has(remoteAddress ?? '')
}

app.disable('x-powered-by')
app.set('trust proxy', true)
app.use(helmet())
app.use(
  cors({
    origin(origin, callback) {
      if (!origin) {
        callback(null, true)
        return
      }

      if (allowAllOrigins) {
        callback(null, true)
        return
      }

      if (allowedOrigins.includes(origin)) {
        callback(null, true)
        return
      }

      if (isDevelopment && isAllowedDevelopmentOrigin(origin)) {
        callback(null, true)
        return
      }

      callback(new Error(`CORS blocked for origin: ${origin}`))
    },
  }),
)
app.use(express.json())
app.use('/api', (_request, response, next) => {
  response.setHeader('X-Robots-Tag', 'noindex, nofollow, noarchive')
  next()
})

app.get('/api/health', (request, response) => {
  if (!isLoopbackRequest(request)) {
    response.status(404).end()
    return
  }

  response.json({ status: 'ok' })
})

app.use('/api/products', productRouter)
app.use('/api/orders', orderRouter)
app.use('/api/np', novaPoshtaRouter)
app.use('/api/callback', callbackRouter)
app.use('/api/promo', promoCodeRouter)
app.use(errorHandler)

const server = app.listen(port,'127.0.0.1', () => {
  console.log(`ChocoPix API listening on http://localhost:${port}`)
})

server.on('close', () => {
  console.log('ChocoPix API server closed')
})
