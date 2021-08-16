import { InstanceData } from '@/data-types'

export function getTranslatedType(
  strings: InstanceData['strings'],
  typename?: string
) {
  if (!typename) return 'content'
  const camelCase = (typename.charAt(0).toLowerCase() +
    typename.slice(1)) as keyof InstanceData['strings']['entities']
  return strings.entities[camelCase]
}
