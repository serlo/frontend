import { gql } from 'graphql-request'

import { useGraphqlSwrWithAuth } from '@/api/use-graphql-swr'

interface UseIsSubscribedReturn {
  isSubscribed: boolean | null
  updateIsSubscribed: (id: number, subscribed: boolean) => void
}

export function useIsSubscribed(id: number): UseIsSubscribedReturn {
  const { data, mutate } = useGraphqlSwrWithAuth<{
    subscription: {
      currentUserHasSubscribed: boolean
    }
  }>({
    query: gql`
      query hasSubscribed($id: Int!) {
        subscription {
          currentUserHasSubscribed(id: $id)
        }
      }
    `,
    variables: { id },
    config: {
      refreshInterval: 60 * 60 * 1000, //60min -> only update on cache mutation
    },
  })

  const mutateSubscription = function (
    id: number,
    currentUserHasSubscribed: boolean
  ) {
    //TODO: use mutation to actually update :)
    void mutate((data) => {
      if (!data) return data
      return { subscription: { currentUserHasSubscribed } }
    }, false) //should not revalidate
  }

  return {
    isSubscribed: data?.subscription.currentUserHasSubscribed || null,
    updateIsSubscribed: mutateSubscription,
  }
}
