import { NextApiRequest, NextApiResponse } from 'next'

import { getAuthorizationCode, getClientCredentials } from '@/auth/oauth2'

async function callback(req: NextApiRequest, res: NextApiResponse) {
  const oauth2ClientCredentials = getClientCredentials()
  const oauth2AuthorizationCode = getAuthorizationCode()

  if (oauth2ClientCredentials === null || oauth2AuthorizationCode === null) {
    return fail('Auth not configured correctly')
  }

  const result = parseQuery(req.query)
  if (isError(result)) return fail(result.error)

  const { code, scope, state } = result
  const { csrf, referer } = state

  if (csrf !== req.cookies['auth-csrf']) return fail('CSRF validation failed')

  const { origin } = new URL(referer)
  const tokenResult = await oauth2AuthorizationCode.getToken({
    code,
    redirect_uri: `${origin}/api/auth/callback`,
    scope,
  })
  const { token } = oauth2ClientCredentials.createToken(tokenResult)
  res.setHeader(
    'Set-Cookie',
    `auth-token=${JSON.stringify(
      token.token
    )}; Path=/; SameSite=Lax; Max-Age=2592000;`
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
  code: string
  scope: string
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

  const { code, scope, state } = query as {
    code: string
    scope: string
    state: string
  }

  if (!code) return { error: 'Query string is missing `code`' }
  if (!scope) return { error: 'Query string is missing `scope`' }
  if (!state) return { error: 'Query string is missing `state`' }

  try {
    return {
      code,
      scope,
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
