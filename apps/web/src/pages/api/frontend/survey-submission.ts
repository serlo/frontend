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
    const { path, event, isProduction } = req.body

    if (
      typeof path === 'string' &&
      typeof event === 'string' &&
      typeof isProduction === 'boolean' &&
      ['yes', 'no', 'rarely', 'exit', 'noStudent', 'show'].includes(event)
    ) {
      if (path.length < 1024) {
        // ready to go
        await prisma.testSurvey.create({
          data: { path, event, isProduction },
        })
        res.send('ok')
        return
      }
    }
  } catch (e) {
    // eslint-disable-next-line no-console
    // console.log(e)
  }
  res.send('bad')
}
