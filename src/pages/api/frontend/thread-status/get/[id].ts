import type { NextApiRequest, NextApiResponse } from 'next'

import { prisma } from '@/helper/prisma'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { id } = req.query

    const result = await prisma.prototypeThreadStatus.findFirst({
      where: { threadId: id as string },
    })
    res.send(result ? result.status : 'none')
    return
  } catch (e) {
    // eslint-disable-next-line no-console
    // console.log(e)
  }
  res.send('bad')
}
