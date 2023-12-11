import { gql } from 'graphql-request'

import { useGraphqlSwrWithAuth } from '@/api/use-graphql-swr'
import { IsSubscribedQuery } from '@/fetcher/graphql-types/operations'

export const isSubscribedQuery = gql`
  query isSubscribed($id: Int!) {
    subscription {
      currentUserHasSubscribed(id: $id)
    }
  }
`

export function useIsSubscribed(id: number): boolean {
  const { data } = useGraphqlSwrWithAuth<IsSubscribedQuery>({
    query: isSubscribedQuery,
    variables: { id },
    config: {
      refreshInterval: 60 * 60 * 1000,
    },
  })

  return data?.subscription.currentUserHasSubscribed || false
}
