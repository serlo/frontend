import { useScopedStore } from '@edtr-io/core'
import { serializeRootDocument } from '@edtr-io/store'
import { useEffect, useState } from 'react'

import { storeState } from '../serlo-editor'
import { useLoggedInData } from '@/contexts/logged-in-data-context'

export function SaveLocalButton({ visible }: { visible: boolean }) {
  const [savedToLocalstorage, setSavedToLocalstorage] = useState(false)
  const store = useScopedStore()

  useEffect(() => {
    //reset when modal opens
    if (visible) {
      setSavedToLocalstorage(false)
    }
  }, [visible])

  const loggedInData = useLoggedInData()
  if (!loggedInData) return null
  const editorStrings = loggedInData.strings.editor

  return (
    <button
      className="serlo-button serlo-make-interactive-primary mt-3"
      onClick={() => {
        const serializedRoot = serializeRootDocument()(store.getState())
        storeState(serializedRoot)
        setSavedToLocalstorage(true)
      }}
    >
      {savedToLocalstorage
        ? editorStrings.edtrIo.revisionSaved
        : editorStrings.edtrIo.saveRevision}
    </button>
  )
}
