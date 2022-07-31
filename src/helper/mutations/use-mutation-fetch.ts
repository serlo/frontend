import { GraphQLError } from 'graphql'
import { ClientError, GraphQLClient } from 'graphql-request'

import { csrReload } from '../csr-reload'
import { hasOwnPropertyTs } from '../has-own-property-ts'
import { showToastNotice } from '../show-toast-notice'
import { triggerSentry } from '../trigger-sentry'
import { endpoint } from '@/api/endpoint'
import { useAuthentication } from '@/auth/use-authentication'
import { useLoggedInData } from '@/contexts/logged-in-data-context'
import {
  EntityMutation,
  NotificationMutation,
  SetEntityResponse,
  ThreadMutation,
  UuidMutation,
} from '@/fetcher/graphql-types/operations'

type MutationResponse =
  | ThreadMutation
  | UuidMutation
  | NotificationMutation
  | EntityMutation

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
    input: unknown,
    isRetry?: boolean
  ): Promise<boolean | number> {
    if (auth.current === null)
      return handleError('UNAUTHENTICATED', errorStrings)
    const usedToken = auth.current.token
    try {
      const result = await executeQuery()
      if (hasOwnPropertyTs(result, 'entity')) {
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
      if (type === 'INVALID_TOKEN' && !isRetry) {
        await auth.current.refreshToken(usedToken)
        return await mutationFetch(query, input, true)
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

  return mutationFetch
}

function handleError(
  type: ErrorType,
  errorStrings?: { [key in ErrorType]: string },
  e?: object
): false {
  if (!errorStrings) return false
  const message = errorStrings[type] ?? errorStrings['UNKNOWN']

  // eslint-disable-next-line no-console
  console.error(e)

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
  if (e && hasOwnPropertyTs(e, 'message')) {
    showToastNotice(`"${e.message as string}"`)
  }
  return false
}
