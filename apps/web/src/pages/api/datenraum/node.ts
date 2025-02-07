import * as t from 'io-ts'
import type { NextApiRequest, NextApiResponse } from 'next'

import { isProduction } from '@/helper/is-production'

const AccessTokenResponse = t.type({
  access_token: t.string,
})

// partial
const NodeData = t.type({
  id: t.string,
  title: t.string,
  description: t.string,
  externalId: t.string,
  sourceId: t.string,
  url: t.any,
  isAiGenerated: t.boolean,
  metadata: t.type({ Amb: t.any, Tags: t.any, SerloEditorContent: t.unknown }),
})

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (isProduction) {
    res.status(404).end()
    return
  }

  const { id } = req.query

  if (!id || Array.isArray(id)) {
    res.status(400).json({
      message: 'Query parameter missing or multiple parameter are passed to it',
    })
    return
  }

  const result = await loadEditorState(id)

  if (!result.success) {
    res.status(500).json({ message: result.message })
    return
  }

  const nodeResult = result.node

  return res.json({
    id: nodeResult.id,
    title: nodeResult.title,
    description: nodeResult.description,
    externalId: nodeResult.externalId,
    sourceId: nodeResult.sourceId,
    isAiGenerated: nodeResult.isAiGenerated,
    editorState: nodeResult.metadata.SerloEditorContent,
  })
}

export async function loadEditorState(
  id: string
): Promise<
  | { success: true; node: t.TypeOf<typeof NodeData> }
  | { success: false; message: string }
> {
  const username = process.env.DATENRAUM_USERNAME
  const password = process.env.DATENRAUM_PASSWORD

  if (!username || !password) {
    return { success: false, message: 'Datenraum credentials not set' }
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
    return { success: false, message: 'Failed to get access token' }
  }

  const accessTokenResponseJson = (await accessTokenResponse.json()) as unknown

  if (!AccessTokenResponse.is(accessTokenResponseJson)) {
    return { success: false, message: 'Access token missing' }
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

  const node = (await nodeResponse.json()) as unknown

  if (!NodeData.is(node)) {
    return { success: false, message: 'Failed to get node: ' + id }
  }

  return { success: true, node }
}

export const config = { api: { externalResolver: true } }
