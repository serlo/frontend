// Path=/;

import type { NextApiRequest, NextApiResponse } from 'next'

export default (req: NextApiRequest, res: NextApiResponse) => {
  res.setPreviewData({})
  const cookies = res.getHeader('Set-Cookie')
  if (Array.isArray(cookies)) {
    res.setHeader('Set-Cookie', [...cookies, '__serlo_preview=1; Path=/;'])
  } else {
    res.setHeader('Set-Cookie', '__serlo_preview=1; Path=/;')
  }
  res.end('Preview mode enabled')
}
