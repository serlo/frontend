import { gql } from 'graphql-request'
import { NextApiRequest, NextApiResponse } from 'next'

import { createGraphqlFetch } from '@/api/graphql-fetch'
import { AuthSessionCookie } from '@/auth/auth-session-cookie'

export default async function acceptConsent(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { consent_challenge } = req.query

  const session = AuthSessionCookie.parse(req.cookies)
  const query = gql`
    mutation ($input: OauthAcceptInput!) {
      oauth {
        acceptConsent(input: $input) {
          redirectUri
        }
      }
    }
  `
  const variables = {
    input: {
      session: session,
      challenge: consent_challenge,
    },
  }
  const args = JSON.stringify({ query, variables })
  const response = (await createGraphqlFetch()(args)) as {
    oauth: { acceptConsent: { redirectUri: string } }
  }
  res.redirect(302, response.oauth.acceptConsent.redirectUri)
}
