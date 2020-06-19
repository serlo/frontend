import { randomBytes } from 'crypto'
import { NextApiRequest, NextApiResponse } from 'next'
import absoluteUrl from 'next-absolute-url'
import * as util from 'util'

import { getAuthorizationCode } from '@/auth/oauth2'

const generateCsrf = util.promisify(randomBytes)

// need this to bypass CORS and cache responses
export default async function login(req: NextApiRequest, res: NextApiResponse) {
  const oauth2AuthorizationCode = getAuthorizationCode()
  if (oauth2AuthorizationCode === null) {
    res.status(500)
    res.send('Auth not configured correctly')
    return
  }

  const referer = req.headers.referer
  const buffer = await generateCsrf(32)
  const csrf = buffer.toString('hex')
  const { origin } = absoluteUrl(req)

  const authorizationUri = oauth2AuthorizationCode.authorizeURL({
    redirect_uri: `${origin}/api/auth/callback`,
    scope: ['offline_access', 'openid'],
    state: JSON.stringify({
      csrf,
      referer,
    }),
  })
  res.setHeader('Set-Cookie', `auth-csrf=${csrf}; Path=/; SameSite=Lax;`)
  res.writeHead(302, {
    Location: authorizationUri,
  })
  res.end()
}
