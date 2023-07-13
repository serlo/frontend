import { gql } from 'graphql-request'
import { mutate } from 'swr'

import { useMutationFetch } from './helper/use-mutation-fetch'
import { useSuccessHandler } from './helper/use-success-handler'
import { isSubscribedQuery } from '../helper/use-is-subscribed'
import { SubscriptionSetInput } from '@/fetcher/graphql-types/operations'

export function useSubscriptionSetMutation() {
  const mutationFetch = useMutationFetch()
  const successHandler = useSuccessHandler()

  const mutation = gql`
    mutation subscriptionSet($input: SubscriptionSetInput!) {
      subscription {
        set(input: $input) {
          success
        }
      }
    }
  `

  return async function (input: SubscriptionSetInput) {
    const success = await mutationFetch(mutation, input)

    // note: Reconstructing SWR keys here, we need a nice global solution how we handle SWR keys
    // see https://swr.vercel.app/docs/arguments and useGraphqlSwr(WithAuth)

    if (success) {
      await mutate(
        JSON.stringify({
          query: isSubscribedQuery,
          variables: { id: input.id[0] },
        })
      )

      return successHandler({
        success,
        toastKey: 'generic',
      })
    }
    return success
  }
}
