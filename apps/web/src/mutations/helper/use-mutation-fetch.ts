import { GraphQLError } from 'graphql'
import { ClientError, GraphQLClient } from 'graphql-request'

import { showToastNotice } from '../../helper/show-toast-notice'
import { triggerSentry } from '../../helper/trigger-sentry'
import { endpoint } from '@/api/endpoint'
import { useAuthentication } from '@/auth/use-authentication'
import { useLoggedInData } from '@/contexts/logged-in-data-context'
import type {
  EntityMutation,
  NotificationMutation,
  SetCourseMutation,
  SetEntityResponse,
  ThreadMutation,
  UuidMutation,
} from '@/fetcher/graphql-types/operations'

type MutationResponse =
  | ThreadMutation
  | UuidMutation
  | NotificationMutation
  | EntityMutation
  | SetCourseMutation

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

export function useMutationFetch() {
  const auth = useAuthentication()
  const loggedInData = useLoggedInData()
  const errorStrings = loggedInData?.strings.mutations.errors

  async function mutationFetch(
    query: string,
    input: unknown
  ): Promise<boolean | number> {
    if (auth === null) return handleError('UNAUTHENTICATED', errorStrings)
    try {
      const result =
        window.location.hostname === 'localhost'
          ? await executeQueryLocally()
          : await executeQuery()
      if (Object.hasOwn(result, 'entity')) {
        const entity = result.entity as EntityMutation
        if (Object.keys(entity)[0].startsWith('set')) {
          const entityResponse = Object.values(entity)[0] as SetEntityResponse
          return entityResponse.record?.id ?? false
        }
      }
      return !!result
    } catch (e) {
      const error = (e as ClientError).response?.errors?.[0] as
        | ApiError
        | undefined

      const type = error ? error.extensions.code : 'UNKNOWN'
      // eslint-disable-next-line no-console
      console.error(error)

      return handleError(type, errorStrings, error)
    }

    async function executeQuery(): Promise<MutationResponse> {
      const client = new GraphQLClient(endpoint, {
        credentials: 'include',
      })
      return client.request(query, { input })
    }

    // proxy calls from localhost to make sure we can send the cookies
    async function executeQueryLocally(): Promise<MutationResponse> {
      const result = await fetch('/api/frontend/localhost-graphql-fetch', {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify({ query, variables: { input } }),
      })
      return (await result.json()) as MutationResponse
    }
  }

  return mutationFetch
}

function handleError(
  type: ErrorType,
  errorStrings?: { [key in ErrorType]: string },
  e?: { message?: string }
): false {
  if (!errorStrings) return false
  const message = errorStrings[type] ?? errorStrings['UNKNOWN']

  // eslint-disable-next-line no-console
  console.error(e)

  if (type === 'BAD_USER_INPUT') {
    triggerSentry({ message: 'API(mutation): bad user input' })
  }

  if (type === 'UNKNOWN') {
    triggerSentry({ message: 'API(mutation): unknown error' })
  }

  if (type === 'UNAUTHENTICATED') {
    // while this makes sense it can also increases the chance of lost changes when using the serlo-editor.
    // let's try without for now
    // csrReload()
    triggerSentry({ message: 'API(mutation): unauthenticated' })
  }

  showToastNotice(message, 'warning')
  if (e) {
    const msg = Object.hasOwn(e, 'message')
      ? (e.message as string)
      : 'unknown error'
    showToastNotice(`"${msg}"`)
  }
  return false
}
