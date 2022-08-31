import jwt from 'jsonwebtoken'

import { GraphQLClient, RequestDocument } from 'graphql-request'
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

    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return await executeQuery()

    function executeQuery() {
      const serviceToken = jwt.sign({}, "serlo.org-secret", {
        audience: 'api.serlo.org',
        issuer: 'serlo.org',
      })
      const client = new GraphQLClient(endpoint, {
        headers: auth.current
          ? {
              Authorization: `Serlo Service=${serviceToken}`,
            }
          : {},
        credentials: 'include'
      })
      return client.request(query, variables)
    }
  }
}
