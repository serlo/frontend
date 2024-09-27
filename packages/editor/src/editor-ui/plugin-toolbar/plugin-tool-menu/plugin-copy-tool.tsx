import { showToastNotice } from '@editor/editor-ui/show-toast-notice'
import { useEditStrings } from '@editor/i18n/edit-strings-provider'
import { selectStaticDocumentWithoutIds, store } from '@editor/store'
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
  const editorStrings = useEditStrings()

  const handleOnClick = useCallback(() => {
    const document = selectStaticDocumentWithoutIds(store.getState(), pluginId)
    const rowsDocument = { plugin: 'rows', state: [document] }

    void navigator.clipboard.writeText(JSON.stringify(rowsDocument))
    showToastNotice(editorStrings.edtrIo.pluginCopySuccess, 'success', 2000)
    showToastNotice(
      '👉 ' + editorStrings.edtrIo.pluginCopyInfo,
      undefined,
      4000
    )
  }, [pluginId, editorStrings])

  if (!navigator.clipboard) return null

  return (
    <DropdownButton
      onClick={handleOnClick}
      label={editorStrings.edtrIo.pluginCopyButtonLabel}
      icon={faCopy}
      separatorTop={!noSeparator}
      dataQa="plugin-copy-tool-button"
    />
  )
}
