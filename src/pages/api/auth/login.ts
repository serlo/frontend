import { randomBytes } from 'crypto'
import { NextApiRequest, NextApiResponse } from 'next'
import * as util from 'util'

import { getAuthorizationCode, scope } from '@/auth/oauth2'

const generateSecret = util.promisify(randomBytes)

async function login(req: NextApiRequest, res: NextApiResponse) {
  const oauth2AuthorizationCode = getAuthorizationCode()
  if (oauth2AuthorizationCode === null) {
    return fail('Auth not configured correctly')
  }

  const referer = req.headers.referer
  if (referer === undefined) return fail('Missing referer header')
  const { origin } = new URL(referer)

  const csrf = await generateCsrf()
  const authorizationUri = oauth2AuthorizationCode.authorizeURL(
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error Incorrect types, scope has to be an array to work correctly.
    {
      redirect_uri: `${origin}/api/auth/callback`,
      scope,
      state: JSON.stringify({
        csrf,
        referer,
      }),
    }
  )
  res.setHeader('Set-Cookie', `auth-csrf=${csrf}; Path=/; SameSite=Lax;`)
  res.writeHead(302, {
    Location: authorizationUri,
  })
  res.end()

  function fail(message: string) {
    res.status(500)
    res.send(message)
  }
}

async function generateCsrf(): Promise<string> {
  const buffer = await generateSecret(32)
  return buffer.toString('hex')
}

export default login
