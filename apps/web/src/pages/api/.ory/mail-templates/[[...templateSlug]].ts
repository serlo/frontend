import { NextApiRequest, NextApiResponse } from 'next'

import { createLangTemplates } from '@/helper/kratos-mail-templates/fragments'

export default function de(req: NextApiRequest, res: NextApiResponse) {
  if (!Array.isArray(req.query.templateSlug)) res.send('invalid template url')

  const template = createLangTemplates(req.query.templateSlug as string[])
  res.send(template)
}
