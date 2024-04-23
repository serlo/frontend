import { createApiHandler, config } from '@ory/integrations/next-edge'
import { NextApiRequest, NextApiResponse } from 'next/types'

export { config }

const COOKIE_DOMAINS = {
  production: 'serlo.org',
  staging: 'serlo-staging.dev',
  local: 'localhost',
}

const API_KRATOS_WEBHOOK_URL =
  process.env.NEXT_PUBLIC_ENV === 'production'
    ? 'https://api.serlo.org/kratos/register'
    : 'https://api.serlo-staging.dev/kratos/register'

export const COOKIE_DOMAIN =
  process.env.NEXT_PUBLIC_ENV === 'production'
    ? COOKIE_DOMAINS['production']
    : process.env.NEXT_PUBLIC_VERCEL_URL
      ? COOKIE_DOMAINS['staging']
      : COOKIE_DOMAINS['local']

const KRATOS_HOSTS = {
  production: 'https://kratos.serlo.org',
  staging: 'https://kratos.serlo-staging.dev',
  local: 'http://localhost:4433',
}

// if env is not set, it's a production build running on localhost, use staging as default
const KRATOS_HOST =
  KRATOS_HOSTS[
    process.env.NEXT_PUBLIC_ENV ? process.env.NEXT_PUBLIC_ENV : 'staging'
  ]

export default async function customCreateApiHandler(
  req: NextApiRequest,
  res: NextApiResponse<string>
): Promise<void> {
  // injecting a function here to trigger an api call because
  // unfortunately the kratos webhook ist not reliable atm.
  // this is not used for the SSO flow (that still uses the kratos webhook)
  if (
    req.method === 'GET' &&
    req.url?.startsWith('/api/.ory/self-service/verification') &&
    process.env.API_KRATOS_SECRET
  ) {
    console.log('afterRegisterApiCall: trying to call API')

    void fetch(API_KRATOS_WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'x-kratos-key': process.env.API_KRATOS_SECRET,
        'Content-Type': 'application/json',
      },
    })
      .then(async (result) => {
        const text = await result.text()
        console.log(result.status)
        console.error(text)
        // if (result.status !== 200) {
        // }
      })
      .catch((e) => console.error(e))
  }

  // continue with default kratos handler
  return createApiHandler({
    apiBaseUrlOverride: KRATOS_HOST,
    forceCookieSecure: true,
    forceCookieDomain: COOKIE_DOMAIN,
  })(req, res)
}
