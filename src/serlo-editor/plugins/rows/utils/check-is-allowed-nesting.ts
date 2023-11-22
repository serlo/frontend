import { EditorPluginType } from '@/serlo-editor/types/editor-plugin-type'

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

  return true
}
