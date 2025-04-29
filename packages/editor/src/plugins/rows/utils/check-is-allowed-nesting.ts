import { allowedBoxChildren } from '@editor/plugins/box'
import { allowedSpoilerChildren } from '@editor/plugins/spoiler'
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

  // restrict what children a box plugin can contain
  if (typesOfAncestors.includes(EditorPluginType.Box)) {
    if (!allowedBoxChildren.includes(pluginType as EditorPluginType))
      return false
  }

  // restrict what children a spoiler plugin can contain
  if (typesOfAncestors.includes(EditorPluginType.Spoiler)) {
    if (!allowedSpoilerChildren.includes(pluginType as EditorPluginType))
      return false
  }

  const rootPluginType = typesOfAncestors.at(0)

  if (
    pluginType === EditorPluginType.Exercise ||
    // Interactive video is a special interactive plugin,
    // in that it's not a child of the Exercise plugin
    pluginType === EditorPluginType.InteractiveVideo
  ) {
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

  // Special `PageLayout` plugin only available in Page entities
  if (pluginType === EditorPluginType.PageLayout) {
    return typesOfAncestors.includes(TemplatePluginType.Page)
  }

  return true
}
