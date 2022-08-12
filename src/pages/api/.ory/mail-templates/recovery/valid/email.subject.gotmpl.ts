import { NextApiRequest, NextApiResponse } from 'next'

const template = `👋 Recover access to your account`

export default function de(_req: NextApiRequest, res: NextApiResponse) {
  res.send(template)
}
