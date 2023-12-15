import { Action } from '@reduxjs/toolkit'

export interface State {
  documents: Record<string, DocumentState>
  focus: string | null
  history: HistoryState
}

export interface DocumentState {
  plugin: string
  state: unknown
}

export interface HistoryState {
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
