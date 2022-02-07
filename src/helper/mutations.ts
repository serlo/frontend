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
  UserDeleteBotsInput,
  UuidMutation,
  UuidSetStateInput,
} from '@serlo/api'
import { GraphQLError } from 'graphql'
import { ClientError, gql, GraphQLClient } from 'graphql-request'
import { useRouter } from 'next/router'
import NProgress from 'nprogress'
import { RefObject } from 'react'
import { useSWRConfig, mutate } from 'swr'

import { csrReload } from './csr-reload'
import { showToastNotice } from './show-toast-notice'
import { triggerSentry } from './trigger-sentry'
import { isSubscribedQuery } from './use-is-subscribed'
import { endpoint } from '@/api/endpoint'
import { AuthenticationPayload } from '@/auth/auth-provider'
import { useAuthentication } from '@/auth/use-authentication'
import { useEntityId } from '@/contexts/entity-id-context'
import { useLoggedInData } from '@/contexts/logged-in-data-context'

export function useSetUuidStateMutation() {
  const auth = useAuthentication()
  const loggedInData = useLoggedInData()

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
    const success = await mutationFetch(
      auth,
      mutation,
      input,
      loggedInData?.strings.mutations.errors
    )

    if (success) {
      setTimeout(() => {
        if (!loggedInData) return
        showToastNotice(
          loggedInData.strings.mutations.success[
            input.trashed ? 'trash' : 'restore'
          ],
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
  const loggedInData = useLoggedInData()

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
    const success = await mutationFetch(
      auth,
      mutation,
      input,
      loggedInData?.strings.mutations.errors
    )

    if (success) {
      setTimeout(() => {
        if (!loggedInData) return
        showToastNotice(
          loggedInData.strings.mutations.success[
            isCheckout ? 'accept' : 'reject'
          ],
          'success'
        )
        NProgress.done()
        void router.push(
          sessionStorage.getItem('previousPathname') || '/entity/unrevised'
        )
      }, 100)
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
  const loggedInData = useLoggedInData()
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-assignment
  const { cache } = useSWRConfig()

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
    const success = await mutationFetch(
      auth,
      mutation,
      input,
      loggedInData?.strings.mutations.errors
    )

    // note: Maybe implement global cache key management, but this works okay

    if (success) {
      if (!(cache instanceof Map)) {
        throw new Error(
          'matchMutate requires the cache provider to be a Map instance'
        )
      }

      const keys = []

      for (const key of cache.keys() as IterableIterator<string>) {
        const shouldBeMutated =
          (key.startsWith('arg@') &&
            key.indexOf('query notifications($first') > 0 &&
            key.indexOf('"unread":true') > 0) ||
          key.indexOf('notifications(unread: true)') > 0

        if (shouldBeMutated) {
          keys.push(key)
        }
      }

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
  const loggedInData = useLoggedInData()

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

    const success = await mutationFetch(
      auth,
      mutation,
      input,
      loggedInData?.strings.mutations.errors
    )

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
  const loggedInData = useLoggedInData()

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
    const success = await mutationFetch(
      auth,
      mutation,
      input,
      loggedInData?.strings.mutations.errors
    )

    if (success) await mutate(`comments::${entityId}`)
    return success
  }

  return async (input: ThreadSetThreadStateInput) =>
    await setThreadStateMutation(input)
}

export function useSetCommentStateMutation() {
  const auth = useAuthentication()
  const entityId = useEntityId()
  const loggedInData = useLoggedInData()

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
    const success = await mutationFetch(
      auth,
      mutation,
      input,
      loggedInData?.strings.mutations.errors
    )

    if (success) await mutate(`comments::${entityId}`)
    return success
  }

  return async (input: ThreadSetCommentStateInput) =>
    await setCommentStateMutation(input)
}

export function useCreateThreadMutation() {
  const auth = useAuthentication()
  const loggedInData = useLoggedInData()

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
    const success = await mutationFetch(
      auth,
      mutation,
      input,
      loggedInData?.strings.mutations.errors
    )

    if (success) await mutate(`comments::${input.objectId}`)
    return success
  }

  return async (input: ThreadCreateThreadInput) =>
    await createThreadMutation(input)
}

export function useCreateCommentMutation() {
  const auth = useAuthentication()
  const entityId = useEntityId()
  const loggedInData = useLoggedInData()

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
    const success = await mutationFetch(
      auth,
      mutation,
      input,
      loggedInData?.strings.mutations.errors
    )

    if (success) await mutate(`comments::${entityId}`)
    return success
  }

  return async (input: ThreadCreateCommentInput) =>
    await createCommentMutation(input)
}

export function useSubscriptionSetMutation() {
  const auth = useAuthentication()
  const loggedInData = useLoggedInData()

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
    const success = await mutationFetch(
      auth,
      mutation,
      input,
      loggedInData?.strings.mutations.errors
    )

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

    return success
  }

  return async (
    input: { description: string } //TODO: use types when available
  ) => await setDescriptionMutation(input)
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
  | UserDeleteBotsInput
  | { description: string }

type MutationResponse = ThreadMutation | UuidMutation | NotificationMutation

type ApiErrorType =
  | 'UNAUTHENTICATED'
  | 'FORBIDDEN'
  | 'INVALID_TOKEN'
  | 'BAD_USER_INPUT'
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
  errorStrings?: { [key in ErrorType]: string },
  isRetry?: boolean
): Promise<boolean> {
  if (auth.current === null) return handleError('UNAUTHENTICATED', errorStrings)

  const usedToken = auth.current.token
  try {
    const result = await executeQuery()
    return !!result
  } catch (e) {
    const error = (e as ClientError).response?.errors?.[0] as
      | ApiError
      | undefined

    const type = error ? error.extensions.code : 'UNKNOWN'
    // eslint-disable-next-line no-console
    console.log(error)
    if (type === 'INVALID_TOKEN' && !isRetry) {
      await auth.current.refreshToken(usedToken)
      return await mutationFetch(auth, query, input, errorStrings, true)
    }

    return handleError(type, errorStrings, error)
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

function handleError(
  type: ErrorType,
  errorStrings?: { [key in ErrorType]: string },
  e?: object
): false {
  if (!errorStrings) return false
  const message = errorStrings[type] ?? errorStrings['UNKNOWN']

  // eslint-disable-next-line no-console
  console.log(e)

  if (type == 'BAD_USER_INPUT') {
    triggerSentry({ message: 'Bad unser input in mutation' })
  }

  if (type == 'UNKNOWN') {
    triggerSentry({ message: 'Unknown API error' })
  }

  if (type == 'UNAUTHENTICATED') {
    csrReload()
  }

  showToastNotice(message, 'warning')
  return false
}
