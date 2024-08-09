import { EditorPluginType } from '@editor/types/editor-plugin-type'
import React, {
  createContext,
  ReactNode,
  useState,
  useEffect,
  useRef,
} from 'react'

// Define interactive plugin types
export const interactivePluginTypes = new Set([
  EditorPluginType.TextAreaExercise,
  EditorPluginType.ScMcExercise,
  EditorPluginType.H5p,
  EditorPluginType.BlanksExercise,
  EditorPluginType.InputExercise,
  EditorPluginType.Solution,
  EditorPluginType.DropzoneImage,
])

// Combined context type
export interface PluginMenuContextType {
  showPluginModal: boolean
  setShowPluginModal: (show: boolean) => void
  addPlugin: insertNewPluginCallback
  openSuggestions: (
    insertPlugin: insertNewPluginCallback,
    insertIndex: number
  ) => void
  allowedChildPlugins: string[] | undefined
}

// Insert plugin callback type
export type insertNewPluginCallback = (
  pluginType: string,
  insertIndex?: number
) => void

// Create combined context
export const PluginMenuContext = createContext<PluginMenuContextType>({
  showPluginModal: false,
  setShowPluginModal: () => {},
  addPlugin: (_pluginType) => {},
  openSuggestions: () => {},
  allowedChildPlugins: [],
})

// Combined context provider component
export function PluginMenuContextProvider({
  children,
  allowedChildPlugins,
}: {
  children: ReactNode
  allowedChildPlugins: string[] | undefined
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
    <PluginMenuContext.Provider
      value={{
        showPluginModal,
        setShowPluginModal,
        addPlugin,
        openSuggestions,
        allowedChildPlugins,
      }}
    >
      {children}
    </PluginMenuContext.Provider>
  )
}
