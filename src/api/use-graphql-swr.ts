import { PageInfo } from '@serlo/api'
import useSWR, {
  ConfigInterface,
  SWRInfiniteConfigInterface,
  useSWRInfinite,
} from 'swr'

import {
  createAuthAwareGraphqlFetch,
  createGraphqlFetch,
} from './graphql-fetch'
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
  return useSWR<T, object>(
    JSON.stringify({ query, variables }),
    createGraphqlFetch(),
    config
  )
}

export function useGraphqlSwrWithAuth<T>({
  query,
  variables,
  config,
  overrideAuth,
}: {
  query: string
  variables?: Record<string, unknown>
  config?: ConfigInterface<T>
  overrideAuth?: ReturnType<typeof useAuth>
}) {
  const auth = useAuth()
  return useSWR<T>(
    JSON.stringify({ query, variables }),
    createAuthAwareGraphqlFetch(overrideAuth ?? auth),
    config
  )
}

export function useGraphqlSwrPaginationWithAuth<T>({
  query,
  variables,
  config,
  getConnection,
  overrideAuth,
}: {
  query: string
  variables?: Record<string, unknown>
  getConnection: (data: Record<string, unknown>) => unknown
  config?: SWRInfiniteConfigInterface
  overrideAuth?: ReturnType<typeof useAuth>
}): {
  loadMore(): void
  loading: boolean
  error?: { message: string }
  data?: {
    nodes: T[]
    pageInfo: PageInfo
  }
} {
  const auth = useAuth()
  const response = useSWRInfinite(
    getKey,
    createAuthAwareGraphqlFetch(overrideAuth ?? auth),
    config
  )

  function getKey(
    pageIndex: number,
    previousResponse: Record<string, unknown> | null
  ) {
    const previousPageData = previousResponse
      ? (getConnection(previousResponse) as { pageInfo: PageInfo })
      : null
    if (previousPageData?.pageInfo.hasNextPage === false) return null

    return JSON.stringify({
      query,
      variables: {
        ...variables,
        after: previousPageData?.pageInfo.endCursor,
      },
    })
  }

  return {
    data:
      response.data === undefined
        ? undefined
        : {
            nodes: ([] as T[]).concat(
              ...response.data.map((data) => {
                return mapResponseToConnection(data).nodes
              })
            ),
            pageInfo: mapResponseToConnection(
              response.data[response.data.length - 1]
            ).pageInfo,
          },
    error: response.error,
    loading: response.isValidating,
    loadMore() {
      if (typeof response.setSize === 'function') {
        void response.setSize((size) => size + 1)
      }
    },
  }

  function mapResponseToConnection(response: Record<string, unknown>) {
    return getConnection(response) as {
      nodes: T[]
      pageInfo: PageInfo
    }
  }
}

export interface ConnectionPayload {
  after?: string | null
  before?: string | null
  first?: number | null
  last?: number | null
}
