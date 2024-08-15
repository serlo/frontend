import { EditorPluginType } from '@editor/types/editor-plugin-type'
import { createSelector } from '@reduxjs/toolkit'

import {
  getChildTree,
  findChildTreeNodeParentById,
  getStaticDocument,
  isPluginEmpty,
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
  (documents, id: string) => isPluginEmpty(documents[id])
)

export const selectEmptyTextPluginChildrenIndexes = createSelector(
  [selectSelf, (_state, id: string) => id],
  (documents, id: string) => {
    const { children } = getChildTree(documents, id)
    if (!children) return []

    const emptyIndexes = children
      .map((child, index) => {
        const childDocument = documents[child.id]

        return childDocument.plugin === EditorPluginType.Text &&
          isPluginEmpty(childDocument)
          ? index
          : null
      })
      .filter(Number.isInteger)

    return emptyIndexes as number[]
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
