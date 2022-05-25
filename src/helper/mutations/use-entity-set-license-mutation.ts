import { EntitySetLicenseInput } from '@serlo/api'
import { gql } from 'graphql-request'
import { useRouter } from 'next/router'

import { showToastNotice } from '../show-toast-notice'
import { mutationFetch } from './helper'
import { useAuthentication } from '@/auth/use-authentication'
import { useLoggedInData } from '@/contexts/logged-in-data-context'

export function useEntitySetLicenseMutation() {
  const auth = useAuthentication()
  const loggedInData = useLoggedInData()
  const router = useRouter()
  const mutation = gql`
    mutation setLicense($input: EntitySetLicenseInput!) {
      entity {
        setLicense(input: $input) {
          success
        }
      }
    }
  `

  const setLicenseMutation = async function (input: EntitySetLicenseInput) {
    const success = await mutationFetch(
      auth,
      mutation,
      input,
      loggedInData?.strings.mutations.errors
    )

    if (success) {
      if (!loggedInData) return
      showToastNotice(loggedInData.strings.mutations.success.updated, 'success')

      setTimeout(() => {
        void router.push(`/${input.entityId}`)
      }, 500)
    }
    return success
  }
  return async (input: EntitySetLicenseInput) => await setLicenseMutation(input)
}
