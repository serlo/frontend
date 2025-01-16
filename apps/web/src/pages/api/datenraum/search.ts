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
  metadata: t.type({ Amb: t.type({ id: t.string, type: t.array(t.string) }) }),
  id: t.string,
  // nodeClass: t.string,
  // nodeSubClass: ?,
  // url: t.string,
  // isAiGenerated: t.boolean,
  // externalId: t.string,
  // sourceId: t.string,
  // highlightTitle: t.string,
  // highlightDescription: t.string,
  // matchedTitleTokens: t.array(t.string),
  // matchedDescriptionTokens: t.array(t.string),
  // taxonomyTitles: t.array(t.string),
  // …
})

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (isProduction) {
    res.status(404).end()
    return
  }

  const username = process.env.DATENRAUM_USERNAME
  const password = process.env.DATENRAUM_PASSWORD

  if (!username || !password) {
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
    'https://keycloak-test.k3s-mbr.uni-potsdam.de/realms/datenraum/protocol/openid-connect/token',
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: `client_id=demo&username=${username}&password=${password}&grant_type=password`,
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
    `https://test.k3s-mbr.uni-potsdam.de/datenraum/api/search/nodes?search=${encodeURIComponent(query)}&offset=0&limit=30`,
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
    nodes.map(({ title, description, metadata, id }) => {
      const url = metadata.Amb.id
      const _type = metadata.Amb.type[1]
      const type = _type === 'Quiz' ? 'Exercise' : 'Article'

      return { title, description, url, type, id }
    })
  )
}

export const config = {
  api: {
    externalResolver: true,
  },
}
