import { editorPlugins } from '@editor/plugin/helpers/editor-plugins'
import { EditorPluginType } from '@editor/types/editor-plugin-type'

import type { PluginMenuItemType } from '../contexts/plugin-menu/types'
import { EditorStrings } from '@/contexts/logged-in-data-context'

interface PluginStrings {
  title?: string
  description?: string
}

export function createOption(
  pluginType: EditorPluginType,
  allPluginStrings: EditorStrings['plugins']
): PluginMenuItemType {
  const pluginData = editorPlugins
    .getAllWithData()
    .find((plugin) => plugin.type === pluginType)
  console.log(pluginData)

  if (!pluginData) {
    return { pluginType, title: pluginType }
  }

  const pluginStrings = allPluginStrings[
    pluginType as keyof typeof allPluginStrings
  ] as PluginStrings

  const title =
    pluginStrings?.title ?? pluginData.plugin.defaultTitle ?? pluginType

  const description =
    pluginStrings?.description ?? pluginData.plugin.defaultDescription

  const icon = pluginData.icon

  return {
    pluginType,
    title,
    description,
    icon,
  }
}

export function filterOptions(option: PluginMenuItemType[], text: string) {
  if (!text.length) return option

  const search = text.toLowerCase()

  // title (localized) or pluginType includes search string
  return option.filter(
    (entry) =>
      entry.title.toLowerCase().includes(search) ||
      entry.pluginType.toLowerCase().includes(search)
  )
}

const interactivePluginTypes = new Set([
  EditorPluginType.TextAreaExercise,
  EditorPluginType.ScMcExercise,
  EditorPluginType.H5p,
  EditorPluginType.BlanksExercise,
  EditorPluginType.BlanksExerciseDragAndDrop,
  EditorPluginType.InputExercise,
  EditorPluginType.Solution,
  EditorPluginType.DropzoneImage,
])

export function isInteractivePluginType(pluginType: EditorPluginType) {
  return interactivePluginTypes.has(pluginType)
}
