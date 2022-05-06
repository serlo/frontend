import { Instance } from './graphql-types/operations'
import { MainUuidType } from './query-types'
import { SubscriptionNode } from '@/components/pages/manage-subscriptions'
import {
  getServerSideStrings,
  getInstanceDataByLang,
} from '@/helper/feature-i18n'
import { getTranslatedType } from '@/helper/get-translated-type'

export function createTitle(uuid: MainUuidType, instance: Instance): string {
  const instanceData = getServerSideStrings(instance)
  const suffix = ` - ${instanceData.title}`

  const title = getRawTitle(uuid, instance)

  if (!title) return 'Serlo'
  if (uuid.__typename.endsWith('Revision')) return title
  return title + suffix
}

// subscriptions need the raw title, so it's easier to reuse their type
export function getRawTitle(
  uuid: SubscriptionNode['object'],
  instance: Instance
): string | null {
  const { strings } = getInstanceDataByLang(instance)

  if (uuid.__typename.endsWith('Revision')) {
    //good enough for now
    return (
      'Revision: ' +
      getTranslatedType(strings, uuid.__typename.replace('Revision', ''))
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
    const typenameString = getTranslatedType(strings, uuid.__typename)
    if (!subject) return typenameString
    return subject + ' ' + typenameString
  }

  if (uuid.__typename === 'GroupedExercise') {
    //good enough for now
    return getTranslatedType(strings, uuid.__typename)
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
}
