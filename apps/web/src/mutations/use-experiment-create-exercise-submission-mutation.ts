import { gql } from 'graphql-request'

import { useMutationFetch } from './helper/use-mutation-fetch'
import { ExerciseSubmissionInput } from '@/fetcher/graphql-types/operations'

const mutation = gql`
  mutation createExerciseSubmission($input: ExerciseSubmissionInput!) {
    experiment {
      createExerciseSubmission(input: $input) {
        success
      }
    }
  }
`

export function useCreateExerciseSubmissionMutation() {
  const mutationFetch = useMutationFetch()

  return async function (input: ExerciseSubmissionInput) {
    return await mutationFetch(mutation, input)
  }
}
