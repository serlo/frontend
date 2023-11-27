import { Instance, TaxonomyTermType } from './graphql-types/operations'
import type { MainUuidType } from './query-types'
import type { SubscriptionNode } from '@/components/pages/manage-subscriptions'
import { UuidType } from '@/data-types'
import {
  getServerSideStrings,
  getInstanceDataByLang,
} from '@/helper/feature-i18n'
import { getTranslatedType } from '@/helper/get-translated-type'

export function createTitle(uuid: MainUuidType, instance: Instance): string {
  const instanceData = getServerSideStrings(instance)
  const suffix = ` - ${instanceData.title}`

  const title = getRawTitle(uuid, 2)

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

  if (uuid.__typename === UuidType.TaxonomyTerm) {
    const term = uuid
    if (term.type === TaxonomyTermType.Topic) {
      return `${term.name} (${strings.entities.topic})`
    }
    if (term.type === TaxonomyTermType.Subject) {
      return `${term.name} - ${strings.entities.subject}`
    }
    // missing: special behaviour on curriculum term
    return `${term.name}`
  }

  if (
    uuid.__typename === UuidType.Exercise ||
    uuid.__typename === UuidType.ExerciseGroup
  ) {
    const subject = uuid.subject?.taxonomyTerm.name
    const typenameString = getTranslatedType(strings, uuid.__typename)
    if (!subject) return typenameString
    return subject + ' ' + typenameString
  }

  if (uuid.__typename === UuidType.GroupedExercise) {
    //good enough for now
    return getTranslatedType(strings, uuid.__typename)
  }
  if (uuid.__typename === UuidType.User) {
    return uuid.username
  }
  if (
    uuid.__typename === UuidType.Page ||
    uuid.__typename === UuidType.Article ||
    uuid.__typename === UuidType.Video ||
    uuid.__typename === UuidType.Applet ||
    uuid.__typename === UuidType.CoursePage ||
    uuid.__typename === UuidType.Course ||
    uuid.__typename === UuidType.Event
  ) {
    if (uuid.currentRevision?.title) {
      return uuid.currentRevision.title
    }
  }

  //fallback
  return null
}
