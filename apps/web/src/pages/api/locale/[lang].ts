import { NextApiRequest, NextApiResponse } from 'next'

import { getLoggedInData } from '@/helper/feature-i18n'

// need this to bypass CORS and cache responses
export default function de(req: NextApiRequest, res: NextApiResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  )
  if (req.method === 'OPTIONS') {
    res.status(200).end()
    return
  }

  res.json(getLoggedInData(req.query.lang as string))
}
