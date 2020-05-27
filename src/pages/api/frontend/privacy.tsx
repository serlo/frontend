import fetch from 'isomorphic-unfetch'

// need this to bypass CORS and cache responses
export default async function privacy(req, res) {
  const data = await fetch('https://de.serlo.org/privacy/json')
  const json = await data.json()
  res.json(json)
}
