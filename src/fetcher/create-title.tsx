import {
  QueryResponse,
  TaxonomyTerm,
  QueryResponseWithCurrentRevision,
} from './query'

export function createTitle(uuid: QueryResponse) {
  const type = uuid.__typename

  const suffix = ' - lernen mit Serlo!'

  if (type === 'TaxonomyTerm') {
    const term = uuid as TaxonomyTerm
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
    type === 'Page' ||
    type === 'Article' ||
    type === 'Video' ||
    type === 'Applet' ||
    type === 'CoursePage'
  ) {
    const _uuid = uuid as QueryResponseWithCurrentRevision
    if (_uuid.currentRevision?.title) {
      return `${_uuid.currentRevision.title}${suffix}`
    }
  }
}
