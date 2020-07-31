import { NextApiRequest, NextApiResponse } from 'next'

import { fetchPageData } from '@/fetcher/fetch-page-data'

// Proxy the API Call as GET request to the frontend so that the ZEIT Now CDN is able to cache this
// We use stale-while-revalidate for that, see also https://zeit.co/docs/v2/network/caching#stale-while-revalidate
export default async function fetch(req: NextApiRequest, res: NextApiResponse) {
  const slug = req.query.slug as string[]
  const data = await fetchPageData('/' + slug.join('/'))
  if (data.kind === 'error') {
    res.statusCode = data.errorData.code
  }
  res.setHeader('Cache-Control', 's-maxage=1, stale-while-revalidate')
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.json(data)
}
