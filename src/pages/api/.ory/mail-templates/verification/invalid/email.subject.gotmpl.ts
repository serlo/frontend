import { NextApiRequest, NextApiResponse } from 'next'

const template = `👋 Someone tried to verify this email address`

export default function de(_req: NextApiRequest, res: NextApiResponse) {
  res.send(template)
}
