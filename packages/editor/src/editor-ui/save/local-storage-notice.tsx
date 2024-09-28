import type { EditorProps } from '@editor/core'
import { useEditStrings } from '@editor/i18n/edit-strings-provider'
import { Dispatch, SetStateAction } from 'react'
import { debounce } from 'ts-debounce'

export interface LocalStorageNoticeProps {
  useStored: boolean
  setUseStored: Dispatch<SetStateAction<boolean>>
}

type StateOrNull = EditorProps['initialState'] | null
interface Stored {
  [key: string]: StateOrNull
}

const storeKey = 'serlo-editor'

export function LocalStorageNotice({
  useStored,
  setUseStored,
}: LocalStorageNoticeProps) {
  const storageStrings = useEditStrings().edtrIo.localStorage

  const stored = getStateFromLocalStorage()

  if (!stored) return null

  return (
    <div className="m-side mt-12 rounded-2xl bg-editor-primary-50 p-side">
      <>
        {storageStrings[useStored ? 'restoreInitial' : 'found']}
        <br />
        <button
          className="serlo-button-editor-primary mt-2"
          onClick={() => {
            if (useStored) {
              if (window.confirm(storageStrings.confirmRestore)) {
                storeStateToLocalStorage(null)
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
  const storedData = localStorage.getItem(storeKey)
  if (!storedData) return null

  const parsedData = JSON.parse(storedData) as Stored
  return parsedData[window.location.pathname]
}

export function storeStateToLocalStorage(state: StateOrNull) {
  // eslint-disable-next-line no-console
  console.log('editor: saving state in browser localstorage')

  const storedData = localStorage.getItem(storeKey)
  const parsedData = storedData ? (JSON.parse(storedData) as Stored) : {}

  parsedData[window.location.pathname] = state
  localStorage.setItem(storeKey, JSON.stringify(parsedData))
}

export const debouncedStoreToLocalStorage = debounce(
  (state: StateOrNull) => storeStateToLocalStorage(state),
  5000
)
