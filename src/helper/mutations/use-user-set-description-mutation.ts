import { UserSetDescriptionInput } from '@serlo/api'
import { gql } from 'graphql-request'

import { showToastNotice } from '../show-toast-notice'
import { mutationFetch } from './helper'
import { useAuthentication } from '@/auth/use-authentication'
import { useLoggedInData } from '@/contexts/logged-in-data-context'

export function useUserSetDescriptionMutation() {
  const auth = useAuthentication()
  const loggedInData = useLoggedInData()

  const mutation = gql`
    mutation setDescription($input: UserSetDescriptionInput!) {
      user {
        setDescription(input: $input) {
          success
        }
      }
    }
  `

  const setDescriptionMutation = async function (input: {
    description: string
  }) {
    const success = await mutationFetch(
      auth,
      mutation,
      input,
      loggedInData?.strings.mutations.errors
    )

    if (success) {
      if (!loggedInData || !auth.current) return
      showToastNotice(loggedInData.strings.mutations.success.save, 'success')
      window.location.href = `/user/${auth.current.id}/${auth.current.username}`
    }

    return success
  }

  return async (input: UserSetDescriptionInput) =>
    await setDescriptionMutation(input)
}
