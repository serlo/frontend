import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const url = req.url ?? ''
  const lumiUrl = url.replace(
    '/api/frontend/lumi/proxy',
    'https://app.lumi.education/api/v1/h5p'
  )
  const lumiRes = await fetch(lumiUrl, { method: req.method })
  //console.log(lumiRes.headers.get('Content-Type'))
  res.setHeader('Content-Type', lumiRes.headers.get('Content-Type') ?? '')
  res.send(Buffer.from(await lumiRes.arrayBuffer()))
}
