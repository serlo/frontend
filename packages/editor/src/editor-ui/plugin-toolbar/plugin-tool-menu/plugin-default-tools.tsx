import { useEditStrings } from '@editor/i18n/edit-strings-provider'
import { AiChangePluginTool } from '@editor/plugins/ai-generation/plugin-change-tool/ai-change-plugin-tool'
import {
  insertPluginChildAfter,
  removePluginChild,
  selectChildTreeOfParent,
  selectParentPluginType,
  selectStaticDocumentWithoutIds,
  useStore,
  useAppDispatch,
} from '@editor/store'
import { EditorPluginType } from '@editor/types/editor-plugin-type'
import { SerloOnlyFeaturesContext } from '@editor/utils/serlo-extra-context'
import { faClone, faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import { useCallback, useContext, useMemo } from 'react'

import { AnchorLinkCopyTool } from './anchor-link-copy-tool'
import { DropdownButton } from './dropdown-button'
import { PluginCopyTool } from './plugin-copy-tool'

interface PluginDefaultToolsProps {
  pluginId: string
}

// tools for most plugins (duplicate / remove)
export function PluginDefaultTools({ pluginId }: PluginDefaultToolsProps) {
  const store = useStore()
  const dispatch = useAppDispatch()
  const pluginStrings = useEditStrings().plugins

  const hasRowsParent = useMemo(
    () =>
      selectParentPluginType(store.getState(), pluginId) ===
      EditorPluginType.Rows,
    [pluginId, store]
  )

  const serloContext = useContext(SerloOnlyFeaturesContext)
  const showAiTools = serloContext.isSerlo && !serloContext.isProduction

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
  }, [dispatch, pluginId, store])

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
  }, [dispatch, pluginId, store])

  return (
    <>
      {hasRowsParent ? (
        <>
          {showAiTools ? <AiChangePluginTool pluginId={pluginId} /> : null}
          <DropdownButton
            separatorTop={showAiTools}
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
        </>
      ) : null}

      <PluginCopyTool pluginId={pluginId} noSeparator={!hasRowsParent} />
      {hasRowsParent ? <AnchorLinkCopyTool pluginId={pluginId} /> : null}
    </>
  )
}
