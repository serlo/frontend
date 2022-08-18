import { gql } from 'graphql-request'

import { useMutationFetch } from './helper/use-mutation-fetch'
import { useSuccessHandler } from './helper/use-success-handler'
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
  const mutationFetch = useMutationFetch()
  const successHandler = useSuccessHandler()

  return async function (input: EntityUpdateLicenseInput) {
    const success = await mutationFetch(mutation, input)

    return successHandler({
      success,
      toastKey: 'updated',
      redirectUrl: `/${input.entityId}`,
    })
  }
}
