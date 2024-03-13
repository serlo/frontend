import { TemplatePluginType } from '@editor/types/template-plugin-type'

import { InstanceData, UuidType } from '@/data-types'

export function getTranslatedType(
  strings: InstanceData['strings'],
  typename?: string
): string {
  if (!typename) return strings.entities['content']

  const replacedTypename =
    typename === TemplatePluginType.TextExerciseGroup
      ? UuidType.ExerciseGroup
      : typename

  const camelCase = (
    replacedTypename.charAt(0).toLowerCase() + replacedTypename.slice(1)
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
