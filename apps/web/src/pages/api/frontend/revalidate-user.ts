import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const username = String(req.query.username)
  // Check for secret to confirm this is a valid request
  if (!username) {
    return res.status(401).json({ message: 'no username provided' })
  }

  try {
    await res.revalidate(`/user/profile/${username}`)
    return res.json({ revalidated: true })
  } catch (err) {
    // If there was an error, Next.js will continue
    // to show the last successfully generated page
    return res.status(500).send('Error revalidating')
  }
}
