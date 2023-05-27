import { createAction } from '@reduxjs/toolkit'

export const insertPluginChildBefore = createAction<{
  parent: string
  sibling: string
  document?: {
    plugin: string
    state?: unknown
  }
}>('plugin/insertPluginChildBefore')

export const insertPluginChildAfter = createAction<{
  parent: string
  sibling?: string
  document?: {
    plugin: string
    state?: unknown
  }
}>('plugin/insertPluginChildAfter')

export const removePluginChild = createAction<{
  parent: string
  child: string
}>('plugin/removePluginChild')
