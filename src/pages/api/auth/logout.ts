import { randomBytes } from 'crypto'
import { NextApiRequest, NextApiResponse } from 'next'
import util from 'util'

import { getClientCredentials, getLogoutUrl } from '@/auth/oauth2'

const generateSecret = util.promisify(randomBytes)

async function logout(req: NextApiRequest, res: NextApiResponse) {
  const clientCredentials = getClientCredentials()
  if (clientCredentials === null) {
    return fail('Auth not configured correctly')
  }

  const referer = req.headers.referer
  if (referer === undefined) return fail('Missing referer header')

  let idToken: string

  try {
    const token = JSON.parse(req.cookies['auth-token']) as { id_token: string }
    idToken = token['id_token']
  } catch (e) {
    // Token does not exist or user already logged out
    res.setHeader(
      'Set-Cookie',
      `auth-token=; Path=/; Expires=${new Date(0).toUTCString()};`
    )
    res.writeHead(302, {
      Location: `${referer ?? '/'}#auth`,
    })
    res.end()
    return
  }

  const csrf = await generateCsrf()
  const state = JSON.stringify({
    csrf,
    referer: `${referer ?? '/'}#auth`,
  })
  const { origin } = new URL(referer)

  const logoutUrl = getLogoutUrl({
    idToken,
    state,
    callback: `${origin}/api/auth/logout-callback`,
  })

  if (logoutUrl === null) return fail('Auth not configured correctly')

  res.setHeader('Set-Cookie', `auth-csrf=${csrf}; Path=/; SameSite=Lax;`)
  res.writeHead(302, {
    Location: logoutUrl,
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

export default logout
