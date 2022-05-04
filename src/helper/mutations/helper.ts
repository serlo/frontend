import {
  CheckoutRevisionInput,
  EntityMutation,
  NotificationMutation,
  NotificationSetStateInput,
  RejectRevisionInput,
  SetEntityResponse,
  SubscriptionSetInput,
  ThreadCreateCommentInput,
  ThreadCreateThreadInput,
  ThreadMutation,
  ThreadSetCommentStateInput,
  ThreadSetThreadArchivedInput,
  ThreadSetThreadStateInput,
  UserDeleteBotsInput,
  UserSetDescriptionInput,
  UuidMutation,
  UuidSetStateInput,
} from '@serlo/api'
import { GraphQLError } from 'graphql'
import { ClientError, GraphQLClient } from 'graphql-request'
import { RefObject } from 'react'

import { csrReload } from '../csr-reload'
import { hasOwnPropertyTs } from '../has-own-property-ts'
import { showToastNotice } from '../show-toast-notice'
import { triggerSentry } from '../trigger-sentry'
import { SetEntityInputTypes } from './use-set-entity-mutation/types'
import { endpoint } from '@/api/endpoint'
import { AuthenticationPayload } from '@/auth/auth-provider'

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
  | UserSetDescriptionInput
  | SetEntityInputTypes

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

export async function mutationFetch(
  auth: RefObject<AuthenticationPayload>,
  query: string,
  input: MutationInput,
  errorStrings?: { [key in ErrorType]: string },
  isRetry?: boolean
): Promise<boolean | number> {
  if (auth.current === null) return handleError('UNAUTHENTICATED', errorStrings)

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
