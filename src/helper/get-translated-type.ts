import { InstanceData } from '@/data-types'

export function getTranslatedType(
  strings: InstanceData['strings'],
  typename?: string
): string {
  if (!typename) return strings.entities['content']
  const camelCase = (
    typename.charAt(0).toLowerCase() + typename.slice(1)
  ).replace(/-./g, (x) => x[1].toUpperCase())

  const { entities, categories } = strings

  if (Object.hasOwn(entities, camelCase as keyof typeof entities)) {
    return entities[camelCase as keyof typeof entities]
  }

  if (Object.hasOwn(categories, camelCase as keyof typeof categories)) {
    return categories[camelCase as keyof typeof categories]
  }

  return strings.entities['content']
}
