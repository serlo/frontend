import * as t from 'io-ts'
import type { NextApiRequest, NextApiResponse } from 'next'

import { isProduction } from '@/helper/is-production'

const AccessTokenResponse = t.type({
  access_token: t.string,
})

const PutInputSchema = t.type({
  id: t.string,
  title: t.string,
  description: t.string,
  serloId: t.number,
  editorState: t.unknown,
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

  if (!PutInputSchema.is(req.body)) {
    res.status(400).json({ message: 'invalid input data' })
    return
  }

  const { id, title, description, serloId, editorState } = req.body

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

  const inputData = {
    '@context': [
      'https://w3id.org/kim/amb/context.jsonld',
      {
        '@language': 'de',
        content: '@json',
      },
    ],
    id: `https://serlo.org/${serloId}`,
    name: title,
    description: description,
    inLanguage: ['de'],
    type: ['LearningResource', 'Article'],
    content: editorState,
  }

  const putResponse = await fetch(
    `https://test.k3s-mbr.uni-potsdam.de/datenraum/api/core/nodes-v2/${encodeURIComponent(id)}?MetadataFormat=Serlo`,
    {
      method: 'PUT',
      headers: {
        Accept: '*/*',
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(inputData),
    }
  )

  // eslint-disable-next-line no-console
  console.log(putResponse.status, putResponse.statusText)
  // eslint-disable-next-line no-console
  console.log(
    putResponse.headers.get('location'),
    putResponse.headers.get('Location')
  )

  if (!putResponse.ok)
    return res.status(500).json({ message: 'Failed to put node' })
  return res.status(200)
}

export const config = { api: { externalResolver: true } }
