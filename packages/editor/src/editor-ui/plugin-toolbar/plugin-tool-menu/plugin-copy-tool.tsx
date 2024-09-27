import { showToastNotice } from '@editor/editor-ui/show-toast-notice'
import { selectStaticDocumentWithoutIds, store } from '@editor/store'
import { useEditorStrings } from '@editor/utils/use-editor-strings'
import { useInstanceData } from '@editor/utils/use-instance-data'
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
  const editorStrings = useEditorStrings()
  const { strings } = useInstanceData()

  const handleOnClick = useCallback(() => {
    const document = selectStaticDocumentWithoutIds(store.getState(), pluginId)
    const rowsDocument = { plugin: 'rows', state: [document] }

    void navigator.clipboard.writeText(JSON.stringify(rowsDocument))
    showToastNotice(strings.share.copySuccess, 'success', 2000)
    showToastNotice(
      '👉 ' + editorStrings.edtrIo.pluginCopyInfo,
      undefined,
      4000
    )
  }, [pluginId, strings, editorStrings])

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
