import * as t from 'io-ts'
import type { NextApiRequest, NextApiResponse } from 'next'

import { isProduction } from '@/helper/is-production'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (isProduction) {
    res.status(404).end()
    return
  }

  if (req.method !== 'POST') {
    res.status(405).end()
    return
  }

  res.status(200).json({
    plugin: 'rows',
    state: [{ plugin: 'text' }, { plugin: 'box' }],
  })
}
