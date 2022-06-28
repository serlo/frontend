import { gql } from 'graphql-request'

import { mutationFetch } from './helper'
import { useAuthentication } from '@/auth/use-authentication'
import { useLoggedInData } from '@/contexts/logged-in-data-context'
import { EntitySortInput } from '@/fetcher/graphql-types/operations'

export function useEntitySortMutation() {
  const auth = useAuthentication()
  const loggedInData = useLoggedInData()

  const mutation = gql`
    mutation sort($input: EntitySortInput!) {
      entity {
        sort(input: $input) {
          success
        }
      }
    }
  `

  const sortMutation = async function (input: EntitySortInput) {
    const success = await mutationFetch(
      auth,
      mutation,
      input,
      loggedInData?.strings.mutations.errors
    )

    return success
  }
  return async (input: EntitySortInput) => await sortMutation(input)
}
