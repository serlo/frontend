import { configureStore } from '@reduxjs/toolkit'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import createSagaMiddleware from 'redux-saga'

import { documentsSlice } from './documents'
import { focusSlice } from './focus'
import { historySlice } from './history'
import { pluginsSlice } from './plugins'
import { rootSlice } from './root'
import { saga } from './saga'

const sagaMiddleware = createSagaMiddleware()

export const store = configureStore({
  reducer: {
    documents: documentsSlice.reducer,
    focus: focusSlice.reducer,
    history: historySlice.reducer,
    plugins: pluginsSlice.reducer,
    root: rootSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      // TODO: Create and link an issue to fix mutations and remove this prop (issue #1)
      immutableCheck: false,
      // TODO: Create and link an issue to fix non-serializable props in state and remove this prop (issue #2)
      serializableCheck: false,
    }).concat([sagaMiddleware]),
})
sagaMiddleware.run(saga)

export type RootStore = typeof store
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
