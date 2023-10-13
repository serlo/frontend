import { InstanceData } from '@/data-types'

export function getTranslatedType(
  strings: InstanceData['strings'],
  typename?: string
): string {
  if (!typename) return strings.entities['content']
  const camelCase = (
    typename.charAt(0).toLowerCase() + typename.slice(1)
  ).replace(/-./g, (x) => x[1].toUpperCase())

  const replacedType =
    camelCase === 'typeTextExerciseGroup' ? 'exerciseGroup' : camelCase

  const { entities, categories } = strings

  if (Object.hasOwn(entities, replacedType as keyof typeof entities)) {
    return entities[replacedType as keyof typeof entities]
  }

  if (Object.hasOwn(categories, replacedType as keyof typeof categories)) {
    return categories[replacedType as keyof typeof categories]
  }

  return strings.entities['content']
}
