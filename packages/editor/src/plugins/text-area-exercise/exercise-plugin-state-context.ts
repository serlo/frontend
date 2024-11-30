import type { EditorExerciseDocument } from '@editor/types/editor-plugins'
import { createContext } from 'react'

// Provide exercise plugin state to all child components
export const ExercisePluginStateContext =
  createContext<EditorExerciseDocument | null>(null)
