import { Session } from '@ory/client'
import { gql } from 'graphql-request'
import type { NextRequest } from 'next/server'

import { createGraphqlFetch } from '@/api/graphql-fetch'
import { KRATOS_HOST } from '@/auth/kratos-host'

export const config = {
  runtime: 'experimental-edge',
}

export default async function acceptLogin(req: NextRequest) {
  if (!KRATOS_HOST)
    return new Response('missing env var', {
      status: 500,
    })

  try {
    const { searchParams } = new URL(req.url)
    const challenge = searchParams.get('login_challenge')

    const cookie = req.cookies.get('ory_kratos_session') ?? ''
    const sessionResponse = await fetch(`${KRATOS_HOST}/sessions/whoami`, {
      credentials: 'include',
      headers: { 'X-Session-Cookie': cookie },
    })
    const session = (await sessionResponse.json()) as Session

    const query = gql`
      mutation ($input: OauthAcceptInput!) {
        oauth {
          acceptLogin(input: $input) {
            redirectUri
          }
        }
      }
    `
    const variables = { input: { session, challenge } }
    const args = JSON.stringify({ query, variables })

    const apiResponse = (await createGraphqlFetch()(args)) as {
      oauth: { acceptLogin: { redirectUri: string } }
    }

    return Response.redirect(apiResponse.oauth.acceptLogin.redirectUri, 302)
  } catch {
    return new Response('error authenticating', {
      status: 401,
    })
  }
}
