import { faClone, faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import { useCallback } from 'react'

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

interface DefaultControlsProps {
  pluginId: string
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
