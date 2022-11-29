import { Session } from '@ory/client'
import { gql } from 'graphql-request'
import { NextApiRequest, NextApiResponse } from 'next'

import { createGraphqlFetch } from '@/api/graphql-fetch'
import { KRATOS_HOST } from '@/auth/kratos-host'

export const config = {
  runtime: 'experimental-edge',
}

export default async function acceptConsent(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (!KRATOS_HOST)
    return new Response('missing env var', {
      status: 500,
    })

  try {
    const { consent_challenge } = req.query
    // @ts-expect-error tbh I have no idea why .get works when direct access does not
    const cookie = req.cookies.get('ory_kratos_session') as string

    const sessionResponse = await fetch(`${KRATOS_HOST}/sessions/whoami`, {
      credentials: 'include',
      headers: { 'X-Session-Cookie': cookie },
    })

    const session = (await sessionResponse.json()) as Session

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
  } catch {
    return new Response('error authenticating', {
      status: 401,
    })
  }
}
