import { createSelector } from '@reduxjs/toolkit'

import { selectDocument } from '../documents'
import { findParent, selectFocusTree } from '../focus'
import { selectPlugin } from '../plugins'
import { State } from '../types'

export const selectMayInsertChild = createSelector(
  [(state: State) => state, (_state, sibling: string) => sibling],
  (state, sibling: string) => {
    const root = selectFocusTree(state)
    if (!root) return false
    const parent = findParent(root, sibling)
    if (!parent) return false
    const parentDocument = selectDocument(state, parent.id)
    if (!parentDocument) return false
    const type = parentDocument.plugin
    const plugin = selectPlugin(state, type)
    if (!plugin) return false
    return typeof plugin.insertChild === 'function'
  }
)
export const selectMayRemoveChild = createSelector(
  [(state: State) => state, (_state, sibling: string) => sibling],
  (state, sibling: string) => {
    const root = selectFocusTree(state)
    if (!root) return false
    const parent = findParent(root, sibling)
    if (!parent) return false
    const parentDocument = selectDocument(state, parent.id)
    if (!parentDocument) return false
    const type = parentDocument.plugin
    const plugin = selectPlugin(state, type)
    if (!plugin) return false
    return typeof plugin.removeChild === 'function'
  }
)
