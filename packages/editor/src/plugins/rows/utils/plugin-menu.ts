import type { PluginMenuItem } from '@editor/package/plugin-menu'

export function filterOptions(option: PluginMenuItem[], text: string) {
  if (!text.length) return option

  const search = text.toLowerCase()

  // title (localized) or pluginType includes search string
  return option.filter(
    (entry) =>
      entry.title.toLowerCase().includes(search) ||
      entry.type.toLowerCase().includes(search) ||
      entry.initialState.plugin.toLowerCase().includes(search)
  )
}
