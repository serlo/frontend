import { faClone, faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import { useCallback } from 'react'

import { AnchorLinkCopyTool } from './anchor-link-copy-tool'
import { DropdownButton } from './dropdown-button'
import { useEditorStrings } from '@/contexts/logged-in-data-context'
import { usePlugins } from '@/serlo-editor/core/contexts/plugins-context'
import {
  insertPluginChildAfter,
  removePluginChild,
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
  const plugins = usePlugins()

  const handleDuplicatePlugin = useCallback(() => {
    const parent = selectParent(store.getState(), pluginId)
    if (!parent) return

    const document = selectSerializedDocumentWithoutIds(
      store.getState(),
      pluginId
    )
    if (!document) return

    dispatch(
      insertPluginChildAfter({
        parent: parent.id,
        sibling: pluginId,
        document,
        plugins,
      })
    )
  }, [dispatch, pluginId, plugins])

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
          plugins,
        })
      )
    }

    dispatch(
      removePluginChild({
        parent: parent.id,
        child: pluginId,
        plugins,
      })
    )
  }, [dispatch, pluginId, plugins])

  return (
    <>
      <DropdownButton
        onClick={handleDuplicatePlugin}
        label={pluginStrings.rows.duplicate}
        icon={faClone}
        className="qa-duplicate-plugin-button"
      />
      <DropdownButton
        onClick={handleRemovePlugin}
        label={pluginStrings.rows.remove}
        icon={faTrashAlt}
        className="qa-remove-plugin-button"
      />
      <AnchorLinkCopyTool pluginId={pluginId} />
    </>
  )
}
