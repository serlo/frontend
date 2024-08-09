import { EditorPluginType } from '@editor/types/editor-plugin-type'
import React, {
  createContext,
  ReactNode,
  useReducer,
  useRef,
  useEffect,
  useCallback,
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

// Action types for useReducer
type ActionType =
  | { type: 'SET_SHOW_PLUGIN_MODAL'; payload: boolean }
  | {
      type: 'SET_INSERT_PLUGIN_CALLBACK'
      payload: insertNewPluginCallback | null
    }
  | { type: 'SET_SAVED_INSERT_INDEX'; payload: number | null }

// Plugin Menu Context type
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

// Initial state for the reducer
const initialState = {
  showPluginModal: false,
  insertPluginCallback: null as insertNewPluginCallback | null,
  savedInsertIndex: null as number | null,
}

// Reducer function to handle state transitions
function pluginMenuReducer(state: typeof initialState, action: ActionType) {
  switch (action.type) {
    case 'SET_SHOW_PLUGIN_MODAL':
      return { ...state, showPluginModal: action.payload }
    case 'SET_INSERT_PLUGIN_CALLBACK':
      return { ...state, insertPluginCallback: action.payload }
    case 'SET_SAVED_INSERT_INDEX':
      return { ...state, savedInsertIndex: action.payload }
    default:
      return state
  }
}

// Action creators
const setShowPluginModal = (show: boolean): ActionType => ({
  type: 'SET_SHOW_PLUGIN_MODAL',
  payload: show,
})

const setInsertPluginCallback = (
  callback: insertNewPluginCallback | null
): ActionType => ({
  type: 'SET_INSERT_PLUGIN_CALLBACK',
  payload: callback,
})

const setSavedInsertIndex = (index: number | null): ActionType => ({
  type: 'SET_SAVED_INSERT_INDEX',
  payload: index,
})

// Create Plugin Menu context
export const PluginMenuContext = createContext<PluginMenuContextType>({
  showPluginModal: false,
  setShowPluginModal: () => {},
  addPlugin: (_pluginType) => {},
  openSuggestions: () => {},
  allowedChildPlugins: [],
})

export function PluginMenuContextProvider({
  children,
  allowedChildPlugins,
}: {
  children: ReactNode
  allowedChildPlugins: string[] | undefined
}) {
  const [state, dispatch] = useReducer(pluginMenuReducer, initialState)

  // Use a ref to store the current callback function
  const insertPluginCallbackRef = useRef<insertNewPluginCallback | null>(null)

  // Sync the ref with the current state
  useEffect(() => {
    insertPluginCallbackRef.current = state.insertPluginCallback
  }, [state.insertPluginCallback])

  const openSuggestions = useCallback(
    (insertPlugin: insertNewPluginCallback, insertIndex: number) => {
      dispatch(setInsertPluginCallback(insertPlugin))
      dispatch(setSavedInsertIndex(insertIndex))
      dispatch(setShowPluginModal(true))
    },
    [dispatch]
  )

  const addPlugin = useCallback(
    (pluginType: string, insertIndex?: number) => {
      if (insertPluginCallbackRef.current) {
        const indexToUse =
          insertIndex !== undefined ? insertIndex : state.savedInsertIndex
        insertPluginCallbackRef.current(pluginType, indexToUse ?? undefined)
      }
      dispatch(setShowPluginModal(false))
    },
    [state.savedInsertIndex]
  )

  return (
    <PluginMenuContext.Provider
      value={{
        showPluginModal: state.showPluginModal,
        setShowPluginModal: (show: boolean) =>
          dispatch(setShowPluginModal(show)),
        addPlugin,
        openSuggestions,
        allowedChildPlugins,
      }}
    >
      {children}
    </PluginMenuContext.Provider>
  )
}
