import { GraphQLClient, type RequestDocument } from 'graphql-request'

import { endpoint } from '@/api/endpoint'
import type { AuthenticationPayload } from '@/auth/auth-provider'

export interface ParsedArgs {
  query: RequestDocument
  variables: Record<string, unknown>
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

export function createAuthAwareGraphqlFetch(auth: AuthenticationPayload) {
  return async function graphqlFetch(
    args: string,
    abortSignal?: AbortController['signal']
  ) {
    if (auth === null) throw new Error('unauthorized')

    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return window.location.hostname === 'localhost'
      ? await executeQueryLocally()
      : await executeQuery()

    function executeQuery() {
      const { query, variables } = JSON.parse(args) as ParsedArgs
      const client = new GraphQLClient(endpoint, {
        credentials: 'include',
        signal: abortSignal,
      })
      return client.request(query, variables)
    }
    async function executeQueryLocally() {
      const result = await fetch('/api/frontend/localhost-graphql-fetch', {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        method: 'POST',
        body: args,
        signal: abortSignal,
      })
      return result.json()
    }
  }
}
