import { useEditorStrings } from '@serlo/frontend/src/contexts/logged-in-data-context'

export function getPluginTitle(
  pluginStrings: ReturnType<typeof useEditorStrings>['plugins'],
  pluginType: string
): string {
  return Object.hasOwn(pluginStrings, pluginType)
    ? (
        pluginStrings[pluginType as keyof typeof pluginStrings] as {
          title: string
        }
      ).title
    : pluginType
}
