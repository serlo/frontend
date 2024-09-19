import { EditorPluginType } from '@editor/types/editor-plugin-type'
import { TemplatePluginType } from '@editor/types/template-plugin-type'

export function checkIsAllowedNesting(
  pluginType: string,
  typesOfAncestors: string[]
) {
  // Restrict more than one level of Spoiler plugin nesting
  // (Spoiler->Spoiler allowed, Spoiler->Spoiler->Spoiler not allowed)
  if (
    pluginType === EditorPluginType.Spoiler &&
    typesOfAncestors.filter(
      (ancestorType) => ancestorType === EditorPluginType.Spoiler
    ).length > 1
  ) {
    return false
  }

  const rootPluginType = typesOfAncestors.at(0)

  if (pluginType === EditorPluginType.Exercise) {
    // Restrict Exercise->Exercise nesting
    if (
      typesOfAncestors.includes(EditorPluginType.Exercise) ||
      typesOfAncestors.includes(EditorPluginType.ExerciseGroup)
    )
      return false

    // Allow exercise only inside Article, Course & GenericContent and on ___editor_preview (rows plugin at the root)
    const hasValidRoot =
      rootPluginType &&
      [
        TemplatePluginType.Article,
        TemplatePluginType.Course,
        TemplatePluginType.GenericContent,
        EditorPluginType.Rows,
      ].includes(rootPluginType as TemplatePluginType)

    return Boolean(hasValidRoot)
  }

  return true
}
