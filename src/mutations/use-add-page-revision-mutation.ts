import { gql } from 'graphql-request'

import { showToastNotice } from '../helper/show-toast-notice'
import { useMutationFetch } from './helper/use-mutation-fetch'
import { useSuccessHandler } from './helper/use-success-handler'
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
  const successHandler = useSuccessHandler()

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

      return successHandler({
        success,
        toastKey: 'save',
        redirectUrl: `/${data.id}`,
        useHardRedirect: true,
      })
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('probably missing value?')
      return false
    }
  }
}
