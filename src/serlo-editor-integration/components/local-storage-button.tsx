import { useEffect, useState } from 'react'

import { storeStateToLocalStorage } from './local-storage-notice'
import { useEditorStrings } from '@/contexts/logged-in-data-context'
import { store, selectSerializedDocument } from '@/serlo-editor/store'
import { ROOT } from '@/serlo-editor/store/root/constants'

export function LocalStorageButton({ open }: { open: boolean }) {
  const [savedToLocalstorage, setSavedToLocalstorage] = useState(false)

  const edtrIoStrings = useEditorStrings().edtrIo
  useEffect(() => {
    //reset when modal opens
    if (open) setSavedToLocalstorage(false)
  }, [open])

  return (
    <button
      className="serlo-button-blue mt-3"
      onClick={() => {
        const serializedRoot = selectSerializedDocument(store.getState(), ROOT)
        storeStateToLocalStorage(serializedRoot)
        setSavedToLocalstorage(true)
      }}
    >
      {savedToLocalstorage
        ? edtrIoStrings.revisionSaved
        : edtrIoStrings.saveRevision}
    </button>
  )
}
