import { editorPlugins } from '@editor/plugin/helpers/editor-plugins'
import { EditorPluginType } from '@editor/types/editor-plugin-type'
import { createSelector } from '@reduxjs/toolkit'
import * as R from 'ramda'

import {
  getChildTree,
  findChildTreeNodeParentById,
  getStaticDocument,
} from './helpers'
import { ChildTreeNode } from './types'
import {
  createDeepEqualSelector,
  createJsonStringifySelector,
} from '../helpers'
import { State } from '../types'

const selectSelf = (state: State) => state.documents

export const selectDocuments = createSelector(
  selectSelf,
  (documents) => documents
)

export const selectDocument = createSelector(
  [selectSelf, (_state, id: string | null) => id],
  (documents, id) => {
    if (!id) return null
    return documents[id] || null
  }
)

export const selectDocumentWithPlugin = createSelector(
  [selectSelf, (_state, id: string | null) => id],
  (documents, id) => {
    const document = id ? documents[id] : null
    const plugin = editorPlugins.getByType(document?.plugin || '')
    return { document, plugin }
  }
)

export const selectDocumentPluginType = createSelector(
  [selectSelf, (_state, id: string) => id],
  (documents, id) => documents[id].plugin as EditorPluginType
)

export const selectStaticDocument = createDeepEqualSelector(
  [selectSelf, (_state, id: string) => id],
  (documents, id) => getStaticDocument({ documents, id })
)

export const selectStaticDocumentWithoutIds = createDeepEqualSelector(
  [selectSelf, (_state, id: string) => id],
  (documents, id) => getStaticDocument({ documents, id, omitId: true })
)

export const selectIsDocumentEmpty = createSelector(
  [selectSelf, (_state, id: string) => id],
  (documents, id: string) => {
    const document = documents[id]
    const plugin = editorPlugins.getByType(document.plugin)

    if (typeof plugin.isEmpty === 'function') {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const state = plugin.state.init(document.state, () => {})
      return plugin.isEmpty(state)
    }

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const initialState = plugin.state.createInitialState({
      createDocument: () => {},
    })
    return R.equals(document.state, initialState)
  }
)
export const selectChildTree: (
  state: State,
  id?: string
) => ChildTreeNode | null = createJsonStringifySelector(
  [selectSelf, (_state, id?: string) => id],
  (documents, id) => {
    return getChildTree(documents, id)
  }
)

export const selectChildTreeOfParent = createSelector(
  [selectSelf, (_state, id: string) => id],
  (documents, id) => {
    const tree = getChildTree(documents)
    return findChildTreeNodeParentById(tree, id)
  }
)

export const selectParentPluginType = createSelector(
  [selectSelf, (_state, id: string) => id],
  (documents, id) => {
    const tree = getChildTree(documents)
    const parentNode = findChildTreeNodeParentById(tree, id)
    return parentNode && documents[parentNode.id].plugin
  }
)

export const selectAncestorDocumentIds = createDeepEqualSelector(
  [selectSelf, (_state, id: string) => id],
  (documents, id) => {
    const root = getChildTree(documents)
    let current = id
    let path: string[] = [id]

    while (current !== root.id) {
      const parent = findChildTreeNodeParentById(root, current)
      if (!parent) return null
      current = parent.id
      path = [current, ...path]
    }

    return path
  }
)

export const selectAncestorPluginTypes = createDeepEqualSelector(
  [selectSelf, (_state, id: string) => id],
  (documents, id) => {
    const rootNode = getChildTree(documents)
    let currentId = id
    let pluginTypes: string[] = []

    while (currentId !== rootNode.id) {
      const parentNode = findChildTreeNodeParentById(rootNode, currentId)
      if (!parentNode) return null
      const pluginType = documents[parentNode.id].plugin
      pluginTypes = [pluginType, ...pluginTypes]
      currentId = parentNode.id
    }

    return pluginTypes
  }
)

export const selectMayManipulateSiblings = createSelector(
  [selectSelf, (_state, id: string) => id],
  (documents, id: string) => {
    const root = getChildTree(documents)

    const parentNode = findChildTreeNodeParentById(root, id)
    if (!parentNode) return false

    return documents[parentNode.id].plugin === EditorPluginType.Rows
  }
)
