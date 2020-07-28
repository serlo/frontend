import { NextApiRequest, NextApiResponse } from 'next'
import { Token } from 'simple-oauth2'

import { getAuthorizationCode, getClientCredentials } from '@/auth/oauth2'

async function callback(req: NextApiRequest, res: NextApiResponse) {
  const oauth2ClientCredentials = getClientCredentials()
  const oauth2AuthorizationCode = getAuthorizationCode()

  if (oauth2ClientCredentials === null || oauth2AuthorizationCode === null) {
    return fail('Auth not configured correctly')
  }

  const result = parseQuery(req.query)
  if (isError(result)) return fail(result.error)

  const { state } = result
  const { csrf, referer } = state

  if (csrf !== req.cookies['auth-csrf']) return fail('CSRF validation failed')

  try {
    const token = JSON.parse(req.cookies['auth-token']) as Token
    const accessToken = oauth2ClientCredentials.createToken(token)
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

interface QueryParseSuccess {
  state: {
    csrf: string
    referer: string
  }
}

interface QueryParseError {
  error: string
}

function parseQuery(
  query: NextApiRequest['query']
): QueryParseSuccess | QueryParseError {
  if (Object.keys(query).length === 0) {
    return { error: 'Missing query string' }
  }

  const { state } = query as {
    state: string
  }

  if (!state) return { error: 'Query string is missing `state`' }

  try {
    return {
      state: JSON.parse(state) as QueryParseSuccess['state'],
    }
  } catch (e) {
    return {
      error: 'Failed to parse `state`',
    }
  }
}

function isError(
  result: QueryParseSuccess | QueryParseError
): result is QueryParseError {
  return (result as QueryParseError).error !== undefined
}

export default callback
