import { configureStore } from '@reduxjs/toolkit'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import createSagaMiddleware from 'redux-saga'

import { documentsSlice } from './documents'
import { focusSlice } from './focus'
import { historySlice } from './history'
import { saga } from './saga'

const sagaMiddleware = createSagaMiddleware()

export const store = configureStore({
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
      },
    }).concat([sagaMiddleware]),
})
sagaMiddleware.run(saga)

export type RootStore = typeof store
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppDispatch: () => AppDispatch = useDispatch

/**
 * Like `store.getState()` but subscribes to state changes,
 * and will trigger a re-render if relevant state props change.
 */
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
