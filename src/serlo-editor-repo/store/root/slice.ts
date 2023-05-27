import { createSlice } from '@reduxjs/toolkit'

import { State } from '../types'

const initialState: State['root'] = null as State['root']

export const rootSlice = createSlice({
  name: 'root',
  initialState,
  reducers: {
    pureInitRoot() {
      return 'root'
    },
  },
})

export const { pureInitRoot } = rootSlice.actions
