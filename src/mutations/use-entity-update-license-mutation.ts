import { gql } from 'graphql-request'
import { useRouter } from 'next/router'

import { showToastNotice } from '../helper/show-toast-notice'
import { useMutationFetch } from './use-mutation-fetch'
import { useLoggedInData } from '@/contexts/logged-in-data-context'
import { EntityUpdateLicenseInput } from '@/fetcher/graphql-types/operations'

const mutation = gql`
  mutation updateLicense($input: EntityUpdateLicenseInput!) {
    entity {
      updateLicense(input: $input) {
        success
      }
    }
  }
`

export function useEntityUpdateLicenseMutation() {
  const loggedInData = useLoggedInData()
  const mutationFetch = useMutationFetch()
  const router = useRouter()

  return async function (input: EntityUpdateLicenseInput) {
    const success = await mutationFetch(mutation, input)

    if (success) {
      if (!loggedInData) return
      showToastNotice(loggedInData.strings.mutations.success.updated, 'success')
      setTimeout(() => {
        void router.push(`/${input.entityId}`)
      }, 500)
    }
    return success
  }
}
