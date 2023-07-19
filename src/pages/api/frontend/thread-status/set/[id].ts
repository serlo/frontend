import type { NextApiRequest, NextApiResponse } from 'next'

import { prisma } from '@/helper/prisma'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { id, label } = req.query

    await prisma.prototypeThreadStatus.upsert({
      where: { threadId: id as string },
      update: { status: label as string },
      create: { threadId: id as string, status: label as string },
    })
    res.send('ok')
    return
  } catch (e) {
    // eslint-disable-next-line no-console
    // console.log(e)
  }
  res.status(400).send('bad')
}
