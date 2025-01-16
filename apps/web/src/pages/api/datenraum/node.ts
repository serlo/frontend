import * as t from 'io-ts'
import type { NextApiRequest, NextApiResponse } from 'next'

import { isProduction } from '@/helper/is-production'

const AccessTokenResponse = t.type({
  access_token: t.string,
})

const NodeData = t.type({
  id: t.string,
  title: t.string,
  description: t.string,
  externalId: t.string,
  sourceId: t.string,
  url: t.string,
  isAiGenerated: t.boolean,
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

  const { id } = req.query

  if (!id || Array.isArray(id)) {
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

  // let's go

  const nodeResponse = await fetch(
    `https://test.k3s-mbr.uni-potsdam.de/datenraum/api/core/nodes/${encodeURIComponent(id)}?includeRelatedNodes=false`,
    {
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    }
  )

  const nodeResult = (await nodeResponse.json()) as unknown

  if (!NodeData.is(nodeResult)) {
    res.status(500).json({ message: 'Failed to get node: ' + id })
    return
  }

  return res.json({
    id: nodeResult.id,
    title: nodeResult.title,
    description: nodeResult.description,
    externalId: nodeResult.externalId,
    sourceId: nodeResult.sourceId,
    url: nodeResult.url,
    isAiGenerated: nodeResult.isAiGenerated,
  })
}

export const config = { api: { externalResolver: true } }
