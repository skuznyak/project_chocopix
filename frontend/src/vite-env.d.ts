/// <reference types="vite/client" />

interface Window {
  __PRERENDER_QUERY_STATE__?: import('@tanstack/react-query').DehydratedState
}
