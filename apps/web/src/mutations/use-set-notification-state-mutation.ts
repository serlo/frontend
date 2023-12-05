import { gql } from 'graphql-request'

import { useMutationFetch } from './helper/use-mutation-fetch'
import { useSWRCacheMutate } from './helper/use-swr-cache-mutate'
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
  const mutateSWRCache = useSWRCacheMutate()

  return async function (input: NotificationSetStateInput) {
    const success = await mutationFetch(mutation, input)

    // not very elegant and cache names could change in the future,
    // but for now it works quite well

    mutateSWRCache((key: string) => {
      return (
        (key.startsWith('arg@') &&
          key.indexOf('query notifications($first') > 0 &&
          key.indexOf('"unread":true') > 0) ||
        key.indexOf('notifications(unread: true)') > 0
      )
    })
    return success
  }
}
