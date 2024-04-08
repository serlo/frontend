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

export function useCreateExerciseSubmissionMutation(path: string) {
  const mutationFetch = useMutationFetch()
  const splitPath = path.split('/').filter((p) => p.length > 0)
  const experimentIds = [30680, 23869, 66809]
  const pathContainsExperimentId = splitPath.some((p) =>
    experimentIds.includes(+p)
  )
  if (!pathContainsExperimentId) return () => Promise.resolve()

  return async function (input: ExerciseSubmissionInput) {
    return await mutationFetch(mutation, input)
  }
}
