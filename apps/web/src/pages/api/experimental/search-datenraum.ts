import * as t from 'io-ts'
import type { NextApiRequest, NextApiResponse } from 'next'

import { isProduction } from '@/helper/is-production'

const AccessTokenResponse = t.type({
  access_token: t.string,
})

const SearchResponse = t.type({
  _embedded: t.type({
    nodes: t.array(t.unknown),
  }),
})

const SearchNode = t.type({
  title: t.string,
  description: t.string,
  metadata: t.type({ Amb: t.type({ id: t.string }) }),
})

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (isProduction) {
    res.status(404).end()
    return
  }

  const cliendId = process.env.DATENRAUM_CLIENT_ID
  const clientSecret = process.env.DATENRAUM_CLIENT_SECRET

  if (!cliendId || !clientSecret) {
    res.status(500).json({ message: 'Datenraum credentials not set' })
    return
  }

  const { q: query } = req.query

  if (!query || Array.isArray(query)) {
    res.status(400).json({
      message: 'Query parameter missing or multiple parameter are passed to it',
    })
    return
  }

  const accessTokenResponse = await fetch(
    'https://aai.demo.meinbildungsraum.de/realms/nbp-aai/protocol/openid-connect/token',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Basic ${btoa(`${cliendId}:${clientSecret}`)}`,
      },
      body: 'grant_type=client_credentials',
    }
  )

  if (!accessTokenResponse.ok) {
    res.status(500).json({ message: 'Failed to get access token' })
    return
  }

  const accessTokenResponseJson = (await accessTokenResponse.json()) as unknown

  if (!AccessTokenResponse.is(accessTokenResponseJson)) {
    res.status(500).json({ message: 'Access token missing' })
    return
  }

  const { access_token: accessToken } = accessTokenResponseJson

  const searchResponse = await fetch(
    `https://dam.demo.meinbildungsraum.de/datenraum/api/core/nodes?search=${encodeURIComponent(query)}&offset=0&limit=30`,
    {
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    }
  )

  const searchResults = (await searchResponse.json()) as unknown

  if (!SearchResponse.is(searchResults)) {
    res.status(500).json({ message: 'Failed to get search results' })
    return
  }

  const nodes = searchResults._embedded.nodes.filter(SearchNode.is)

  res.json(
    nodes.map((node) => ({
      title: node.title,
      description: node.description,
      url: node.metadata.Amb.id,
    }))
  )
}

export const config = {
  api: {
    externalResolver: true,
  },
}
