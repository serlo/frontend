import { createContext, ReactNode } from 'react'
import {
  Provider as ReduxProvider,
  ProviderProps,
  ReactReduxContextValue,
  createDispatchHook,
  createSelectorHook,
  createStoreHook,
} from 'react-redux'

import { Action, State } from '../store'

export const EditableContext = createContext<boolean>(true)

export const EditorContext = createContext(
  undefined as unknown as ReactReduxContextValue<State>
)

export const ErrorContext = createContext<
  ((error: Error, errorInfo: { componentStack: string }) => void) | undefined
>(undefined)

/**
 * Store Provider
 *
 * @param props - The {@link https://react-redux.js.org/api/provider#props | ProviderProps}
 */
export function Provider(
  props: ProviderProps<Action> & { children: ReactNode }
) {
  return <ReduxProvider {...props} context={EditorContext} />
}

/**
 * Custom Redux hooks created in order not to clash with consumer's Redux context
 * https://react-redux.js.org/api/hooks#custom-context
 */
export const useDispatch = createDispatchHook(EditorContext)
export const useSelector = createSelectorHook(EditorContext)
export const useStore = createStoreHook(EditorContext)
