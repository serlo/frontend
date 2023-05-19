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
      serializableCheck: false,
    }).concat([sagaMiddleware]),
})
sagaMiddleware.run(saga)

export type RootStore = typeof store
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
