import { useEffect, useState } from 'react'

import { type SerializedAbstractTemplatePluginDocument } from './convert-editor-response-to-state'
import type { SerloEditorProps } from './serlo-editor'

export function useHandleSave(
  visible: boolean,
  editorDocumentState: SerializedAbstractTemplatePluginDocument,
  onSave: SerloEditorProps['onSave']
) {
  const [pending, setPending] = useState(false)
  const [hasError, setHasError] = useState(false)

  useEffect(() => {
    //reset when modal opens
    if (!visible) return
    setPending(false)
    setHasError(false)
  }, [visible])

  const handleSave = (changes?: string) => {
    setPending(true)

    onSave({ ...editorDocumentState, changes })
      .then(() => {
        setTimeout(() => {
          setPending(false)
          setHasError(false)
        }, 200)
      })
      .catch((e) => {
        // eslint-disable-next-line no-console
        console.log('error', e)
        setTimeout(() => {
          setPending(false)
          setHasError(true)
        }, 200)
      })
  }

  return { handleSave, pending, hasError }
}
