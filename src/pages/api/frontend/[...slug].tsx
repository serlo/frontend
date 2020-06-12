import { NextApiRequest, NextApiResponse } from 'next'

import { fetchContent } from '@/fetcher/serlo-api'

// Proxy the API Call as GET request to the frontend so that the ZEIT Now CDN is able to cache this
// We use stale-while-revalidate for that, see also https://zeit.co/docs/v2/network/caching#stale-while-revalidate
// eslint-disable-next-line import/no-default-export
export default async function fetch(req: NextApiRequest, res: NextApiResponse) {
  const slug = req.query.slug as string[]
  const data = await fetchContent(
    '/' + slug.join('/'),
    req.query.redirect !== undefined
  )
  if (data.error) {
    res.statusCode = 500
  }
  res.setHeader('Cache-Control', 's-maxage=1, stale-while-revalidate')
  res.json(data)
}
