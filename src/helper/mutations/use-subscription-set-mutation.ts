import { SubscriptionSetInput } from '@serlo/api'
import { gql } from 'graphql-request'
import { mutate } from 'swr'

import { isSubscribedQuery } from '../use-is-subscribed'
import { mutationFetch } from './helper'
import { useAuthentication } from '@/auth/use-authentication'
import { useLoggedInData } from '@/contexts/logged-in-data-context'

export function useSubscriptionSetMutation() {
  const auth = useAuthentication()
  const loggedInData = useLoggedInData()

  const mutation = gql`
    mutation subscriptionSet($input: SubscriptionSetInput!) {
      subscription {
        set(input: $input) {
          success
        }
      }
    }
  `

  const subscriptionSetMutation = async function (input: SubscriptionSetInput) {
    const success = await mutationFetch(
      auth,
      mutation,
      input,
      loggedInData?.strings.mutations.errors
    )

    // note: Reconstructing SWR keys here, we need a nice global solution how we handle SWR keys
    // see https://swr.vercel.app/docs/arguments and useGraphqlSwr(WithAuth)

    if (success) {
      await mutate(
        JSON.stringify({
          query: isSubscribedQuery,
          variables: { id: input.id[0] },
        })
      )
      // deactivated in favour of optimistic ui and automatic revalidations
      // const keys = cache
      //   .keys()
      //   .filter((key) => key.includes('query subscription'))

      // keys.forEach((key) => {
      //   void mutate(key)
      // })
    }
    return success
  }

  return async (input: SubscriptionSetInput) =>
    await subscriptionSetMutation(input)
}
