import {
  QueryResponseNoRevision,
  QueryResponse,
  QueryResponseRevision,
} from './query'
import {
  getServerSideStrings,
  getInstanceDataByLang,
} from '@/helper/feature-i18n'

export function createTitle(uuid: QueryResponse): string {
  const instanceData = getServerSideStrings(uuid.instance)
  const { strings } = getInstanceDataByLang(uuid.instance)
  const suffix = ` - ${instanceData.title}`

  if (isRevision(uuid)) {
    //good enough for now
    return (
      'Revision: ' + getTranslatedType(uuid.__typename.replace('Revision', ''))
    )
  }

  if (uuid.__typename === 'TaxonomyTerm') {
    const term = uuid
    if (term.type === 'topic') {
      return `${term.name} (${strings.entities.topic})${suffix}`
    }
    if (term.type === 'subject') {
      return `${term.name} - ${strings.entities.subject}${suffix}`
    }
    // missing: special behaviour on curriculum term
    return `${term.name}${suffix}`
  }

  if (uuid.__typename === 'Exercise' || uuid.__typename === 'ExerciseGroup') {
    const subject =
      uuid.taxonomyTerms.nodes?.[0].navigation?.path.nodes[0].label
    const typenameString = getTranslatedType(uuid.__typename)
    if (!subject) return typenameString + suffix
    return subject + ' ' + typenameString + suffix
  }

  if (uuid.__typename === 'GroupedExercise') {
    //good enough for now
    return getTranslatedType(uuid.__typename) + suffix
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
    // uncomment when user profiles are merged
    // if (uuid.__typename === 'User') {
    //   return 'User ' + uuid.username
    // }

    if (uuid.currentRevision?.title) {
      return `${uuid.currentRevision.title}${suffix}`
    }
  }

  //fallback
  return 'Serlo'

  function getTranslatedType(typename: string) {
    const camelCase = (typename.charAt(0).toLowerCase() +
      typename.slice(1)) as keyof typeof strings.entities
    return strings.entities[camelCase]
  }

  function isRevision(
    _uuid: QueryResponseNoRevision | QueryResponseRevision
  ): _uuid is QueryResponseRevision {
    return (_uuid as QueryResponseRevision).__typename.endsWith('Revision')
  }
}
