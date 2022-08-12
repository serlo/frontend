import { NextApiRequest, NextApiResponse } from 'next'

const template = `Hi, please verify your account by clicking the following link:

{{ .VerificationURL }}`

export default function de(_req: NextApiRequest, res: NextApiResponse) {
  res.send(template)
}
