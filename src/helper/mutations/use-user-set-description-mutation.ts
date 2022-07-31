import { gql } from 'graphql-request'

import { showToastNotice } from '../show-toast-notice'
import { useMutationFetch } from './use-mutation-fetch'
import { useAuthentication } from '@/auth/use-authentication'
import { useLoggedInData } from '@/contexts/logged-in-data-context'
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
  const loggedInData = useLoggedInData()
  const mutationFetch = useMutationFetch()

  return async function (input: UserSetDescriptionInput) {
    const success = await mutationFetch(mutation, input)

    if (success) {
      if (!loggedInData || !auth.current) return
      showToastNotice(loggedInData.strings.mutations.success.save, 'success')
      window.location.href = `/user/${auth.current.id}/${auth.current.username}`
    }

    return success
  }
}
