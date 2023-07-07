import { PayloadAction, createSlice } from '@reduxjs/toolkit'

import { State } from '../types'

const initialState: State['plugins'] = {}

export const pluginsSlice = createSlice({
  name: 'plugins',
  initialState,
  reducers: {
    setPlugins(_state, action: PayloadAction<State['plugins']>) {
      return action.payload
    },
  },
})

export const { setPlugins } = pluginsSlice.actions
