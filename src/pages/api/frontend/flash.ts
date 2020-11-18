import { NextApiRequest, NextApiResponse } from 'next'

import { serloDomain } from '@/helper/serlo-domain'

export default async function getFlash(
  req: NextApiRequest,
  res: NextApiResponse
) {
  //res.setHeader('Access-Control-Allow-Origin', '*')
  const legacyRes = await fetch(
    'https://de.' + serloDomain + '/auth/password/change',
    {
      headers: {
        cookie: req.headers.cookie ?? '',
        authorization: req.headers.authorization ?? '',
      },
    }
  )
  const html = await legacyRes.text()
  const flasherStartTag = '<div class="flasher">'
  const flashStartIndex = html.indexOf(flasherStartTag)
  const flashEndIndex = html.indexOf(
    `<div class="page-header">`,
    flashStartIndex
  )
  res.json({ html: html.substring(flashStartIndex, flashEndIndex) })
}
