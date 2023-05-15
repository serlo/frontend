import {
  createContext,
  ReactNode,
  useContext,
  useCallback,
  useMemo,
} from 'react'
import {
  Provider as ReduxProvider,
  ProviderProps,
  ReactReduxContextValue,
  createDispatchHook,
  createSelectorHook,
  createStoreHook,
} from 'react-redux'
import { Unsubscribe } from 'redux'

import { Action, getScope, ScopedState, ScopedStore, State } from '../store'

export const ScopeContext = createContext<{
  scope: string
  editable?: boolean
}>({ scope: '' })

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
 * @param enforcedScope - If provided, used as the scope instead of the current scope
 */
export function useScope(enforcedScope?: string) {
  const { scope } = useContext(ScopeContext)
  return enforcedScope === undefined ? scope : enforcedScope
}

export const useDispatch = createDispatchHook(EditorContext)

/**
 * React Hook to dispatch an action in the current scope
 *
 * @param enforcedScope - If provided, used as the scope instead of the current scope
 */
export function useScopedDispatch(enforcedScope?: string) {
  const scope = useScope(enforcedScope)
  const dispatch = useDispatch()
  return useCallback(
    (scopedAction: (scope: string) => Action) => {
      dispatch(scopedAction(scope))
    },
    [dispatch, scope]
  )
}

function scopeDispatch(dispatch: (action: Action) => void, scope: string) {
  return (scopedAction: (scope: string) => Action) => {
    dispatch(scopedAction(scope))
  }
}

export const useSelector = createSelectorHook(EditorContext)
/**
 * React Hook to get the value of an selector in the current scope
 *
 * @param scopedSelector - The selector
 * @param enforcedScope - If provided, used as the scope instead of the current scope
 * @returns The value of the selector in the current scope
 */
export function useScopedSelector<T>(
  scopedSelector: (state: ScopedState) => T,
  enforcedScope?: string
) {
  const scope = useScope(enforcedScope)
  return useSelector((state) => scopedSelector(getScope(state, scope)))
}

export const useStore = createStoreHook(EditorContext)
/**
 * React Hook to obtain a reference to the scoped store
 *
 * @param enforcedScope - If provided, used as the scope instead of the current scope
 * @returns The scoped store
 */
export function useScopedStore(enforcedScope?: string) {
  const scope = useScope(enforcedScope)
  const store = useStore()
  return useMemo((): ScopedStore => {
    return {
      dispatch: scopeDispatch(store.dispatch, scope),
      getState: () => {
        return getScope(store.getState(), scope)
      },
      subscribe: (listener: () => void): Unsubscribe => {
        return store.subscribe(listener)
      },
    }
  }, [scope, store])
}
