# ChocoPix

Monorepo for the ChocoPix chocolate bomb landing page and backend scaffold.

## Workspaces

- `shared`: common TypeScript types
- `frontend`: React 18 + Vite storefront
- `backend`: Express + Prisma API scaffold

## Commands

```bash
npm install
npm run dev:frontend
npm run dev:backend
```

## Development Notes

- Frontend calls `/api` by default.
- In local development, Vite proxies `/api` to `http://localhost:3000`, so the frontend port may change freely.
- To point the frontend to another backend in development, set `VITE_DEV_API_URL`.
- To call a separate backend in production, set `VITE_API_URL` at build time.
- If frontend and backend are served from the same domain in production, no frontend API URL override is needed.
- In development, the backend accepts `localhost` and `127.0.0.1` origins on any port.
- In production with a separate frontend domain, set `CORS_ORIGIN` to a comma-separated list of allowed origins.

---

## Deployment (Single Domain)

When frontend and backend are served from the same domain (e.g., `chocopix.store`):

### 1. Build

```bash
# Build everything
npm run build
```

### 2. Environment Variables

**Backend** (`backend/.env` or `backend/.env.production`):
```env
PORT=3000
NODE_ENV=production
CORS_ORIGIN=https://chocopix.store,https://www.chocopix.store
TELEGRAM_BOT_TOKEN=your_bot_token
TELEGRAM_CHAT_ID=your_chat_id
NOVA_POSHTA_API_KEY=your_nova_poshta_api_key
ORDER_NOTIFICATION_EMAILS=orders@example.com,owner@example.com
```

> Note: `CORS_ORIGIN` is a comma-separated allow-list. If left empty in production, backend will allow all origins (not recommended).
> Never commit real tokens/passwords into `.env.production`.

**Frontend** (`frontend/.env.production`):
```env
VITE_USE_MOCK=false
VITE_API_URL=/api
```

### 3. Nginx Configuration

Example nginx config to serve both frontend and backend from one domain:

```nginx
server {
    listen 80;
    server_name chocopix.store;
    include /path/to/deploy/nginx/product-id-redirects.conf;

    location / {
        root /path/to/frontend/dist;
        try_files $uri $uri/ /index.html;
    }

    location /api {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

Generate `product-id-redirects.conf` before deploy:

```bash
npm run redirects:generate
```

This file contains exact-match HTTP `301` redirects from legacy `/product/:id` URLs to canonical `/product/:slug` URLs.

### 4. Start Backend

```bash
cd backend
npm run start
```

Or use PM2 for process management:

```bash
pm2 start deploy/pm2/ecosystem.config.cjs --update-env
pm2 save
pm2 startup
```

### 5. Telegram Setup

The backend sends callback requests to Telegram. Make sure:
1. Bot token is valid
2. Chat ID is correct (bot must be added to the chat/group)

### 6. Post-Deploy Smoke Check

Run a quick API check right after deploy:

```bash
# Local default target
npm run smoke

# Explicit production target
npm run smoke -- https://chocopix.store
```

This validates:
- `GET /api/health`
- `GET /api/np/areas`
