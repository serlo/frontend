import { gql } from 'graphql-request'

import { useGraphqlSwrWithAuth } from '@/api/use-graphql-swr'

interface UseIsSubscribedReturn {
  isSubscribed: boolean | null
  updateIsSubscribed: (id: number, subscribed: boolean) => void
}

export function useIsSubscribed(id: number): UseIsSubscribedReturn {
  const { data, mutate } = useGraphqlSwrWithAuth<{
    subscriptions: {
      nodes: {
        id: number
      }[]
    }
  }>({
    query: gql`
      query {
        subscriptions {
          nodes {
            id
          }
        }
      }
    `,
    config: {
      refreshInterval: 60 * 60 * 1000, //60min -> only update on cache mutation
    },
  })

  const mutateSingleId = function (id: number, subscribed: boolean) {
    void mutate((data) => {
      if (!data) return data
      const nodes = data.subscriptions.nodes.filter((n) => n.id !== id)
      if (subscribed) nodes.push({ id })
      return {
        subscriptions: { nodes },
      }
    }, false) //should not revalidate
  }

  return {
    isSubscribed: data?.subscriptions.nodes.some((n) => n.id === id) ?? null,
    updateIsSubscribed: mutateSingleId,
  }
}
