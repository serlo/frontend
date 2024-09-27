import { useEditStrings } from '@editor/i18n/edit-strings-provider'

export function getPluginTitle(
  pluginStrings: ReturnType<typeof useEditStrings>['plugins'],
  pluginType: string
) {
  return Object.hasOwn(pluginStrings, pluginType)
    ? pluginStrings[pluginType as keyof typeof pluginStrings].title
    : pluginType
}
