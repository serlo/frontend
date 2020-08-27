/*import {
  ProcessedResponse,
  ResponseDataQuickFix,
} from '@/fetcher/process-response'*/

import { FrontendContentNode } from '@/data-types'
import { serloDomain } from '@/helper/serlo-domain'

/*export function getMetaContentType(uuid) {
  contentType = uuid.__typename
  //match legacy content types that are used by google custom search
  if (processed.contentType === undefined) return ''
  if (processed.contentType === 'Exercise') return 'text-exercise'
  if (processed.contentType === 'CoursePage') return 'course-page'

  const type = ((processed.data as unknown) as ResponseDataQuickFix).type
  if (type === 'topicFolder' || type === 'curriculumTopicFolder')
    return 'topic-folder'
  if (contentType === 'TaxonomyTerm') return 'topic'
  //Article, Video, Applet, Page
  return contentType.toLowerCase()
}*/

export function getMetaImage(alias?: string) {
  const subject = alias ? alias.split('/')[1] : 'default'
  let imageSrc = 'serlo.jpg'

  switch (subject) {
    case 'mathe':
      imageSrc = 'mathematik.jpg'
      break
    case 'nachhaltigkeit':
      imageSrc = 'nachhaltigkeit.jpg'
      break
    case 'biologie':
      imageSrc = 'biologie.jpg'
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
    longFallback.substr(
      0,
      softCutoff + longFallback.substr(softCutoff).indexOf(' ')
    ) + ' …'
  const description = fallback
  return description
}
