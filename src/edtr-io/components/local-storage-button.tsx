import { useEffect, useState } from 'react'
import { useScopedStore } from 'test-edtr-io/core'
import { serializeRootDocument } from 'test-edtr-io/store'

import { storeStateToLocalStorage } from './local-storage-notice'
import { useLoggedInData } from '@/contexts/logged-in-data-context'

export function LocalStorageButton({ open }: { open: boolean }) {
  const [savedToLocalstorage, setSavedToLocalstorage] = useState(false)
  const store = useScopedStore()

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
        const serializedRoot = serializeRootDocument()(store.getState())
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
