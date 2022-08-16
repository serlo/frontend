import { gql } from 'graphql-request'

import { useMutationFetch } from './helper/use-mutation-fetch'
import { EntitySortInput } from '@/fetcher/graphql-types/operations'

const mutation = gql`
  mutation sort($input: EntitySortInput!) {
    entity {
      sort(input: $input) {
        success
      }
    }
  }
`

export function useEntitySortMutation() {
  const mutationFetch = useMutationFetch()

  return async function (input: EntitySortInput) {
    return await mutationFetch(mutation, input)
  }
}
