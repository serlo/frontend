import { NextApiRequest, NextApiResponse } from 'next'

const template = `Hi,

please recover access to your account by clicking the following link:

<a href="{{ .RecoveryURL }}">{{ .RecoveryURL }}</a>`

export default function de(_req: NextApiRequest, res: NextApiResponse) {
  res.send(template)
}
