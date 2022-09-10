import { gql } from 'graphql-request'
import { NextApiRequest, NextApiResponse } from 'next'

import { createGraphqlFetch } from '@/api/graphql-fetch'
import { AuthSessionCookie } from '@/auth/auth-session-cookie'

export const config = {
  runtime: 'experimental-edge',
}

export default async function acceptLogin(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { login_challenge } = req.query

  //TODO: we are getting session = null when it is supposed to be already authenticated
  const session = AuthSessionCookie.parse() ?? {}
  const query = gql`
    mutation ($input: OauthAcceptInput!) {
      oauth {
        acceptLogin(input: $input) {
          redirectUri
        }
      }
    }
  `
  const variables = {
    input: {
      session: session,
      challenge: login_challenge,
    },
  }
  const args = JSON.stringify({ query, variables })
  const response = await createGraphqlFetch()(args)
  res.writeHead(302, {
    Location: response.oauth.acceptLogin.redirectUri,
  })
  res.end()
}
