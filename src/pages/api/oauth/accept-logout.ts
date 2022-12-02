import { gql } from 'graphql-request'
import { NextApiRequest, NextApiResponse } from 'next'

import { createGraphqlFetch } from '@/api/graphql-fetch'

export default async function acceptLogout(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { logout_challenge } = req.query

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
  const response = (await createGraphqlFetch()(args)) as {
    oauth: { acceptLogout: { redirectUri: string } }
  }
  res.redirect(302, response.oauth.acceptLogout.redirectUri)
}
