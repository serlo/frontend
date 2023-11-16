import { NextApiRequest, NextApiResponse } from 'next'

import { fetchPageData } from '@/fetcher/fetch-page-data'

// NOTE: This route is only used for injections on localhost and for debugging

// Proxy the API Call as GET request to the frontend so that the ZEIT Now CDN is able to cache this
// We use stale-while-revalidate for that, see also https://zeit.co/docs/v2/network/caching#stale-while-revalidate
export default async function fetch(req: NextApiRequest, res: NextApiResponse) {
  const slug = req.query.slug as string[]
  const data = await fetchPageData('/' + slug.join('/'))
  res.setHeader('Cache-Control', 's-maxage=1, stale-while-revalidate')
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.json(data)
}
