import { NextApiRequest, NextApiResponse } from 'next'

import { getAuthorizationCode, getClientCredentials } from '@/auth/oauth2'

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
    const result = await oauth2AuthorizationCode.getToken({
      code,
      redirect_uri: 'http://localhost:3000/api/auth/callback',
      scope,
    })
    const { token } = oauth2ClientCredentials.createToken(result)
    res.setHeader(
      'Set-Cookie',
      `auth-token=${JSON.stringify(
        token
      )}; Path=/; SameSite=Lax; Max-Age=2592000;`
    )
  }
  res.writeHead(302, {
    Location: `/auth/login?referer=${referer ?? '/'}`,
  })
  res.end()
}
