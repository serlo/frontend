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

  const title = getRawTitle(uuid, instance, instanceData.topicTitleAffix)

  if (!title) return 'Serlo'
  if (
    uuid.__typename.endsWith('Revision') ||
    uuid.__typename === UuidType.TaxonomyTerm
  ) {
    return title
  }
  return `${title} - ${instanceData.title}`
}

// subscriptions need the raw title, so it's easier to reuse their type
export function getRawTitle(
  uuid: SubscriptionNode['object'] | MainUuidType,
  instance: Instance,
  topicTitleAffix?: string
): string {
  const { strings } = getInstanceDataByLang(instance)

  const { title, __typename } = uuid
  if (uuid.__typename.endsWith('Revision')) {
    //good enough for now
    return (
      'Revision: ' +
      getTranslatedType(strings, __typename.replace('Revision', ''))
    )
  }

  if (__typename === UuidType.TaxonomyTerm) {
    if (uuid.type === TaxonomyTermType.Topic) {
      // max title length for google is around 60 characters and german affix is 20 chars long
      // no affix
      if (title.length > 44) return title
      // full affix
      if (title.length < 37)
        return `${title} – ${topicTitleAffix ?? strings.entities.topic}`
      // short affix
      return `${title} – ${strings.entities.topic}`
    }
    if (uuid.type === TaxonomyTermType.Subject) {
      return `${title} – ${strings.entities.subject}`
    }
    // missing: special behaviour on curriculum term
  }

  return title
}
