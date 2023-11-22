import { useEditorStrings } from '@serlo/serlo-editor'

export function getPluginTitle(
  pluginStrings: ReturnType<typeof useEditorStrings>['plugins'],
  pluginType: string
) {
  return Object.hasOwn(pluginStrings, pluginType)
    ? pluginStrings[pluginType as keyof typeof pluginStrings].title
    : pluginType
}
