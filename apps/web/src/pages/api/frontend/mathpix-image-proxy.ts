import { NextApiRequest, NextApiResponse } from 'next'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { imageUrl } = req.query

  if (
    !imageUrl ||
    typeof imageUrl !== 'string' ||
    !imageUrl.startsWith('https://cdn.mathpix.com/')
  ) {
    res.status(400).json({ error: 'invalid image url' })
    return
  }

  try {
    const response = await fetch(decodeURIComponent(imageUrl))

    if (response.ok) {
      const data = await response.arrayBuffer()

      // Set CORS headers
      res.setHeader('Access-Control-Allow-Origin', '*')
      res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS')
      res.setHeader(
        'Content-Type',
        response.headers.get('Content-Type') || 'image/jpeg'
      )
      res.setHeader(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept'
      )

      res.send(Buffer.from(data))
    } else {
      // eslint-disable-next-line no-console
      console.error('Error fetching image:', response.statusText)
      res.status(response.status).end()
    }
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Error:', error)
    res.status(500).end('Internal Server Error')
  }
}

export default handler
