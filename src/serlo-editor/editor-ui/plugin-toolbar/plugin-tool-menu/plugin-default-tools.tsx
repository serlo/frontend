import { faClone, faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import { useEditorStrings } from '@serlo/serlo-editor'
import { useCallback, useContext } from 'react'

import { AnchorLinkCopyTool } from './anchor-link-copy-tool'
import { DropdownButton } from './dropdown-button'
// serlo specific
import { UuidsContext } from '@/contexts/uuids-context'
import {
  insertPluginChildAfter,
  removePluginChild,
  selectChildTreeOfParent,
  selectStaticDocumentWithoutIds,
  store,
  useAppDispatch,
} from '@/serlo-editor/store'
import { EditorPluginType } from '@/serlo-editor/types/editor-plugin-type'

interface PluginDefaultToolsProps {
  pluginId: string
}

// tools for most plugins (duplicate / remove)
export function PluginDefaultTools({ pluginId }: PluginDefaultToolsProps) {
  const dispatch = useAppDispatch()
  const pluginStrings = useEditorStrings().plugins

  // using useContext directly so result can also be null for edusharing
  const serloEntityId = useContext(UuidsContext)?.entityId

  const handleDuplicatePlugin = useCallback(() => {
    const parent = selectChildTreeOfParent(store.getState(), pluginId)
    if (!parent) return

    const document = selectStaticDocumentWithoutIds(store.getState(), pluginId)
    if (!document) return

    dispatch(
      insertPluginChildAfter({
        parent: parent.id,
        sibling: pluginId,
        document,
      })
    )
  }, [dispatch, pluginId])

  const handleRemovePlugin = useCallback(() => {
    const parent = selectChildTreeOfParent(store.getState(), pluginId)
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
      {serloEntityId ? (
        <AnchorLinkCopyTool serloEntityId={serloEntityId} pluginId={pluginId} />
      ) : null}
    </>
  )
}
