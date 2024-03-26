import { gql } from 'graphql-request'

import { useMutationFetch } from '../helper/use-mutation-fetch'
import { QuickbarStatsInput } from '@/fetcher/graphql-types/operations'

const mutation = gql`
  mutation createQuickbarStats($input: QuickbarStatsInput!) {
    experiment {
      createQuickbarStats(input: $input) {
        success
      }
    }
  }
`

export function useCreateQuickbarStatsMutation() {
  const mutationFetch = useMutationFetch()

  return async function (input: QuickbarStatsInput) {
    return await mutationFetch(mutation, input)
  }
}
