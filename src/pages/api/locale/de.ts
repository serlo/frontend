import { NextApiRequest, NextApiResponse } from 'next'

import { LoggedInData } from '@/data-types'
import { authMenuData } from '@/data/menu'

const loggedInData: LoggedInData = {
  authMenu: authMenuData,
  strings: {
    tools: 'Weitere Tools',
  },
}

// need this to bypass CORS and cache responses
export default function de(req: NextApiRequest, res: NextApiResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.json(loggedInData)
}
