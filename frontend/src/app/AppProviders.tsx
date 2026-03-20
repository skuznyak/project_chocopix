import type { PropsWithChildren } from 'react'
import { HydrationBoundary, QueryClient, QueryClientProvider, type DehydratedState } from '@tanstack/react-query'
import { HelmetProvider } from 'react-helmet-async'

interface AppProvidersProps extends PropsWithChildren {
  helmetContext?: object
  queryClient: QueryClient
  dehydratedState?: DehydratedState
}

export const AppProviders = ({ children, helmetContext, queryClient, dehydratedState }: AppProvidersProps) => (
  <HelmetProvider context={helmetContext}>
    <QueryClientProvider client={queryClient}>
      <HydrationBoundary state={dehydratedState}>{children}</HydrationBoundary>
    </QueryClientProvider>
  </HelmetProvider>
)
