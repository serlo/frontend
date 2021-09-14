import {
  CheckoutRevisionInput,
  NotificationMutation,
  NotificationSetStateInput,
  RejectRevisionInput,
  SubscriptionSetInput,
  ThreadCreateCommentInput,
  ThreadCreateThreadInput,
  ThreadMutation,
  ThreadSetCommentStateInput,
  ThreadSetThreadArchivedInput,
  ThreadSetThreadStateInput,
  UuidMutation,
  UuidSetStateInput,
} from '@serlo/api'
import { GraphQLError } from 'graphql'
import { ClientError, gql, GraphQLClient } from 'graphql-request'
import { useRouter } from 'next/router'
import NProgress from 'nprogress'
import { RefObject } from 'react'
import { mutate, cache } from 'swr'

import { csrReload } from './csr-reload'
import { showToastNotice } from './show-toast-notice'
import { triggerSentry } from './trigger-sentry'
import { isSubscribedQuery } from './use-is-subscribed'
import { endpoint } from '@/api/endpoint'
import { AuthenticationPayload } from '@/auth/auth-provider'
import { useAuthentication } from '@/auth/use-authentication'
import { useEntityId } from '@/contexts/entity-id-context'

export function useSetUuidStateMutation() {
  const auth = useAuthentication()
  const mutation = gql`
    mutation setUuidState($input: UuidSetStateInput!) {
      uuid {
        setState(input: $input) {
          success
        }
      }
    }
  `

  const setUuidStateMutation = async function (input: UuidSetStateInput) {
    const success = await mutationFetch(auth, mutation, input)

    if (success) {
      setTimeout(() => {
        showToastNotice(
          `✨ Erfolgreich ${input.trashed ? 'gelöscht' : 'wiederhergestellt'}.`,
          'success'
        )
      }, 600)
      setTimeout(() => {
        csrReload()
      }, 3000)
    }
    return success
  }
  return async (input: UuidSetStateInput) => await setUuidStateMutation(input)
}

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
const checkoutPageMutation = gql`
  mutation checkoutPageRevision($input: CheckoutRevisionInput!) {
    page {
      checkoutRevision(input: $input) {
        success
      }
    }
  }
`

export function useRevisionMutation() {
  const auth = useAuthentication()
  const router = useRouter()

  const revisionMutation = async function (
    mode: RevisionMutationMode,
    input: RejectRevisionInput,
    isPage: boolean
  ) {
    const isCheckout = mode === 'checkout'
    const mutation = isPage
      ? checkoutPageMutation
      : isCheckout
      ? checkoutEntityMutation
      : rejectEntityMutation
    NProgress.start()
    const success = await mutationFetch(auth, mutation, input)

    if (success) {
      setTimeout(() => {
        showToastNotice(
          `✨ Überarbeitung wurde ${isCheckout ? 'angenommen' : 'abgelehnt'}.`,
          'success'
        )
      }, 200)
      setTimeout(() => {
        NProgress.done()
        void router.push('/entity/unrevised')
      }, 3000)
    }
    return success
  }
  return async (
    mode: RevisionMutationMode,
    input: RejectRevisionInput | CheckoutRevisionInput,
    isPage: boolean
  ) => await revisionMutation(mode, input, isPage)
}

export function useSetNotificationStateMutation() {
  const auth = useAuthentication()
  const mutation = gql`
    mutation setState($input: NotificationSetStateInput!) {
      notification {
        setState(input: $input) {
          success
        }
      }
    }
  `

  const setNotificationStateMutation = async function (
    input: NotificationSetStateInput
  ) {
    const success = await mutationFetch(auth, mutation, input)

    // note: Maybe implement global cache key management, but this works okay

    if (success) {
      const keys = cache.keys().filter(
        (key) =>
          (key.startsWith('arg@') &&
            key.indexOf('query notifications($first') > 0 &&
            key.indexOf('"unread":true') > 0) ||
          key.indexOf('notifications(unread: true)') > 0 // update count
      )

      keys.forEach((key) => {
        void mutate(key)
      })
    }
    return success
  }
  return async (input: NotificationSetStateInput) =>
    await setNotificationStateMutation(input)
}

export function useThreadArchivedMutation() {
  const auth = useAuthentication()
  const entityId = useEntityId()
  const mutation = gql`
    mutation setState($input: ThreadSetThreadArchivedInput!) {
      thread {
        setThreadArchived(input: $input) {
          success
        }
      }
    }
  `

  const setThreadArchivedMutation = async function (
    input: ThreadSetThreadArchivedInput
  ) {
    NProgress.start()

    const success = await mutationFetch(auth, mutation, input)

    if (success) {
      await mutate(`comments::${entityId}`)
      NProgress.done()
    }
    return success
  }

  return async (input: ThreadSetThreadArchivedInput) =>
    await setThreadArchivedMutation(input)
}

export function useSetThreadStateMutation() {
  const auth = useAuthentication()
  const entityId = useEntityId()
  const mutation = gql`
    mutation setState($input: ThreadSetThreadStateInput!) {
      thread {
        setThreadState(input: $input) {
          success
        }
      }
    }
  `

  const setThreadStateMutation = async function (
    input: ThreadSetThreadStateInput
  ) {
    const success = await mutationFetch(auth, mutation, input)

    if (success) await mutate(`comments::${entityId}`)
    return success
  }

  return async (input: ThreadSetThreadStateInput) =>
    await setThreadStateMutation(input)
}

export function useSetCommentStateMutation() {
  const auth = useAuthentication()
  const entityId = useEntityId()
  const mutation = gql`
    mutation setState($input: ThreadSetCommentStateInput!) {
      thread {
        setCommentState(input: $input) {
          success
        }
      }
    }
  `

  const setCommentStateMutation = async function (
    input: ThreadSetCommentStateInput
  ) {
    const success = await mutationFetch(auth, mutation, input)

    if (success) await mutate(`comments::${entityId}`)
    return success
  }

  return async (input: ThreadSetCommentStateInput) =>
    await setCommentStateMutation(input)
}

export function useCreateThreadMutation() {
  const auth = useAuthentication()
  const mutation = gql`
    mutation createThread($input: ThreadCreateThreadInput!) {
      thread {
        createThread(input: $input) {
          success
        }
      }
    }
  `

  const createThreadMutation = async function (input: ThreadCreateThreadInput) {
    const success = await mutationFetch(auth, mutation, input)

    if (success) await mutate(`comments::${input.objectId}`)
    return success
  }

  return async (input: ThreadCreateThreadInput) =>
    await createThreadMutation(input)
}

export function useCreateCommentMutation() {
  const auth = useAuthentication()
  const entityId = useEntityId()
  const mutation = gql`
    mutation createComment($input: ThreadCreateCommentInput!) {
      thread {
        createComment(input: $input) {
          success
        }
      }
    }
  `

  const createCommentMutation = async function (
    input: ThreadCreateCommentInput
  ) {
    const success = await mutationFetch(auth, mutation, input)

    if (success) await mutate(`comments::${entityId}`)
    return success
  }

  return async (input: ThreadCreateCommentInput) =>
    await createCommentMutation(input)
}

export function useSubscriptionSetMutation() {
  const auth = useAuthentication()

  const mutation = gql`
    mutation subscriptionSet($input: SubscriptionSetInput!) {
      subscription {
        set(input: $input) {
          success
        }
      }
    }
  `

  const subscriptionSetMutation = async function (input: SubscriptionSetInput) {
    const success = await mutationFetch(auth, mutation, input)

    // note: Reconstructing SWR keys here, we need a nice global solution how we handle SWR keys
    // see https://swr.vercel.app/docs/arguments and useGraphqlSwr(WithAuth)

    if (success) {
      await mutate(
        JSON.stringify({
          query: isSubscribedQuery,
          variables: { id: input.id[0] },
        })
      )
      // deactivated in favour of optimistic ui and automatic revalidations
      // const keys = cache
      //   .keys()
      //   .filter((key) => key.includes('query subscription'))

      // keys.forEach((key) => {
      //   void mutate(key)
      // })
    }
    return success
  }

  return async (input: SubscriptionSetInput) =>
    await subscriptionSetMutation(input)
}

type MutationInput =
  | NotificationSetStateInput
  | UuidSetStateInput
  | ThreadCreateThreadInput
  | ThreadSetThreadArchivedInput
  | ThreadSetThreadStateInput
  | ThreadSetCommentStateInput
  | ThreadCreateCommentInput
  | SubscriptionSetInput
  | RejectRevisionInput
  | CheckoutRevisionInput

type MutationResponse = ThreadMutation | UuidMutation | NotificationMutation

type ApiErrorType = 'UNAUTHENTICATED' | 'FORBIDDEN' | 'INVALID_TOKEN'
type ErrorType = ApiErrorType | 'UNKNOWN'

export interface ApiError extends GraphQLError {
  extensions: {
    code: ApiErrorType
  }
}

export async function mutationFetch(
  auth: RefObject<AuthenticationPayload>,
  query: string,
  input: MutationInput,
  isRetry?: boolean
): Promise<boolean> {
  if (auth.current === null) return handleError('UNAUTHENTICATED')

  const usedToken = auth.current.token
  try {
    const result = await executeQuery()
    return !!result
  } catch (e) {
    const error = (e as ClientError).response?.errors?.[0] as
      | ApiError
      | undefined

    const type = error ? error.extensions.code : 'UNKNOWN'

    if (type === 'INVALID_TOKEN' && !isRetry) {
      await auth.current.refreshToken(usedToken)
      return await mutationFetch(auth, query, input, true)
    }

    return handleError(type)
  }

  async function executeQuery(): Promise<MutationResponse> {
    const client = new GraphQLClient(endpoint, {
      headers: auth.current
        ? {
            Authorization: `Bearer ${auth.current.token}`,
          }
        : {},
    })
    return client.request(query, { input })
  }
}

function handleError(type: ErrorType, e?: object): false {
  const message =
    type == 'UNAUTHENTICATED'
      ? 'Für diese Funktion musst du dich einloggen!'
      : type == 'FORBIDDEN'
      ? 'Dafür fehlen dir leider die Rechte!'
      : 'Ein unbekannter Fehler…'

  if (type == 'UNKNOWN') {
    // eslint-disable-next-line no-console
    console.log(e)
    triggerSentry({ message: 'Unknown API error' })
  }

  if (type == 'UNAUTHENTICATED') {
    csrReload()
  }

  showToastNotice(message, 'warning')
  return false
}
