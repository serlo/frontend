import { NextApiRequest, NextApiResponse } from 'next'

import { getLoggedInData } from '@/helper/feature-i18n'

// need this to bypass CORS and cache responses
export default function de(req: NextApiRequest, res: NextApiResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.json(getLoggedInData(req.query.lang as string))
}
