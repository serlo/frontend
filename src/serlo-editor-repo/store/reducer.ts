import { applyActions, InternalAction, setPartialState } from './actions'
import { documentsReducer } from './documents/reducer'
import { focusReducer } from './focus/reducer'
import { historyReducer } from './history/reducer'
import { pluginsReducer } from './plugins/reducer'
import { rootReducer } from './root/reducer'
import { initialState } from './state'
import { State } from './types'

/**
 * The Edtr.io root reducer
 *
 * @param state - The current {@link State | state} or `undefined`
 * @param action - The {@link Action | action} to dispatch
 * @returns The new {@link State | state}
 */
export function reducer(
  state: State = initialState,
  action: InternalAction
): State {
  if (action.type === applyActions.type) {
    return action.payload.reduce(reducer, state)
  }

  if (action.type === setPartialState.type) {
    return {
      ...state,
      ...action.payload,
    }
  }

  return {
    documents: documentsReducer(action, state),
    focus: focusReducer(action, state),
    history: historyReducer(action, state),
    plugins: pluginsReducer(action, state),
    root: rootReducer(action, state),
  }
}
