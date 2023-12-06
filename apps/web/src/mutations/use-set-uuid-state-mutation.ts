import { gql } from 'graphql-request'

import { useMutationFetch } from './helper/use-mutation-fetch'
import { useSuccessHandler } from './helper/use-success-handler'
import { csrReload } from '../helper/csr-reload'
import { UuidSetStateInput } from '@/fetcher/graphql-types/operations'

const mutation = gql`
  mutation setUuidState($input: UuidSetStateInput!) {
    uuid {
      setState(input: $input) {
        success
      }
    }
  }
`

export function useSetUuidStateMutation() {
  const mutationFetch = useMutationFetch()
  const successHandler = useSuccessHandler()

  return async function (input: UuidSetStateInput) {
    const success = await mutationFetch(mutation, input)

    if (success) {
      setTimeout(() => {
        csrReload()
      }, 3000)
      return successHandler({
        success,
        toastKey: input.trashed ? 'trash' : 'restore',
        delay: 600,
      })
    }
  }
}
