import { createSelector } from '@reduxjs/toolkit'

import { findParent } from './helpers'
import type { FocusTreeNode } from './types'
import { selectDocument } from '../documents'
import {
  createDeepEqualSelector,
  createJsonStringifySelector,
} from '../helpers'
import { selectRoot } from '../root'
import { State } from '../types'
import {
  PluginsContextPlugins,
  getPluginByType,
} from '@/serlo-editor/core/contexts/plugins-context'
import { EditorPlugin } from '@/serlo-editor/plugin'

interface FocusSelectorArgs {
  plugins: PluginsContextPlugins
  id: string
}

const selectSelf = (state: State) => state.focus

export const selectFocused = createSelector(selectSelf, (focus) => focus)

export const selectIsFocused = createSelector(
  [selectSelf, (_state, id: string) => id],
  (focus, id: string) => focus === id
)

// TODO: Maybe `selectDocumentTree` belongs to `documents` slice
export const selectDocumentTree: (
  state: State,
  plugins: PluginsContextPlugins,
  id?: string
) => FocusTreeNode | null = createJsonStringifySelector(
  [
    (state: State) => state,
    (_state, plugins: PluginsContextPlugins, id?: string) => ({ plugins, id }),
  ],
  (state, { plugins, id }) => {
    const root = id ? id : selectRoot(state)
    if (!root) return null
    const document = selectDocument(state, root)
    if (!document) return null
    const plugin = getPluginByType(plugins, document.plugin)
    if (!plugin) return null

    const children = (plugin.plugin as EditorPlugin).state
      .getFocusableChildren(document.state)
      .map((child) => {
        const subtree = selectDocumentTree(state, plugins, child.id)
        return subtree || child
      })

    return {
      id: root,
      children,
    }
  }
)

export const selectParent = createSelector(
  [(state: State) => state, (_state, args: FocusSelectorArgs) => args],
  (state, { plugins, id }) => {
    const root = selectDocumentTree(state, plugins)
    return root && findParent(root, id)
  }
)

export const selectAncestorPluginIds = createDeepEqualSelector(
  [(state: State) => state, (_state, args: FocusSelectorArgs) => args],
  (state, { plugins, id }) => {
    const root = selectDocumentTree(state, plugins)
    if (!root) return []

    let current = id
    let path: string[] = [id]

    while (current !== root.id) {
      const parent = findParent(root, current)
      if (!parent) return []
      current = parent.id
      path = [current, ...path]
    }

    return path
  }
)

export const selectAncestorPluginTypes = createDeepEqualSelector(
  [(state: State) => state, (_state, args: FocusSelectorArgs) => args],
  (state, { plugins, id }) => {
    const root = selectDocumentTree(state, plugins)
    if (!root) return null

    let currentId = id
    let pluginTypes: string[] = []

    while (currentId !== root.id) {
      const parentNode = findParent(root, currentId)
      if (!parentNode) return null
      const pluginType = selectDocument(state, parentNode.id)?.plugin
      if (pluginType === undefined) return null
      pluginTypes = [pluginType, ...pluginTypes]
      currentId = parentNode.id
    }

    return pluginTypes
  }
)

export const selectHasFocusedChild = createSelector(
  [(state: State) => state, (_state, args: FocusSelectorArgs) => args],
  (state, { plugins, id }) => {
    const tree = selectDocumentTree(state, plugins, id)
    if (!tree || !tree.children) return false
    return tree.children.some((node) => selectIsFocused(state, node.id))
  }
)

export const selectHasFocusedDescendant = createSelector(
  [(state: State) => state, (_state, args: FocusSelectorArgs) => args],
  (state, { plugins, id }): boolean => {
    const tree = selectDocumentTree(state, plugins, id)
    if (!tree || !tree.children) return false
    return tree.children.some(
      (node) =>
        selectIsFocused(state, node.id) ||
        selectHasFocusedDescendant(state, { plugins, id: node.id })
    )
  }
)
