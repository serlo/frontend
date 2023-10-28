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
    const { path, query, target, isSubject } = req.body

    if (
      typeof path === 'string' &&
      typeof query === 'string' &&
      typeof target === 'string' &&
      typeof isSubject === 'boolean' &&
      path.length < 1024 &&
      query.length < 1024 &&
      target.length < 128
    ) {
      await prisma.quickbarStats.create({
        data: { path, query, target, isSubject },
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
