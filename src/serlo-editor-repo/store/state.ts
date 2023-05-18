export const initialState = {
  plugins: {},
  documents: {},
  focus: null,
  root: null,
  history: {
    undoStack: [],
    redoStack: [],
    pendingChanges: 0,
  },
}
