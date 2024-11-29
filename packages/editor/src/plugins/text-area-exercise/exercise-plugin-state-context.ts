import type { EditorExerciseDocument } from '@editor/types/editor-plugins'
import { createContext } from 'react'

export const ExercisePluginStateContext = createContext<EditorExerciseDocument>(
  null as EditorExerciseDocument
)
