import { useEffect, useState } from 'react'

import { storeStateToLocalStorage } from './local-storage-notice'
import { useLoggedInData } from '@/contexts/logged-in-data-context'
import { store, selectSerializedRootDocument } from '@/serlo-editor/store'

export function LocalStorageButton({ open }: { open: boolean }) {
  const [savedToLocalstorage, setSavedToLocalstorage] = useState(false)

  useEffect(() => {
    //reset when modal opens
    if (open) setSavedToLocalstorage(false)
  }, [open])

  const loggedInData = useLoggedInData()
  if (!loggedInData) return null
  const editorStrings = loggedInData.strings.editor

  return (
    <button
      className="serlo-button-blue mt-3"
      onClick={() => {
        const serializedRoot = selectSerializedRootDocument(store.getState())
        storeStateToLocalStorage(serializedRoot)
        setSavedToLocalstorage(true)
      }}
    >
      {savedToLocalstorage
        ? editorStrings.edtrIo.revisionSaved
        : editorStrings.edtrIo.saveRevision}
    </button>
  )
}
