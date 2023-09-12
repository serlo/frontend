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
    const {
      group,
      entityId,
      experiment,
      type,
      result,
      sessionId,
      isProduction,
      topicId,
    } = req.body

    if (
      typeof group === 'string' &&
      typeof entityId === 'number' &&
      typeof topicId === 'number' &&
      typeof experiment === 'string' &&
      typeof type === 'string' &&
      ['sc', 'mc', 'input', 'h5p', 'text', 'ival', 'visit', 'rating'].includes(
        type
      ) &&
      typeof result === 'string' &&
      (['correct', 'wrong', 'open'].includes(result) ||
        type === 'ival' ||
        type === 'rating' ||
        type === 'visit') &&
      result.length <= 8 &&
      typeof sessionId === 'string' &&
      typeof isProduction === 'boolean'
    ) {
      if (group.length < 8 && experiment.length < 64 && sessionId.length < 64) {
        if (
          Math.floor(entityId) === entityId &&
          (entityId > 0 || entityId === -1)
        ) {
          await prisma.aBTestingData.create({
            data: {
              entityId,
              type,
              result,
              sessionId,
              isProduction,
              experiment,
              group,
              topicId,
            },
          })
          res.send('ok')
          return
        }
      }
    }
  } catch (e) {
    // eslint-disable-next-line no-console
    // console.log(e)
  }
  res.send('bad')
}
