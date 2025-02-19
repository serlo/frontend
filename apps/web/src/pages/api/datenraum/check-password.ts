import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    if (req.query.password === process.env.DATENRAUM_DEMO_PASSWORD_FOR_USER) {
      res.status(200).json({ success: true })
    } else {
      res.status(401).json({ success: false })
    }
  } else {
    res.status(405).end()
  }
}
