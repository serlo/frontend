import {
  store,
  selectAncestorDocumentIds,
  selectAncestorPluginTypes,
  selectDocument,
  ChildTreeNode,
  selectChildTreeOfParent,
} from '@editor/store'
import { EditorPluginType } from '@editor/types/editor-plugin-type'

import { checkIsAllowedNesting } from '../utils/check-is-allowed-nesting'

export function useCanDrop(
  id: string,
  draggingAbove: boolean,
  allowedPlugins: (EditorPluginType | string)[] | undefined
) {
  return function (dragId?: string) {
    return (
      dragId &&
      isAllowedChildPlugin(dragId) &&
      isAllowedNestedPlugin(dragId) &&
      !wouldDropInOwnChildren(dragId) &&
      !wouldDropAtInitialPosition(dragId)
    )
  }

  function isAllowedChildPlugin(dragId: string) {
    if (!allowedPlugins) return true
    const doc = selectDocument(store.getState(), dragId)
    return doc && allowedPlugins.includes(doc.plugin)
  }

  function isAllowedNestedPlugin(dragId: string) {
    const typesOfAncestors = selectAncestorPluginTypes(store.getState(), id)
    if (typesOfAncestors === null) return true

    const dragDocument = selectDocument(store.getState(), dragId)
    if (dragDocument === null) return true

    return checkIsAllowedNesting(dragDocument?.plugin, typesOfAncestors)
  }

  function wouldDropInOwnChildren(dragId: string) {
    const focusPath = selectAncestorDocumentIds(store.getState(), id) || []
    return focusPath.includes(dragId)
  }

  function wouldDropAtInitialPosition(dragId: string) {
    const parent = selectChildTreeOfParent(store.getState(), dragId)

    const dropIndex = getChildPosition(parent, id)
    // Different parents, so definitely not dropped at initial position
    if (dropIndex === null) return false
    const dragIndex = getChildPosition(parent, dragId)

    return draggingAbove
      ? dragIndex === dropIndex - 1
      : dragIndex === dropIndex + 1
  }

  function getChildPosition(
    parent: ChildTreeNode | null,
    childId: string
  ): number | null {
    if (!parent) return null
    const position = (parent.children ?? []).findIndex(
      (node) => node.id === childId
    )
    return position > -1 ? position : null
  }
}
