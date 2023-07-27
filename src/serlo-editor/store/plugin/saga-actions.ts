import { createAction } from '@reduxjs/toolkit'

import { PluginsContextPlugins } from '@/serlo-editor/core/contexts/plugins-context'

export const insertPluginChildBefore = createAction<{
  parent: string
  sibling: string
  document?: {
    plugin: string
    state?: unknown
  }
  plugins: PluginsContextPlugins
}>('plugin/insertPluginChildBefore')

export const insertPluginChildAfter = createAction<{
  parent: string
  sibling?: string
  document?: {
    plugin: string
    state?: unknown
  }
  plugins: PluginsContextPlugins
}>('plugin/insertPluginChildAfter')

export const removePluginChild = createAction<{
  parent: string
  child: string
  plugins: PluginsContextPlugins
}>('plugin/removePluginChild')
