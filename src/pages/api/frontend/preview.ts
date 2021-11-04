import type { NextApiRequest, NextApiResponse } from 'next'

const cookie = '__serlo_preview=1; Path=/;'

export default (req: NextApiRequest, res: NextApiResponse) => {
  res.setPreviewData({})
  const cookies = res.getHeader('Set-Cookie')
  if (Array.isArray(cookies)) {
    res.setHeader('Set-Cookie', [...cookies, cookie])
  } else {
    res.setHeader('Set-Cookie', cookie)
  }
  res.end('Preview mode enabled')
}
