import { NextApiRequest, NextApiResponse } from 'next'

import { getAuthorizationCode, getClientCredentials } from '@/auth/oauth2'

async function callback(req: NextApiRequest, res: NextApiResponse) {
  const oauth2ClientCredentials = getClientCredentials()
  const oauth2AuthorizationCode = getAuthorizationCode()

  if (oauth2ClientCredentials === null || oauth2AuthorizationCode === null) {
    return fail()
  }

  const { code, scope, state } = req.query as {
    code: string
    scope: string
    state: string
  }

  try {
    const { csrf, referer } = JSON.parse(state)
    if (csrf === req.cookies['auth-csrf']) {
      const { origin } = new URL(referer)
      const result = await oauth2AuthorizationCode.getToken({
        code,
        redirect_uri: `${origin}/api/auth/callback`,
        scope,
      })
      try {
        const { token } = oauth2ClientCredentials.createToken(result)
        res.setHeader(
          'Set-Cookie',
          `auth-token=${JSON.stringify(
            token.token
          )}; Path=/; SameSite=Lax; Max-Age=2592000;`
        )
      } catch (e) {
        console.log(e)
        console.log('Failed to create token from result', result)
        return fail()
      }
    }
    res.writeHead(302, {
      Location: `${referer ?? '/'}#auth`,
    })
    res.end()
  } catch (e) {
    console.log(e)
    console.log('Failed to parse state', state)
    console.log('Query', req.query)
    return fail()
  }

  function fail() {
    res.status(500)
    res.send('Auth not configured correctly')
  }
}

export default callback
