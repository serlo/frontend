import { NextApiRequest, NextApiResponse } from 'next'

// need this to bypass CORS and cache responses
export default async function comments(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const data = await fetch(req.query.href as string, {
    headers: { Cookie: 'useFrontend=1' },
  })
  const text = await data.text()
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.send(text)
}
