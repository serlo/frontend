import { gql } from 'graphql-request'

import { showToastNotice } from '../helper/show-toast-notice'
import { useMutationFetch } from './use-mutation-fetch'
import { AddPageRevisionMutationData } from './use-set-entity-mutation/types'
import { getRequiredString } from './use-set-entity-mutation/use-set-entity-mutation'
import { useAuthentication } from '@/auth/use-authentication'
import { useLoggedInData } from '@/contexts/logged-in-data-context'
import { UuidType } from '@/data-types'

const addPageRevisionMutation = gql`
  mutation addPageRevision($input: PageAddRevisionInput!) {
    page {
      addRevision(input: $input) {
        success
      }
    }
  }
`

export function useAddPageRevision() {
  const auth = useAuthentication()
  const loggedInData = useLoggedInData()
  const mutationFetch = useMutationFetch()

  return async (data: AddPageRevisionMutationData) => {
    if (!auth || !loggedInData) {
      showToastNotice('Please make sure you are logged in!', 'warning')
      return false
    }
    if (!data.__typename || data.__typename !== UuidType.Page) return false

    try {
      const input = {
        content: getRequiredString(loggedInData, 'content', data.content),
        pageId: data.id,
        title: getRequiredString(loggedInData, 'title', data.title),
      }

      const success = await mutationFetch(addPageRevisionMutation, input)

      if (success) {
        showToastNotice(loggedInData.strings.mutations.success.save, 'success')
        window.location.href = `/${data.id}`
        return true
      }
      return false
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('probably missing value?')
      return false
    }
  }
}
