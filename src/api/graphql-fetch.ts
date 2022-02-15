import type { GraphQLError } from 'graphql'
import { ClientError, GraphQLClient, RequestDocument } from 'graphql-request'
import { RefObject } from 'react'

import { endpoint } from '@/api/endpoint'
import { AuthenticationPayload } from '@/auth/auth-provider'

interface ParsedArgs {
  query: RequestDocument
  variables: unknown
}

export function createGraphqlFetch() {
  return async function fetch(args: string) {
    const { query, variables } = JSON.parse(args) as ParsedArgs

    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return await executeQuery()

    function executeQuery() {
      const client = new GraphQLClient(endpoint)
      return client.request(query, variables)
    }
  }
}

export function createAuthAwareGraphqlFetch(
  auth: RefObject<AuthenticationPayload>
) {
  return async function fetch(args: string) {
    const { query, variables } = JSON.parse(args) as ParsedArgs
    if (auth.current === null) throw new Error('unauthorized')

    const usedToken = auth.current.token
    try {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      return await executeQuery()
    } catch (e) {
      const {
        response: { errors },
      } = e as ClientError
      const error = errors?.[0] as ApolloError | undefined

      if (error && error.extensions.code === 'INVALID_TOKEN') {
        try {
          await auth.current.refreshToken(usedToken)
          // eslint-disable-next-line @typescript-eslint/no-unsafe-return
          return await executeQuery()
        } catch (e) {
          // Failed to refresh token
          auth.current.clearToken()
          throw e
        }
      }
      throw e
    }

    function executeQuery() {
      const client = new GraphQLClient(endpoint, {
        headers: auth.current
          ? {
              Authorization: `Bearer ${auth.current.token}`,
            }
          : {},
      })
      return client.request(query, variables)
    }
  }
}

export interface ApolloError extends GraphQLError {
  extensions: {
    code: 'INVALID_TOKEN'
  }
}
