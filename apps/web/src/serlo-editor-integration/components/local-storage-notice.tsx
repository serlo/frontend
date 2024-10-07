import type { EditorProps } from '@editor/core'
import { useEditStrings } from '@editor/i18n/edit-strings-provider'
import { Dispatch, SetStateAction } from 'react'
import { debounce } from 'ts-debounce'

import type { LooseEdtrData } from '../serlo-editor'

export interface LocalStorageNoticeProps {
  useStored: boolean
  setUseStored: Dispatch<SetStateAction<boolean>>
}

export function LocalStorageNotice({
  useStored,
  setUseStored,
}: LocalStorageNoticeProps) {
  const storageStrings = useEditStrings().edtrIo.localStorage

  const stored = getStateFromLocalStorage()

  if (!stored) return null

  return (
    <div className="m-side mt-12 rounded-2xl bg-editor-primary-50 p-side md:-mt-9">
      <>
        {storageStrings[useStored ? 'restoreInitial' : 'found']}
        <br />
        <button
          className="serlo-button-editor-primary mt-2"
          onClick={() => {
            if (useStored) {
              if (window.confirm(storageStrings.confirmRestore)) {
                storeStateToLocalStorage(undefined)
                setUseStored(false)
              }
            } else setUseStored(true)
          }}
        >
          {storageStrings[useStored ? 'restoreInitialButton' : 'foundButton']}
        </button>
      </>
    </div>
  )
}

export function getStateFromLocalStorage() {
  const edtr = localStorage.getItem('edtr')
  if (!edtr) return

  const storedStates = JSON.parse(edtr) as LooseEdtrData
  return storedStates[window.location.pathname]
}

export function storeStateToLocalStorage(
  state?: EditorProps['initialState'] | null
) {
  // eslint-disable-next-line no-console
  console.log('edtr: saving state in browser localstorage')
  const currentValue = localStorage.getItem('edtr')
  const edtr = currentValue ? (JSON.parse(currentValue) as LooseEdtrData) : {}

  edtr[window.location.pathname] = state
  localStorage.setItem('edtr', JSON.stringify(edtr))
}

export const debouncedStoreToLocalStorage = debounce(
  (state?: EditorProps['initialState'] | null) =>
    storeStateToLocalStorage(state),
  5000
)
