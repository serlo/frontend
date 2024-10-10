import { showToastNotice } from '@editor/editor-ui/show-toast-notice'
import { useEditStrings } from '@editor/i18n/edit-strings-provider'
import { selectStaticDocumentWithoutIds, useStore } from '@editor/store'
import { faCopy } from '@fortawesome/free-solid-svg-icons'
import { useCallback } from 'react'

import { DropdownButton } from './dropdown-button'

interface PluginCopyToolProps {
  pluginId: string
  noSeparator?: boolean
}
/**
 * plugin to copy plugin's editor state to the clipboard
 */
export function PluginCopyTool({ pluginId, noSeparator }: PluginCopyToolProps) {
  const rowsStrings = useEditStrings().plugins.rows
  const store = useStore()

  const handleOnClick = useCallback(() => {
    const document = selectStaticDocumentWithoutIds(store.getState(), pluginId)
    const rowsDocument = { plugin: 'rows', state: [document] }

    void navigator.clipboard.writeText(JSON.stringify(rowsDocument))
    showToastNotice(rowsStrings.copySuccess, 'success', 2000)
    showToastNotice('👉 ' + rowsStrings.pluginCopyInfo, undefined, 4000)
  }, [pluginId, rowsStrings])

  if (!navigator.clipboard) return null

  return (
    <DropdownButton
      onClick={handleOnClick}
      label={rowsStrings.pluginCopyButtonLabel}
      icon={faCopy}
      separatorTop={!noSeparator}
      dataQa="plugin-copy-tool-button"
    />
  )
}
