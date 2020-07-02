import cookie from 'cookie'
import { NextApiRequest, NextApiResponse } from 'next'

import { getClientCredentials } from '@/auth/oauth2'

export default async function logout(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const clientCredentials = getClientCredentials()
  if (clientCredentials === null) {
    return fail('Auth not configured correctly')
  }

  const cookieHeaderValue = req.headers.cookie
  if (cookieHeaderValue === undefined) return fail('Missing cookie header')

  const referer = req.headers.referer
  if (referer === undefined) return fail('Missing referer header')

  const cookies = cookie.parse(cookieHeaderValue)

  try {
    const token = JSON.parse(cookies['auth-token'])
    const accessToken = clientCredentials.createToken(token)
    await accessToken.revokeAll()
  } catch (e) {
    // Token does not exist or already revoked
  }

  res.setHeader(
    'Set-Cookie',
    `auth-token=; Path=/; Expires=${new Date(0).toUTCString()};`
  )
  res.writeHead(302, {
    Location: `${referer ?? '/'}#auth`,
  })
  res.end()

  function fail(message: string) {
    res.status(500)
    res.send(message)
  }
}
