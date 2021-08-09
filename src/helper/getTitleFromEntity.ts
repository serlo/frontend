import {
  QueryResponseNoRevision,
  QueryResponseWithTitle,
} from '@/fetcher/query-types'

export function getTitleFromEntity(entity: QueryResponseNoRevision) {
  if (isWithTitle(entity)) {
    return entity.currentRevision?.title
  }
  return undefined
}

// Custom Type Guard!

function isWithTitle(
  entity: QueryResponseWithTitle | QueryResponseNoRevision
): entity is QueryResponseWithTitle {
  return [
    'Page',
    'Article',
    'Video',
    'Applet',
    'CoursePage',
    'Event',
    'Course',
  ].includes(entity.__typename)
}
