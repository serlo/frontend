import { gql } from 'graphql-request'

import { useMutationFetch } from './helper/use-mutation-fetch'
import { useSuccessHandler } from './helper/use-success-handler'
import { getRequiredString } from './use-set-entity-mutation/use-set-entity-mutation'
import { showToastNotice } from '../helper/show-toast-notice'
import { useAuthentication } from '@/auth/use-authentication'
import { useInstanceData } from '@/contexts/instance-context'
import { useLoggedInData } from '@/contexts/logged-in-data-context'
import { PageSerializedState } from '@/serlo-editor-integration/editor-response-to-state'

const addMutation = gql`
  mutation addPageRevision($input: PageAddRevisionInput!) {
    page {
      addRevision(input: $input) {
        success
      }
    }
  }
`

const createMutation = gql`
  mutation createPage($input: CreatePageInput!) {
    page {
      create(input: $input) {
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
  const { lang } = useInstanceData()

  return async (data: PageSerializedState) => {
    if (!auth || !loggedInData) {
      showToastNotice('Please make sure you are logged in!', 'warning')
      return false
    }
    const mutationStrings = loggedInData.strings.mutations

    try {
      const sharedInput = {
        content: getRequiredString(mutationStrings, 'content', data.content),
        title: getRequiredString(mutationStrings, 'title', data.title),
      }

      if (data.id) {
        // change on existing page
        const success = await mutationFetch(addMutation, {
          ...sharedInput,
          pageId: data.id,
        })

        return successHandler({
          success,
          toastKey: 'save',
          redirectUrl: `/${data.id}`,
        })
      } else {
        // create new page
        const success = await mutationFetch(createMutation, {
          ...sharedInput,
          discussionsEnabled: false,
          instance: lang,
          licenseId: 1,
        })

        return successHandler({
          success,
          toastKey: 'save',
          redirectUrl: `/pages`,
          useHardRedirect: true,
        })
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('probably missing value?')
      return false
    }
  }
}
