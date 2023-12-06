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
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const { event, latex, sessionId } = req.body

    if (
      typeof event === 'string' &&
      typeof latex === 'string' &&
      typeof sessionId === 'string' &&
      event.length < 255 &&
      latex.length < 255 &&
      sessionId.length < 64
    ) {
      await prisma.equationsAppStats.create({
        data: { event, latex, sessionId },
      })
      res.send('ok')
      return
    }
  } catch (e) {
    // eslint-disable-next-line no-console
    // console.log(e)
  }
  res.send('bad')
}
