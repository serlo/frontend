import { GraphQLClient, RequestDocument } from 'graphql-request'
import { RefObject } from 'react'

import { endpoint } from '@/api/endpoint'
import { AuthenticationPayload } from '@/auth/auth-provider'

export interface ParsedArgs {
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
  return async function _fetch(args: string) {
    // TODO: only use this proxy on localhost
    // const { query, variables } = JSON.parse(args) as ParsedArgs
    if (auth.current === null) throw new Error('unauthorized')

    const result = await fetch('/api/graphql', {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify(args),
    })
    return (await result.json()) as unknown
    // // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    // return await executeQuery()

    // function executeQuery() {
    //   const client = new GraphQLClient(endpoint, {
    //     credentials: 'include',
    //   })
    //   return client.request(query, variables)
    // }
  }
}
