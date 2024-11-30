import type { EditorTextAreaExerciseDocument } from '@editor/types/editor-plugins'
import { createContext } from 'react'

export const TextAreaStaticRendererContext =
  createContext<EditorTextAreaExerciseDocument | null>(null)
