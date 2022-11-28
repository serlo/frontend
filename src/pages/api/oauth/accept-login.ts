import { gql } from 'graphql-request'
import { NextApiRequest, NextApiResponse } from 'next'

import { createGraphqlFetch } from '@/api/graphql-fetch'
import { kratos } from '@/auth/kratos'

export const config = {
  runtime: 'experimental-edge',
}

export default async function acceptLogin(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { login_challenge } = req.query

  const session = (await kratos.toSession()).data
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
      session,
      challenge: login_challenge,
    },
  }
  const args = JSON.stringify({ query, variables })
  const response = (await createGraphqlFetch()(args)) as {
    oauth: { acceptLogin: { redirectUri: string } }
  }
  res.redirect(302, response.oauth.acceptLogin.redirectUri)
}
