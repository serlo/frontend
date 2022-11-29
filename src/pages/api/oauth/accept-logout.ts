import { gql } from 'graphql-request'
import type { NextRequest } from 'next/server'

import { createGraphqlFetch } from '@/api/graphql-fetch'

export const config = {
  runtime: 'experimental-edge',
}

export default async function acceptLogout(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const logout_challenge = searchParams.get('logout_challenge')

  const query = gql`
    mutation ($challenge: String!) {
      oauth {
        acceptLogout(challenge: $challenge) {
          redirectUri
        }
      }
    }
  `
  const variables = {
    challenge: logout_challenge,
  }
  const args = JSON.stringify({ query, variables })
  const apiResponse = (await createGraphqlFetch()(args)) as {
    oauth: { acceptLogout: { redirectUri: string } }
  }
  return Response.redirect(apiResponse.oauth.acceptLogout.redirectUri, 302)
}
