import { gql } from 'graphql-request'

import { useMutationFetch } from '../helper/use-mutation-fetch'
import { AbSubmissionInput } from '@/fetcher/graphql-types/operations'

const mutation = gql`
  mutation createAbSubmission($input: AbSubmissionInput!) {
    experiment {
      createAbSubmission(input: $input) {
        success
      }
    }
  }
`

export function useCreateAbSubmissionMutation() {
  const mutationFetch = useMutationFetch()

  return async function (input: AbSubmissionInput) {
    return await mutationFetch(mutation, input)
  }
}
