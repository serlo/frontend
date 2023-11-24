import { EditorPluginType } from '@/serlo-editor/types/editor-plugin-type'
import { TemplatePluginType } from '@/serlo-editor/types/template-plugin-type'

export function checkIsAllowedNesting(
  pluginType: string,
  typesOfAncestors: string[]
) {
  // Restrict Image plugins inside of Multimedia plugins
  if (
    pluginType === EditorPluginType.Image &&
    typesOfAncestors.includes(EditorPluginType.Multimedia)
  ) {
    return false
  }

  // Restrict Box->Multimedia->Table nesting
  if (pluginType === EditorPluginType.SerloTable) {
    const multimediaAncestorIndex = typesOfAncestors.findLastIndex(
      (ancestorType) => ancestorType === EditorPluginType.Multimedia
    )
    const boxAncestorIndex = typesOfAncestors.findLastIndex(
      (ancestorType) => ancestorType === EditorPluginType.Box
    )
    if (
      multimediaAncestorIndex >= 0 &&
      boxAncestorIndex >= 0 &&
      boxAncestorIndex < multimediaAncestorIndex
    ) {
      return false
    }
  }

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

  if (pluginType === EditorPluginType.Exercise) {
    // never allow exercises in solutions
    if (typesOfAncestors.includes(EditorPluginType.Solution)) return false

    const rootPlugin = typesOfAncestors[0]
    if (
      rootPlugin.startsWith('type-') && // only on serlo, allowed everywhere in edusharing
      rootPlugin !== TemplatePluginType.Article &&
      rootPlugin !== TemplatePluginType.CoursePage
    ) {
      return false
    }
  }

  return true
}
