import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const path = String(req.query.path)
  // Check for secret to confirm this is a valid request
  if (!path) {
    return res.status(401).json({ message: 'no path provided' })
  }

  try {
    await res.revalidate(decodeURIComponent(path))
    return res.json({ revalidated: true })
  } catch (err) {
    // If there was an error, Next.js will continue
    // to show the last successfully generated page
    return res.status(500).send('Error revalidating')
  }
}
