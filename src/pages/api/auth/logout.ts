import cookie from 'cookie'
import { NextApiRequest, NextApiResponse } from 'next'

import { getClientCredentials } from '@/auth/oauth2'

export default async function logout(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const clientCredentials = getClientCredentials()
  if (clientCredentials === null) {
    res.status(500)
    res.send('Auth not configured correctly')
    return
  }

  const cookies = cookie.parse(req.headers.cookie!)
  const token = JSON.parse(cookies['auth-token'])
  const referer = req.headers.referer
  try {
    const accessToken = clientCredentials.createToken(token)
    await accessToken.revokeAll()
  } catch (e) {
    // Token already revoked
  }
  res.setHeader(
    'Set-Cookie',
    `auth-token=; Path=/; Expires=${new Date(0).toUTCString()};`
  )
  res.writeHead(302, {
    Location: `${referer ?? '/'}#auth`,
  })
  res.end()
}
