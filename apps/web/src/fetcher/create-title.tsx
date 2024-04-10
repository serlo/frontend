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

  const title = getRawTitle(uuid, instance)

  if (!title) return 'Serlo'
  if (uuid.__typename.endsWith('Revision')) return title
  return `${title} - ${instanceData.title}`
}

// subscriptions need the raw title, so it's easier to reuse their type
export function getRawTitle(
  uuid: SubscriptionNode['object'] | MainUuidType,
  instance: Instance
): string {
  const { strings } = getInstanceDataByLang(instance)

  if (uuid.__typename.endsWith('Revision')) {
    //good enough for now
    return (
      'Revision: ' +
      getTranslatedType(strings, uuid.__typename.replace('Revision', ''))
    )
  }

  if (uuid.__typename === UuidType.TaxonomyTerm) {
    if (uuid.type === TaxonomyTermType.Topic) {
      return `${uuid.title} (${strings.entities.topic})`
    }
    if (uuid.type === TaxonomyTermType.Subject) {
      return `${uuid.title} - ${strings.entities.subject}`
    }
    // missing: special behaviour on curriculum term
  }

  return uuid.title
}
