import { faClone, faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import { useCallback } from 'react'

import { AnchorLinkCopyTool } from './anchor-link-copy-tool'
import { DropdownButton } from './dropdown-button'
import { useEditorStrings } from '@/contexts/logged-in-data-context'
import {
  focusNext,
  insertPluginChildAfter,
  removePluginChild,
  selectFocusTree,
  selectParent,
  selectSerializedDocumentWithoutIds,
  store,
  useAppDispatch,
} from '@/serlo-editor/store'
import { EditorPluginType } from '@/serlo-editor-integration/types/editor-plugin-type'

interface PluginDefaultToolsProps {
  pluginId: string
}

// tools for most plugins (duplicate / remove)
export function PluginDefaultTools({ pluginId }: PluginDefaultToolsProps) {
  const dispatch = useAppDispatch()
  const pluginStrings = useEditorStrings().plugins

  const handleDuplicatePlugin = useCallback(() => {
    const state = store.getState()
    const parent = selectParent(state, pluginId)
    if (!parent) return

    const document = selectSerializedDocumentWithoutIds(state, pluginId)
    if (!document) return

    dispatch(
      insertPluginChildAfter({
        parent: parent.id,
        sibling: pluginId,
        document,
      })
    )
    setTimeout(() => {
      dispatch(focusNext(selectFocusTree(state)))
    })
  }, [dispatch, pluginId])

  const handleRemovePlugin = useCallback(() => {
    const parent = selectParent(store.getState(), pluginId)
    if (!parent || !parent.children?.length) return

    const isOnlyChild = parent.children?.length === 1

    // make sure rows plugin is not empty
    if (isOnlyChild) {
      dispatch(
        insertPluginChildAfter({
          parent: parent.id,
          sibling: pluginId,
          document: { plugin: EditorPluginType.Text },
        })
      )
      setTimeout(() => {
        dispatch(focusNext(selectFocusTree(store.getState())))
      })
    }

    dispatch(
      removePluginChild({
        parent: parent.id,
        child: pluginId,
      })
    )
  }, [dispatch, pluginId])

  return (
    <>
      <DropdownButton
        onClick={handleDuplicatePlugin}
        label={pluginStrings.rows.duplicate}
        icon={faClone}
        dataQa="duplicate-plugin-button"
      />
      <DropdownButton
        onClick={handleRemovePlugin}
        label={pluginStrings.rows.remove}
        icon={faTrashAlt}
        dataQa="remove-plugin-button"
      />
      <AnchorLinkCopyTool pluginId={pluginId} />
    </>
  )
}
