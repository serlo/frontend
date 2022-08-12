import { NextApiRequest, NextApiResponse } from 'next'

const template = `👋 Please verify your email address`

export default function de(_req: NextApiRequest, res: NextApiResponse) {
  res.send(template)
}
