import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const quickbar = await fetch(
    'https://serlo.github.io/quickbar-updater/quickbar.json'
  )
  res.json(await quickbar.json())
}
