import type { NextApiRequest, NextApiResponse } from 'next'

import { prisma } from '@/helper/prisma'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    res.status(405).send({ message: 'Only POST requests allowed' })
    return
  }

  try {
    console.log('Trying spoiler opened tracking...')

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const { entityId, sessionId, isProduction } = req.body

    console.log(req.body)
    const isValidBody =
      typeof entityId === 'string' &&
      typeof sessionId === 'string' &&
      sessionId.length < 64 &&
      typeof isProduction === 'boolean'

    if (!isValidBody) throw new Error('Body invalid')

    await prisma.spoilerOpenedTrackingData.create({
      data: {
        entityId,
        sessionId,
        isProduction,
      },
    })
    res.send('ok')
    return
  } catch (e) {
    // eslint-disable-next-line no-console
    res.send('bad')
  }
  res.send('bad')
}
