import { checkIsAllowedNesting } from '../utils/check-is-allowed-nesting'
import { usePlugins } from '@/serlo-editor/core/contexts/plugins-context'
import {
  store,
  findParent,
  selectDocument,
  selectAncestorPluginIds,
  selectAncestorPluginTypes,
  selectPluginTree,
  PluginTreeNode,
} from '@/serlo-editor/store'
import { EditorPluginType } from '@/serlo-editor-integration/types/editor-plugin-type'

export function useCanDrop(
  id: string,
  draggingAbove: boolean,
  allowedPlugins: (EditorPluginType | string)[] | undefined
) {
  const plugins = usePlugins()

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
    const typesOfAncestors = selectAncestorPluginTypes(store.getState(), {
      plugins,
      id,
    })
    if (typesOfAncestors === null) return true

    const dragDocument = selectDocument(store.getState(), dragId)
    if (dragDocument === null) return true

    return checkIsAllowedNesting(dragDocument?.plugin, typesOfAncestors)
  }

  function wouldDropInOwnChildren(dragId: string) {
    const focusPath = selectAncestorPluginIds(store.getState(), { plugins, id })
    return focusPath.includes(dragId)
  }

  function wouldDropAtInitialPosition(dragId: string) {
    const focusTree = selectPluginTree(store.getState(), plugins)
    if (!focusTree) return true
    const parent = findParent(focusTree, dragId)

    const dropIndex = getChildPosition(parent, id)
    // Different parents, so definitely not dropped at initial position
    if (dropIndex === null) return false
    const dragIndex = getChildPosition(parent, dragId)

    return draggingAbove
      ? dragIndex === dropIndex - 1
      : dragIndex === dropIndex + 1
  }

  function getChildPosition(
    parent: PluginTreeNode | null,
    childId: string
  ): number | null {
    if (!parent) return null
    const position = (parent.children ?? []).findIndex(
      (node) => node.id === childId
    )
    return position > -1 ? position : null
  }
}
