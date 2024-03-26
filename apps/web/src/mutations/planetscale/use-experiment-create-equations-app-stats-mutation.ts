import { gql } from 'graphql-request'

import { useMutationFetch } from '../helper/use-mutation-fetch'
import { EquationsAppStatsInput } from '@/fetcher/graphql-types/operations'

const mutation = gql`
  mutation createEquationsAppStats($input: EquationsAppStatsInput!) {
    experiment {
      createEquationsAppStats(input: $input) {
        success
      }
    }
  }
`

export function useCreateEquationsAppStatsMutation() {
  const mutationFetch = useMutationFetch()

  return async function (input: EquationsAppStatsInput) {
    return await mutationFetch(mutation, input)
  }
}
