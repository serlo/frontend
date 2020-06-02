import { serloDomain } from '@/serlo-domain'

// need this to bypass CORS and cache responses
export default async function privacy(req, res) {
  const data = await fetch(`https://de.${serloDomain}/privacy/json`)
  const json = await data.json()
  res.json(json)
}
