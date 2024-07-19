import { gql } from 'graphql-request'
import NProgress from 'nprogress'

import { getAliasById, revalidatePath } from './helper/revalidate-path'
import { useMutationFetch } from './helper/use-mutation-fetch'
import { useSuccessHandler } from './helper/use-success-handler'
import { RejectRevisionInput } from '@/fetcher/graphql-types/operations'

export type RevisionMutationMode = 'checkout' | 'reject'

const rejectEntityMutation = gql`
  mutation rejectRevision($input: RejectRevisionInput!) {
    entity {
      rejectRevision(input: $input) {
        success
      }
    }
  }
`
const checkoutEntityMutation = gql`
  mutation checkoutRevision($input: CheckoutRevisionInput!) {
    entity {
      checkoutRevision(input: $input) {
        success
      }
    }
  }
`

export function useRevisionDecideMutation() {
  const mutationFetch = useMutationFetch()
  const successHandler = useSuccessHandler()

  return async function (
    mode: RevisionMutationMode,
    input: RejectRevisionInput
  ) {
    const isCheckout = mode === 'checkout'
    const mutation = isCheckout ? checkoutEntityMutation : rejectEntityMutation
    NProgress.start()

    // persist current alias here since it might change on mutation
    const oldAlias = await getAliasById(input.revisionId)
    const success = await mutationFetch(mutation, input)
    if (oldAlias) await revalidatePath(oldAlias)

    return successHandler({
      success,
      toastKey: isCheckout ? 'accept' : 'reject',
      redirectUrl:
        sessionStorage.getItem('previousPathname') || '/entity/unrevised',
      delay: 100,
      stopNProgress: true,
      useHardRedirect: true, // soft redirect is not refreshing page
    })
  }
}
