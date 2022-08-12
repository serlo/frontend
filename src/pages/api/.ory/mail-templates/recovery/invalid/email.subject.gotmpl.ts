import { NextApiRequest, NextApiResponse } from 'next'

const template = `👋 Account access attempted`

export default function de(_req: NextApiRequest, res: NextApiResponse) {
  res.send(template)
}
