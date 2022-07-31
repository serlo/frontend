import { gql } from 'graphql-request'
import { useSWRConfig, mutate } from 'swr'

import { useMutationFetch } from './use-mutation-fetch'
import { NotificationSetStateInput } from '@/fetcher/graphql-types/operations'

const mutation = gql`
  mutation notificationSetState($input: NotificationSetStateInput!) {
    notification {
      setState(input: $input) {
        success
      }
    }
  }
`

export function useSetNotificationStateMutation() {
  const mutationFetch = useMutationFetch()
  const { cache } = useSWRConfig()

  return async function (input: NotificationSetStateInput) {
    const success = await mutationFetch(mutation, input)

    // note: Maybe implement global cache key management, but this works okay

    if (success) {
      if (!(cache instanceof Map)) {
        throw new Error(
          'matchMutate requires the cache provider to be a Map instance'
        )
      }

      const keys = []

      for (const key of cache.keys() as IterableIterator<string>) {
        const shouldBeMutated =
          (key.startsWith('arg@') &&
            key.indexOf('query notifications($first') > 0 &&
            key.indexOf('"unread":true') > 0) ||
          key.indexOf('notifications(unread: true)') > 0

        if (shouldBeMutated) {
          keys.push(key)
        }
      }

      keys.forEach((key) => {
        void mutate(key)
      })
    }
    return success
  }
}
