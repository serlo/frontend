import { hasOwnPropertyTs } from './has-own-property-ts'
import { InstanceData } from '@/data-types'

export function getTranslatedType(
  strings: InstanceData['strings'],
  typename?: string
) {
  if (!typename) return strings.entities['content']
  const camelCase = typename.charAt(0).toLowerCase() + typename.slice(1)

  return hasOwnPropertyTs(strings.entities, camelCase)
    ? (strings.entities[camelCase] as string)
    : hasOwnPropertyTs(strings.categories, camelCase)
    ? (strings.categories[camelCase] as string)
    : strings.entities['content']
}
