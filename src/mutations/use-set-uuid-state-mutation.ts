import { gql } from 'graphql-request'

import { csrReload } from '../helper/csr-reload'
import { showToastNotice } from '../helper/show-toast-notice'
import { useMutationFetch } from './use-mutation-fetch'
import { useLoggedInData } from '@/contexts/logged-in-data-context'
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
  const loggedInData = useLoggedInData()
  const mutationFetch = useMutationFetch()

  return async function (input: UuidSetStateInput) {
    const success = await mutationFetch(mutation, input)

    if (success) {
      setTimeout(() => {
        if (!loggedInData) return
        showToastNotice(
          loggedInData.strings.mutations.success[
            input.trashed ? 'trash' : 'restore'
          ],
          'success'
        )
      }, 600)
      setTimeout(() => {
        csrReload()
      }, 3000)
    }
    return success
  }
}
