import useSWR, { ConfigInterface } from 'swr'

import { createAuthAwareGraphqlFetch } from './graphql-fetch'
import { useAuth } from '@/auth/use-auth'

export function useGraphqlSwr<T>({
  query,
  variables,
  config,
}: {
  query: string
  variables?: Record<string, unknown>
  config?: ConfigInterface<T>
}) {
  const auth = useAuth()
  return useSWR<T>(
    JSON.stringify({ query, variables }),
    createAuthAwareGraphqlFetch(auth),
    config
  )
}
