import type { GraphQLError } from 'graphql'
import { ClientError, GraphQLClient } from 'graphql-request'
import { RefObject } from 'react'

import { endpoint } from '@/api/endpoint'
import { AuthenticationPayload } from '@/auth/auth-provider'

export function createGraphqlFetch() {
  return async function fetch(args: string) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const { query, variables } = JSON.parse(args)

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
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const { query, variables } = JSON.parse(args)
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
