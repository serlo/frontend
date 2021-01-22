import type { GraphQLError } from 'graphql'
import { ClientError, GraphQLClient } from 'graphql-request'
import React from 'react'

import { endpoint } from '@/api/endpoint'
import { AuthPayload } from '@/auth/use-auth'

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
  auth: React.RefObject<AuthPayload>
) {
  return async function fetch(args: string) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const { query, variables } = JSON.parse(args)
    if (auth.current === null) throw new Error('unauthorized')
    try {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      return await executeQuery()
    } catch (e) {
      const {
        response: { errors },
      } = e as ClientError
      const error = errors?.[0] as ApolloError | undefined
      if (error && error.extensions.code === 'UNAUTHENTICATED') {
        await auth.current.refreshToken()
        // eslint-disable-next-line @typescript-eslint/no-unsafe-return
        return await executeQuery()
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
    code: 'UNAUTHENTICATED'
  }
}
