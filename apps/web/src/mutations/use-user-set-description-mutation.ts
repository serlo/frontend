import { gql } from 'graphql-request'

import { useMutationFetch } from './helper/use-mutation-fetch'
import { useSuccessHandler } from './helper/use-success-handler'
import { useAuthentication } from '@/auth/use-authentication'
import { UserSetDescriptionInput } from '@/fetcher/graphql-types/operations'

const mutation = gql`
  mutation setDescription($input: UserSetDescriptionInput!) {
    user {
      setDescription(input: $input) {
        success
      }
    }
  }
`

export function useUserSetDescriptionMutation() {
  const auth = useAuthentication()
  const mutationFetch = useMutationFetch()
  const successHandler = useSuccessHandler()

  return async function (input: UserSetDescriptionInput) {
    if (!auth) return
    const success = await mutationFetch(mutation, input)

    return successHandler({
      success,
      toastKey: 'save',
      redirectUrl: `/user/profile/${auth.username}`,
    })
  }
}
