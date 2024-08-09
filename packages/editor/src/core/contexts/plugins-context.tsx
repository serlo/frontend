import { EditorPluginType } from '@editor/types/editor-plugin-type'
import React, {
  createContext,
  ReactNode,
  useState,
  useEffect,
  useRef,
} from 'react'

export const interactivePluginTypes = new Set([
  EditorPluginType.TextAreaExercise,
  EditorPluginType.ScMcExercise,
  EditorPluginType.H5p,
  EditorPluginType.BlanksExercise,
  EditorPluginType.InputExercise,
  EditorPluginType.Solution,
  EditorPluginType.DropzoneImage,
])

export interface PluginSelectionMenuContextType {
  showPluginModal: boolean
  setShowPluginModal: (show: boolean) => void
  addPlugin: insertNewPluginCallback
  openSuggestions: (
    insertPlugin: insertNewPluginCallback,
    insertIndex: number
  ) => void
}

export const PluginSelectionMenuContext =
  createContext<PluginSelectionMenuContextType>({
    showPluginModal: false,
    setShowPluginModal: () => {},
    addPlugin: (_pluginType) => {},
    openSuggestions: () => {},
  })

export type insertNewPluginCallback = (
  pluginType: string,
  insertIndex?: number
) => void

export function PluginSelectionMenuContextProvider({
  children,
}: {
  children: ReactNode
}) {
  const [showPluginModal, setShowPluginModal] = useState(false)
  const [insertPluginCallback, setInsertPluginCallback] =
    useState<insertNewPluginCallback | null>(null)
  const [savedInsertIndex, setSavedInsertIndex] = useState<number | null>(null)

  // Use a ref to store the current callback function
  const insertPluginCallbackRef = useRef<insertNewPluginCallback | null>(null)

  // Update the ref whenever the state changes
  useEffect(() => {
    insertPluginCallbackRef.current = insertPluginCallback
  }, [insertPluginCallback])

  const openSuggestions = (
    insertPlugin: insertNewPluginCallback,
    insertIndex: number
  ) => {
    setInsertPluginCallback(() => insertPlugin)
    setSavedInsertIndex(insertIndex)
    setShowPluginModal(true)
  }

  const addPlugin = (pluginType: string, insertIndex?: number) => {
    if (insertPluginCallbackRef.current) {
      const indexToUse =
        insertIndex !== undefined ? insertIndex : savedInsertIndex
      insertPluginCallbackRef.current(pluginType, indexToUse ?? undefined)
    }
    setShowPluginModal(false)
  }

  return (
    <PluginSelectionMenuContext.Provider
      value={{
        showPluginModal,
        setShowPluginModal,
        addPlugin,
        openSuggestions,
      }}
    >
      {children}
    </PluginSelectionMenuContext.Provider>
  )
}
