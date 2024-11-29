import { createContext } from 'react'

import { Block } from './types'

// Hack: Make context have a type always
export const StateContext = createContext<State>(null as State)

export interface State {
  state: {
    blocks: Block[]
  }
  setState: React.Dispatch<
    React.SetStateAction<{
      blocks: Block[]
    }>
  >
}
