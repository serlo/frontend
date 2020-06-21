import { NextApiRequest, NextApiResponse } from 'next'
import absoluteUrl from 'next-absolute-url'

import { getAuthorizationCode, getClientCredentials } from '@/auth/oauth2'
import { Instance } from '@/instance'
import { serloDomain } from '@/serlo-domain'

export default async function callback(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const oauth2ClientCredentials = getClientCredentials()
  const oauth2AuthorizationCode = getAuthorizationCode()

  if (oauth2ClientCredentials === null || oauth2AuthorizationCode === null) {
    res.status(500)
    res.send('Auth not configured correctly')
    return
  }

  const { code, scope, state } = req.query as {
    code: string
    scope: string
    state: string
  }
  const { csrf, referer } = JSON.parse(state)
  if (csrf === req.cookies['auth-csrf']) {
    const origin = getOrigin(req)
    const result = await oauth2AuthorizationCode.getToken({
      code,
      redirect_uri: `${origin}/api/auth/callback`,
      scope,
    })
    const { token } = oauth2ClientCredentials.createToken(result)
    res.setHeader(
      'Set-Cookie',
      `auth-token=${JSON.stringify(
        token.token
      )}; Path=/; SameSite=Lax; Max-Age=2592000;`
    )
  }
  res.writeHead(302, {
    Location: `/auth/login?referer=${referer ?? '/'}`,
  })
  res.end()
}

function getOrigin(req: NextApiRequest) {
  const { origin, protocol, host } = absoluteUrl(req)

  const instance = Object.values(Instance).find((instance) => {
    return host.startsWith(`${instance}.`)
  })

  if (instance === undefined) {
    // local development
    return origin
  }

  return `${protocol}//${instance}.${serloDomain}`
}
