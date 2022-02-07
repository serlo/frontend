import { PageInfo } from '@serlo/api'
import useSWR, { SWRConfiguration } from 'swr'
// eslint-disable-next-line import/no-internal-modules
import useSWRInfinite, { SWRInfiniteConfiguration } from 'swr/infinite'

import {
  createAuthAwareGraphqlFetch,
  createGraphqlFetch,
} from './graphql-fetch'
import { useAuthentication } from '@/auth/use-authentication'

export function useGraphqlSwr<T>({
  query,
  variables,
  config,
  noKey,
}: {
  query: string
  variables?: Record<string, unknown>
  config?: SWRConfiguration<T>
  noKey?: boolean
}) {
  return useSWR<T, object>(
    noKey ? null : JSON.stringify({ query, variables }),
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
  config?: SWRConfiguration<T>
  overrideAuth?: ReturnType<typeof useAuthentication>
}) {
  const auth = useAuthentication()
  return useSWR<T>(
    JSON.stringify({ query, variables }),
    createAuthAwareGraphqlFetch(overrideAuth ?? auth),
    config
  )
}

interface UseGraphqlSwrPaginationData {
  query: string
  variables?: Record<string, unknown>
  getConnection: (data: Record<string, unknown>) => unknown
  config?: SWRInfiniteConfiguration
  noAuth?: boolean
  overrideAuth?: ReturnType<typeof useAuthentication>
  noKey?: boolean
}

interface UseGraphqlSwrPaginationReturn<T> {
  loadMore(): void
  loading: boolean
  error?: { message: string }
  data?: {
    nodes: T[]
    pageInfo: PageInfo
    totalCount?: number
  }
}

export function useGraphqlSwrPaginationWithAuth<T>(
  data: UseGraphqlSwrPaginationData
): UseGraphqlSwrPaginationReturn<T> {
  const {
    query,
    variables,
    config,
    getConnection,
    noAuth,
    overrideAuth,
    noKey,
  } = data
  const auth = useAuthentication()
  const response = useSWRInfinite<
    Record<string, unknown>,
    { message: string } | undefined
  >(
    getKey,
    noAuth
      ? createGraphqlFetch()
      : createAuthAwareGraphqlFetch(overrideAuth ?? auth),
    config
  )

  function getKey(
    _pageIndex: number,
    previousResponse: Record<string, unknown> | null
  ) {
    if (noKey) return null
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
      response.data === undefined || !Array.isArray(response.data)
        ? undefined
        : {
            ...response.data,
            nodes: ([] as T[]).concat(
              ...response.data.map((data) => {
                return mapResponseToConnection(data).nodes
              })
            ),
            pageInfo: mapResponseToConnection(
              response.data[response.data.length - 1]
            ).pageInfo,
            totalCount: mapResponseToConnection(
              response.data[response.data.length - 1]
            ).totalCount,
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
      totalCount?: number
    }
  }
}

export interface ConnectionPayload {
  after?: string | null
  before?: string | null
  first?: number | null
  last?: number | null
}
