import {
  NotificationMutation,
  NotificationSetStateInput,
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
import NProgress from 'nprogress'
import { mutate } from 'swr'

import { csrReload } from './csr-reload'
import { showToastNotice } from './show-toast-notice'
import { triggerSentry } from './trigger-sentry'
import { endpoint } from '@/api/endpoint'
import { AuthPayload, useAuth } from '@/auth/use-auth'
import { useEntityId } from '@/contexts/entity-id-context'

export function useSetUuidStateMutation() {
  const auth = useAuth()
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

export function useSetNotificationStateMutation() {
  const auth = useAuth()
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

    if (success) {
      console.log('...')
    } // TODO: mutate mutation count
    return success
  }
  return async (input: NotificationSetStateInput) =>
    await setNotificationStateMutation(input)
}

export function useThreadArchivedMutation() {
  const auth = useAuth()
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

export function useSetCommentStateMutation() {
  const auth = useAuth()
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
  const auth = useAuth()
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
  const auth = useAuth()
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

type MutationInput =
  | NotificationSetStateInput
  | UuidSetStateInput
  | ThreadCreateThreadInput
  | ThreadSetThreadArchivedInput
  | ThreadSetThreadStateInput
  | ThreadSetCommentStateInput
  | ThreadCreateCommentInput

type MutationResponse = ThreadMutation | UuidMutation | NotificationMutation

type ApiErrorType = 'UNAUTHENTICATED' | 'FORBIDDEN'
type ErrorType = ApiErrorType | 'UNKNOWN'

export interface ApiError extends GraphQLError {
  extensions: {
    code: ApiErrorType
  }
}

export async function mutationFetch(
  auth: React.RefObject<AuthPayload>,
  query: string,
  input: MutationInput,
  isRetry?: boolean
): Promise<boolean> {
  if (auth.current === null) return handleError('UNAUTHENTICATED')

  try {
    const result = await executeQuery()
    return !!result
  } catch (e) {
    const error = (e as ClientError).response.errors?.[0] as
      | ApiError
      | undefined

    const type = error ? error.extensions.code : 'UNKNOWN'

    if (type === 'UNAUTHENTICATED' && !isRetry) {
      await auth.current.refreshToken()
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
    console.log(e)
    triggerSentry({ message: 'Unknown API error' })
  }

  if (type == 'UNAUTHENTICATED') {
    // TODO: Hack, solve https://github.com/serlo/frontend/issues/851 instead
    csrReload()
  }

  showToastNotice(message, 'warning')
  return false
}
