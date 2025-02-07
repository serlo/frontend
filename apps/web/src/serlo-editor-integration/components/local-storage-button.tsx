import type { AnyEditorDocument, StorageFormat } from '@editor/package'
import { type MutableRefObject, useEffect, useState } from 'react'

import { useInstanceData } from '@/contexts/instance-context'

type StateOrNull = AnyEditorDocument | null
interface Stored {
  [key: string]: StateOrNull
}

const storeKey = 'serlo-editor'

export function LocalStorageButton({
  open,
  editorState,
}: {
  open: boolean
  editorState: MutableRefObject<StorageFormat>
}) {
  const [savedToLocalstorage, setSavedToLocalstorage] = useState(false)
  const strings = useInstanceData().strings

  useEffect(() => {
    //reset when modal opens
    if (open) setSavedToLocalstorage(false)
  }, [open])

  return (
    <button
      className="serlo-button-edit-primary mt-3"
      onClick={() => {
        const staticRoot = editorState.current.document
        storeStateToLocalStorage(staticRoot)
        setSavedToLocalstorage(true)
      }}
    >
      {savedToLocalstorage
        ? strings.revisions.revisionSaved
        : strings.revisions.saveRevision}
    </button>
  )
}

export function storeStateToLocalStorage(state: StateOrNull) {
  // eslint-disable-next-line no-console
  console.log('editor: saving state in browser localstorage')

  const storedData = localStorage.getItem(storeKey)
  const parsedData = storedData ? (JSON.parse(storedData) as Stored) : {}

  parsedData[window.location.pathname] = state
  localStorage.setItem(storeKey, JSON.stringify(parsedData))
}
