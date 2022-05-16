import { gql } from 'graphql-request'

import { showToastNotice } from '../show-toast-notice'
import { mutationFetch } from './helper'
import { AddPageRevisionMutationData } from './use-set-entity-mutation/types'
import { getRequiredString } from './use-set-entity-mutation/use-set-entity-mutation'
import { useAuthentication } from '@/auth/use-authentication'
import { useLoggedInData } from '@/contexts/logged-in-data-context'

export function useAddPageRevision() {
  const auth = useAuthentication()
  const loggedInData = useLoggedInData()

  return async (data: AddPageRevisionMutationData) => {
    if (!auth || !loggedInData) {
      showToastNotice('Please make sure you are logged in!', 'warning')
      return false
    }
    if (!data.__typename || data.__typename !== 'Page') return false

    try {
      const input = {
        content: getRequiredString(loggedInData, 'content', data.content),
        pageId: data.id,
        title: getRequiredString(loggedInData, 'title', data.title),
      }

      const success = await mutationFetch(
        auth,
        addPageRevisionMutation,
        input,
        loggedInData?.strings.mutations.errors
      )

      if (success) {
        showToastNotice(loggedInData.strings.mutations.success.save, 'success')
        window.location.href = `/entity/repository/history/${data.id}`
        return true
      }
      return false
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log('probably missing value?')
      return false
    }
  }
}

const addPageRevisionMutation = gql`
  mutation addPageRevision($input: PageAddRevisionInput!) {
    page {
      addRevision(input: $input) {
        success
      }
    }
  }
`
