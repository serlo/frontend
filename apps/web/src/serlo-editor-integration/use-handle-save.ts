import { storeStateToLocalStorage } from '@editor/editor-ui/save/local-storage-notice'
import { useContext, useEffect, useState } from 'react'

import type { SupportedTypesSerializedState } from '@/mutations/use-set-entity-mutation/types'
import { SaveContext } from '@/serlo-editor-integration/context/save-context'

export function useHandleSave(
  visible: boolean,
  serializedRootState: SupportedTypesSerializedState
) {
  const { onSave } = useContext(SaveContext)
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

    onSave({
      ...serializedRootState,
      changes,
    })
      .then(() => {
        setTimeout(() => {
          storeStateToLocalStorage(null)
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
