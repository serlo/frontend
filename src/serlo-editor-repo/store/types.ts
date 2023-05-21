import { Action } from '@reduxjs/toolkit'

import { EditorPlugin } from '../internal__plugin'

export interface State {
  plugins: Record<string, EditorPlugin>
  documents: Record<string, DocumentState>
  focus: string | null
  root: string | null
  history: HistoryState
}

export interface DocumentState {
  plugin: string
  state: unknown
}

interface HistoryState {
  initialState?: {
    documents: State['documents']
  }
  undoStack: ReversibleAction[][]
  redoStack: ReversibleAction[][]
  pendingChanges: number
}

export interface ReversibleAction {
  action: Action
  reverse: Action
}
