import { EntityUpdateLicenseInput } from '@serlo/api'
import { gql } from 'graphql-request'

import { showToastNotice } from '../show-toast-notice'
import { mutationFetch } from './helper'
import { useAuthentication } from '@/auth/use-authentication'
import { useLoggedInData } from '@/contexts/logged-in-data-context'

export function useEntityUpdateLicenseMutation() {
  const auth = useAuthentication()
  const loggedInData = useLoggedInData()

  const mutation = gql`
    mutation updateLicense($input: EntityUpdateLicenseInput!) {
      entity {
        updateLicense(input: $input) {
          success
        }
      }
    }
  `

  const updateLicenseMutation = async function (
    input: EntityUpdateLicenseInput
  ) {
    const success = await mutationFetch(
      auth,
      mutation,
      input,
      loggedInData?.strings.mutations.errors
    )

    if (success) {
      if (!loggedInData) return
      showToastNotice(loggedInData.strings.mutations.success.updated, 'success')
    }
    return success
  }
  return async (input: EntityUpdateLicenseInput) =>
    await updateLicenseMutation(input)
}
