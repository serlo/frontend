import {
  QueryResponseNoRevision,
  QueryResponse,
  QueryResponseRevision,
  Instance,
} from './query-types'
import {
  getServerSideStrings,
  getInstanceDataByLang,
} from '@/helper/feature-i18n'

export function createTitle(uuid: QueryResponse, instance: Instance): string {
  const instanceData = getServerSideStrings(instance)
  const suffix = ` - ${instanceData.title}`

  const title = getRawTitle(uuid, instance)

  if (!title) return 'Serlo'
  if (uuid.__typename === 'User') return 'User ' + title
  if (isRevision(uuid)) return title
  return title + suffix
}

export function getRawTitle(
  uuid: QueryResponse,
  instance: Instance
): string | null {
  const { strings } = getInstanceDataByLang(instance)

  if (isRevision(uuid)) {
    //good enough for now
    return (
      'Revision: ' + getTranslatedType(uuid.__typename.replace('Revision', ''))
    )
  }

  if (uuid.__typename === 'TaxonomyTerm') {
    const term = uuid
    if (term.type === 'topic') {
      return `${term.name} (${strings.entities.topic})`
    }
    if (term.type === 'subject') {
      return `${term.name} - ${strings.entities.subject}`
    }
    // missing: special behaviour on curriculum term
    return `${term.name}`
  }

  if (uuid.__typename === 'Exercise' || uuid.__typename === 'ExerciseGroup') {
    const subject =
      uuid.taxonomyTerms.nodes?.[0]?.navigation?.path.nodes[0].label
    const typenameString = getTranslatedType(uuid.__typename)
    if (!subject) return typenameString
    return subject + ' ' + typenameString
  }

  if (uuid.__typename === 'GroupedExercise') {
    //good enough for now
    return getTranslatedType(uuid.__typename)
  }
  if (uuid.__typename === 'User') {
    return uuid.username
  }
  if (
    uuid.__typename === 'Page' ||
    uuid.__typename === 'Article' ||
    uuid.__typename === 'Video' ||
    uuid.__typename === 'Applet' ||
    uuid.__typename === 'CoursePage' ||
    uuid.__typename === 'Course' ||
    uuid.__typename === 'Event'
  ) {
    if (uuid.currentRevision?.title) {
      return uuid.currentRevision.title
    }
  }

  //fallback
  return null

  function getTranslatedType(typename: string) {
    const camelCase = (typename.charAt(0).toLowerCase() +
      typename.slice(1)) as keyof typeof strings.entities
    return strings.entities[camelCase]
  }
}

function isRevision(
  _uuid: QueryResponseNoRevision | QueryResponseRevision
): _uuid is QueryResponseRevision {
  return (_uuid as QueryResponseRevision).__typename.endsWith('Revision')
}
