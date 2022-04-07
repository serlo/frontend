import { UuidSetStateInput } from '@serlo/api'
import { gql } from 'graphql-request'

import { csrReload } from '../csr-reload'
import { showToastNotice } from '../show-toast-notice'
import { mutationFetch } from './helper'
import { useAuthentication } from '@/auth/use-authentication'
import { useLoggedInData } from '@/contexts/logged-in-data-context'

export function useSetUuidStateMutation() {
  const auth = useAuthentication()
  const loggedInData = useLoggedInData()

  const mutation = gql`
    mutation setUuidState($input: UuidSetStateInput!) {
      uuid {
        setState(input: $input) {
          success
        }
      }
    }
  `

  const setUuidStateMutation = async function (input: UuidSetStateInput) {
    const success = await mutationFetch(
      auth,
      mutation,
      input,
      loggedInData?.strings.mutations.errors
    )

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
  return async (input: UuidSetStateInput) => await setUuidStateMutation(input)
}
