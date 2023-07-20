import { faClone, faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import { useCallback } from 'react'
import { v4 } from 'uuid'

import { DropdownButton } from './dropdown-button'
import { useEditorStrings } from '@/contexts/logged-in-data-context'
import { usePlugins } from '@/serlo-editor/core/contexts/plugins-context'
import {
  DocumentState,
  insertPluginChildAfter,
  removePluginChild,
  selectParent,
  selectSerializedDocument,
  store,
  useAppDispatch,
} from '@/serlo-editor/store'

interface DefaultControlsProps {
  pluginId: string
}

const cloneDocumentWithNewIds = (document: DocumentState) => {
  const documentString = JSON.stringify(document)

  return JSON.parse(documentString, (key: string, value: unknown) =>
    key === 'id' ? v4() : value
  ) as DocumentState
}

// TODO: Think about renaming to "DefaultPluginControls" to make the scope explicit
// TODO: Also rename the folder to "plugin-controls" or "plugin-controls-dropdown"
export function DefaultControls({ pluginId }: DefaultControlsProps) {
  const dispatch = useAppDispatch()
  const pluginStrings = useEditorStrings().plugins
  const plugins = usePlugins()

  const handleDuplicatePlugin = useCallback(() => {
    const parent = selectParent(store.getState(), pluginId)
    if (!parent) return

    const document = selectSerializedDocument(store.getState(), pluginId)
    if (!document) return

    dispatch(
      insertPluginChildAfter({
        parent: parent.id,
        sibling: pluginId,
        document: cloneDocumentWithNewIds(document),
        plugins,
      })
    )
  }, [dispatch, pluginId, plugins])

  const handleRemovePlugin = useCallback(() => {
    const parent = selectParent(store.getState(), pluginId)
    if (!parent) return

    // TODO: If this is the only plugin inside the rows parent
    // we should probably replace it with an empty text plugin instead?

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
      />
      <DropdownButton
        onClick={handleRemovePlugin}
        label={pluginStrings.rows.remove}
        icon={faTrashAlt}
      />
    </>
  )
}
