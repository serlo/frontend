import React, {
  createContext,
  ReactNode,
  useState,
  useEffect,
  useRef,
} from 'react'

export interface PluginSelectionMenuContextType {
  showSuggestions: boolean
  setShowSuggestions: (show: boolean) => void
  addPlugin: insertNewPluginCallback
  openSuggestions: (
    insertPlugin: insertNewPluginCallback,
    insertIndex: number
  ) => void
}

export const PluginSelectionMenuContext =
  createContext<PluginSelectionMenuContextType>({
    showSuggestions: false,
    setShowSuggestions: () => {},
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
  const [showSuggestions, setShowSuggestions] = useState(false)
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
    setShowSuggestions(true)
  }

  const addPlugin = (pluginType: string, insertIndex?: number) => {
    if (insertPluginCallbackRef.current) {
      const indexToUse =
        insertIndex !== undefined ? insertIndex : savedInsertIndex
      insertPluginCallbackRef.current(pluginType, indexToUse ?? undefined)
    }
  }

  return (
    <PluginSelectionMenuContext.Provider
      value={{
        showSuggestions,
        setShowSuggestions,
        addPlugin,
        openSuggestions,
      }}
    >
      {children}
    </PluginSelectionMenuContext.Provider>
  )
}
