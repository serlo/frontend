import { createSelector } from '@reduxjs/toolkit'
import { last } from 'ramda'

import { findParent } from './helpers'
import type { FocusTreeNode } from './types'
import { selectDocument } from '../documents'
import {
  createDeepEqualSelector,
  createJsonStringifySelector,
} from '../helpers'
import { selectRoot } from '../root'
import { State } from '../types'
import { editorPlugins } from '@/serlo-editor/plugin/helpers/editor-plugins'
import { EditorPluginType } from '@/serlo-editor-integration/types/editor-plugin-type'

const selectSelf = (state: State) => state.focus

export const selectIsFocused = createSelector(
  [selectSelf, (_state, id: string) => id],
  (focus, id: string) => focus === id
)

export const selectFocusTree: (
  state: State,
  id?: string
) => FocusTreeNode | null = createJsonStringifySelector(
  [(state: State) => state, (_state, id?: string) => id],
  (state, id = undefined) => {
    const root = id ? id : selectRoot(state)
    if (!root) return null
    const document = selectDocument(state, root)
    if (!document) return null
    const plugin = editorPlugins.getByType(document.plugin)
    if (!plugin) return null

    const children = plugin.state
      .getFocusableChildren(document.state)
      .map((child) => {
        const subtree = selectFocusTree(state, child.id)
        return subtree || child
      })

    return {
      id: root,
      children,
    }
  }
)

export const selectParent = createSelector(
  [(state: State) => state, (_state, id: string) => id],
  (state, id) => {
    const root = selectFocusTree(state)
    return root && findParent(root, id)
  }
)

export const selectAncestorPluginIds = createDeepEqualSelector(
  [(state: State) => state, (_state, leaf: string) => leaf],
  (state, leaf) => {
    const root = selectFocusTree(state)
    if (!root) return null

    let current = leaf
    let path: string[] = [leaf]

    while (current !== root.id) {
      const parent = findParent(root, current)
      if (!parent) return null
      current = parent.id
      path = [current, ...path]
    }

    return path
  }
)

export const selectAncestorPluginTypes = createDeepEqualSelector(
  [(state: State) => state, (_state, leafId: string) => leafId],
  (state, leafId) => {
    const rootNode = selectFocusTree(state)
    if (!rootNode) return null

    let currentId = leafId
    let pluginTypes: EditorPluginType[] = []

    while (currentId !== rootNode.id) {
      const parentNode = findParent(rootNode, currentId)
      if (!parentNode) return null
      const pluginType = selectDocument(state, parentNode.id)?.plugin
      if (pluginType === undefined) return null
      pluginTypes = [pluginType as EditorPluginType, ...pluginTypes]
      currentId = parentNode.id
    }

    return pluginTypes
  }
)

export const selectIsLastRowInRootRowsPlugin = createSelector(
  [(state: State) => state, (_state, id: string) => id],
  (state, id) => {
    const rootNode = selectFocusTree(state)
    if (!rootNode) return false

    const rootRowsPluginRows = rootNode.children?.[0]?.children?.[1]?.children
    if (!rootRowsPluginRows) return false

    return id === last(rootRowsPluginRows)?.id
  }
)
