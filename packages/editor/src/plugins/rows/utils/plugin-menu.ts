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
  const search = text.toLowerCase()
  if (!search.length) return option

  const filterResults = new Set<PluginMenuItemType>()

  // title or pluginType start with search string
  option.forEach((entry) => {
    if (
      entry.title.toLowerCase().startsWith(search) ||
      entry.pluginType.startsWith(search)
    ) {
      filterResults.add(entry)
    }
  })

  // title includes search string
  option.forEach((entry) => {
    if (entry.title.toLowerCase().includes(search)) {
      filterResults.add(entry)
    }
  })

  return [...filterResults]
}

const interactivePluginTypes = new Set([
  EditorPluginType.TextAreaExercise,
  EditorPluginType.ScMcExercise,
  EditorPluginType.H5p,
  EditorPluginType.BlanksExercise,
  EditorPluginType.InputExercise,
  EditorPluginType.Solution,
  EditorPluginType.DropzoneImage,
])

export function isInteractivePluginType(pluginType: EditorPluginType) {
  return interactivePluginTypes.has(pluginType)
}
