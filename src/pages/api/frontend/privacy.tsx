import { serloDomain } from '@/serlo-domain'
import { NextApiRequest, NextApiResponse } from 'next'

// need this to bypass CORS and cache responses
export default async function privacy(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const data = await fetch(`https://de.${serloDomain}/privacy/json`)
  const json = await data.json()
  res.json(json)
}
