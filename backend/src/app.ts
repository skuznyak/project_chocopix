import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import { productRouter } from './routes/products.js'
import { orderRouter } from './routes/orders.js'
import { novaPoshtaRouter } from './routes/novaposhta.js'
import { callbackRouter } from './routes/callback.js'
import { promoCodeRouter } from './routes/promoCodes.js'
import { errorHandler } from './middleware/errorHandler.js'

const app = express()
const port = Number(process.env.PORT ?? 3000)
const isDevelopment = process.env.NODE_ENV !== 'production'
const allowedOrigins = (process.env.CORS_ORIGIN ?? '')
  .split(',')
  .map((origin) => origin.trim())
  .filter(Boolean)

const isAllowedDevelopmentOrigin = (origin: string) => {
  try {
    const url = new URL(origin)
    return ['localhost', '127.0.0.1'].includes(url.hostname)
  } catch {
    return false
  }
}

app.use(helmet())
app.use(
  cors({
    origin(origin, callback) {
      if (!origin) {
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

app.get('/api/health', (_request, response) => {
  response.json({ status: 'ok' })
})

app.use('/api/products', productRouter)
app.use('/api/orders', orderRouter)
app.use('/api/np', novaPoshtaRouter)
app.use('/api/callback', callbackRouter)
app.use('/api/promo', promoCodeRouter)
app.use(errorHandler)

app.listen(port, () => {
  console.log(`ChocoPix API listening on http://localhost:${port}`)
})
