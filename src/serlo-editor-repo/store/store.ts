import * as R from 'ramda'
import {
  applyMiddleware,
  compose,
  createStore as createReduxStore,
  PreloadedState,
  Store,
  StoreEnhancer,
} from 'redux'
import _createSagaMiddleware from 'redux-saga'

import { EditorPlugin } from '../internal__plugin'
import { Action, InternalAction } from './actions'
import { reducer } from './reducer'
import { serializeRootDocument } from './root/reducer'
import { saga } from './saga'
import { InternalState, SelectorReturnType, State } from './storetypes'

const createSagaMiddleware = _createSagaMiddleware

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose
  }
}

const composeEnhancers =
  (typeof window !== 'undefined' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose

/**
 * Creates the Edtr.io store
 *
 * @param options - The options
 * @returns The Edtr.io store
 */
export function createStore<K extends string>(
  options: StoreOptions<K>
): {
  store: Store<State, Action>
} {
  const { scopes } = options
  const sagaMiddleware = createSagaMiddleware()
  const defaultEnhancer = applyMiddleware(sagaMiddleware)
  const enhancer = composeEnhancers(defaultEnhancer)

  const initialStates = R.mapObjIndexed((scope) => {
    return {
      plugins: scope,
      documents: {},
      focus: null,
      root: null,
      history: {
        undoStack: [],
        redoStack: [],
        pendingChanges: 0,
      },
    }
  }, scopes)

  // eslint-disable-next-line @typescript-eslint/ban-types
  const store = createReduxStore<InternalState, InternalAction, {}, {}>(
    reducer,
    // Redux does something weird with `unknown` values.
    initialStates as unknown as PreloadedState<InternalState>,
    enhancer
  ) as Store<State, Action>
  sagaMiddleware.run(saga)

  return { store }
}

export interface StoreOptions<K extends string> {
  scopes: Record<string, Record<K, EditorPlugin>>
  createEnhancer: StoreEnhancerFactory
}

export type StoreEnhancerFactory = (
  defaultEnhancer: StoreEnhancer
) => StoreEnhancer

export type ChangeListener = (payload: {
  changed: boolean
  getDocument: () => SelectorReturnType<typeof serializeRootDocument>
}) => void
