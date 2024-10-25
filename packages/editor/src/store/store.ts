import { configureStore } from '@reduxjs/toolkit'
import {
  TypedUseSelectorHook,
  useDispatch,
  useSelector,
  useStore as useReduxStore,
} from 'react-redux'
import createSagaMiddleware from 'redux-saga'

import { documentsSlice } from './documents'
import { focusSlice } from './focus'
import { historySlice } from './history'
import { saga } from './saga'

function createStoreInstance() {
  const sagaMiddleware = createSagaMiddleware()

  const store = configureStore({
    reducer: {
      documents: documentsSlice.reducer,
      focus: focusSlice.reducer,
      history: historySlice.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        // https://github.com/serlo/backlog/issues/127
        serializableCheck: {
          ignoredActions: [
            'documents/runChangeDocumentSaga',
            'history/commitTemporaryActionToHistory',
          ],
          ignoredActionPaths: [/.*\.state.src.pending$/],
          ignoredPaths: [/.*\.state.src.pending$/],
        },
      }).concat([sagaMiddleware]),
  })

  sagaMiddleware.run(saga)

  return store
}

// Creates a new store instance. One per editor instance, otherwise they'll
// share state.
export function createStore() {
  return createStoreInstance()
}

/**
 * Type safe useStore hook
 */
export function useStore() {
  return useReduxStore<RootState>()
}

type Store = ReturnType<typeof createStoreInstance>

export type RootStore = Store
export type RootState = ReturnType<Store['getState']>
export type AppDispatch = Store['dispatch']
export const useAppDispatch: () => AppDispatch = useDispatch

/**
 * Like `store.getState()` but subscribes to state changes,
 * and will trigger a re-render if relevant state props change.
 */
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
