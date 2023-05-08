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
    const { key, title, content, id } = req.body

    if (
      typeof key === 'string' &&
      typeof title === 'string' &&
      typeof content === 'string' &&
      typeof id === 'number'
    ) {
      if (title.length < 128 && key.length < 64) {
        if (Math.floor(id) === id && id > 0) {
          // ready to go
          await prisma.privateLinkPrototype.create({
            data: { key, title, content, id },
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
