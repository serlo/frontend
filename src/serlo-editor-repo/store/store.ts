import {
  applyMiddleware,
  createStore as createReduxStore,
  PreloadedState,
  Store,
} from 'redux'
import _createSagaMiddleware from 'redux-saga'

import { Action, InternalAction } from './actions'
import { reducer } from './reducer'
import { serializeRootDocument } from './root/reducer'
import { saga } from './saga'
import { initialState } from './state'
import { SelectorReturnType, State } from './types'

const createSagaMiddleware = _createSagaMiddleware

/**
 * Creates the Edtr.io store
 *
 * @param options - The options
 * @returns The Edtr.io store
 */
export function createStore(): {
  store: Store<State, Action>
} {
  const sagaMiddleware = createSagaMiddleware()
  const middlewareEnhancer = applyMiddleware(sagaMiddleware)

  // eslint-disable-next-line @typescript-eslint/ban-types
  const store = createReduxStore<State, InternalAction, {}, {}>(
    reducer,
    // Redux does something weird with `unknown` values.
    initialState as unknown as PreloadedState<State>,
    middlewareEnhancer
  ) as Store<State, Action>
  sagaMiddleware.run(saga)

  return { store }
}

export type ChangeListener = (payload: {
  changed: boolean
  getDocument: () => SelectorReturnType<typeof serializeRootDocument>
}) => void
