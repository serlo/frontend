import { gql } from 'graphql-request'

import { useGraphqlSwrWithAuth } from '@/api/use-graphql-swr'

export const isSubscribedQuery = gql`
  query hasSubscribed($id: Int!) {
    subscription {
      currentUserHasSubscribed(id: $id)
    }
  }
`

export function useIsSubscribed(id: number): boolean {
  const { data } = useGraphqlSwrWithAuth<{
    subscription: {
      currentUserHasSubscribed: boolean
    }
  }>({
    query: isSubscribedQuery,
    variables: { id },
    config: {
      refreshInterval: 60 * 60 * 1000, // always refresh for now, maybe use cache in the future
    },
  })

  return data?.subscription.currentUserHasSubscribed || false
}
