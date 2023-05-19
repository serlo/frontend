import { createAction } from '@reduxjs/toolkit'

export const insertChildBefore = createAction<{
  parent: string
  sibling: string
  document?: {
    plugin: string
    state?: unknown
  }
}>('plugin/insertChildBefore')

export const insertChildAfter = createAction<{
  parent: string
  sibling?: string
  document?: {
    plugin: string
    state?: unknown
  }
}>('plugin/insertChildAfter')

export const removeChild = createAction<{
  parent: string
  child: string
}>('plugin/removeChild')
