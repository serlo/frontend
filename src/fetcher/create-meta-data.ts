/*import {
  ProcessedResponse,
  ResponseDataQuickFix,
} from '@/fetcher/process-response'*/

import { FrontendContentNode } from '@/frontend-node-types'
import { serloDomain } from '@/helper/urls/serlo-domain'

export function getMetaImage(alias: string) {
  const subject = alias.split('/')[1]
  let imageSrc = 'serlo.jpg'

  switch (subject) {
    case 'mathe':
      imageSrc = 'mathematik.png'
      break
    case 'nachhaltigkeit':
      imageSrc = 'nachhaltigkeit.png'
      break
    case 'biologie':
      imageSrc = 'biologie.png'
      break
  }

  return `https://de.${serloDomain}/_assets/img/meta/${imageSrc}`
}

export function getMetaDescription(content: FrontendContentNode[]): string {
  /*if (processed.contentType === 'TaxonomyTerm') return

  if (!processed.data) return

  const data = (processed.data as unknown) as ResponseDataQuickFix

  //could have custom description set, return directly
  if (
    processed.contentType === 'Article' ||
    processed.contentType === 'Applet'
  ) {
    if (data.metaDescription && data.metaDescription.length > 10) {
      return data.metaDescription
    }
  }

  if (data.value === undefined || data.value.children === undefined) return
  if (!conte)*/

  const slice = content.slice(0, 10)
  const stringified = JSON.stringify(slice)
  const regexp = /"text":"(.)*?"/g
  const matches = stringified.match(regexp)
  const longFallback = matches
    ? matches.map((str) => str.substring(8, str.length - 1)).join('')
    : ''
  if (longFallback.length < 50) return ''

  const softCutoff = 135
  const fallback =
    longFallback.substring(
      0,
      softCutoff + longFallback.substring(softCutoff).indexOf(' ')
    ) + ' …'
  const description = fallback
  return description
}
