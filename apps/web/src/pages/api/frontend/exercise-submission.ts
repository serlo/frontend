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
    const { path, entityId, revisionId, type, result, sessionId } = req.body

    if (
      typeof path === 'string' &&
      typeof entityId === 'number' &&
      typeof revisionId === 'number' &&
      typeof type === 'string' &&
      ['sc', 'mc', 'input', 'h5p', 'text', 'ival'].includes(type) &&
      typeof result === 'string' &&
      (['correct', 'wrong', 'open'].includes(result) || type === 'ival') &&
      result.length <= 8 &&
      typeof sessionId === 'string'
    ) {
      if (path.length < 1024 && sessionId.length < 64) {
        if (
          Math.floor(entityId) === entityId &&
          Math.floor(revisionId) === revisionId &&
          entityId > 0
        ) {
          // ready to go
          await prisma.exerciseSubmission.create({
            data: { path, entityId, revisionId, type, result, sessionId },
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
