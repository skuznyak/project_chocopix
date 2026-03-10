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
