import fetchContent from '../../src/content-api/fetchContentFromSerloOrg'

// Proxy the API Call as GET request to the frontend so that the ZEIT Now CDN is able to cache this
// We use stale-while-revalidate for that, see also https://zeit.co/docs/v2/network/caching#stale-while-revalidate
export default async function fetch(req, res) {
  const data = await fetchContent('/' + req.query.slug.join('/'))
  res.setHeader('Cache-Control', 's-maxage=1, stale-while-revalidate')
  res.json(data)
}
