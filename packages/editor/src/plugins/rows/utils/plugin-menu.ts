import type { PluginMenuItemType } from '../contexts/plugin-menu/types'

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
