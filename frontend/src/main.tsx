import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { App } from '@/App'
import { AppProviders } from '@/app/AppProviders'
import { createQueryClient } from '@/app/createQueryClient'
import '@/index.css'

const queryClient = createQueryClient()
const dehydratedState = window.__PRERENDER_QUERY_STATE__
const app = (
  <React.StrictMode>
    <AppProviders queryClient={queryClient} dehydratedState={dehydratedState}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </AppProviders>
  </React.StrictMode>
)
const container = document.getElementById('root')!

if (container.hasChildNodes()) {
  ReactDOM.hydrateRoot(container, app)
} else {
  ReactDOM.createRoot(container).render(app)
}
