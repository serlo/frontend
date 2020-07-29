import { QueryResponse } from './query'
import { getServerSideStrings } from '@/helper/feature-i18n'

export function createTitle(uuid: QueryResponse) {
  const instanceData = getServerSideStrings(uuid.instance)
  const suffix = ' - ' + instanceData.title

  if (uuid.__typename === 'TaxonomyTerm') {
    const term = uuid
    if (term.type === 'topic') {
      return `${term.name} (Thema)${suffix}`
    }
    if (term.type === 'subject') {
      return `${term.name} - Fach${suffix}`
    }
    // missing: special behaviour on curriculum term
    return `${term.name}${suffix}`
  }

  // default: show revision title
  if (
    uuid.__typename === 'Page' ||
    uuid.__typename === 'Article' ||
    uuid.__typename === 'Video' ||
    uuid.__typename === 'Applet' ||
    uuid.__typename === 'CoursePage'
  ) {
    if (uuid.currentRevision?.title) {
      return `${uuid.currentRevision.title}${suffix}`
    }
  }
}
