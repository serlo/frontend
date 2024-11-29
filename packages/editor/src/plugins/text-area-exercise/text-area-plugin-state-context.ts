import type { EditorTextAreaExerciseDocument } from '@editor/types/editor-plugins'
import { createContext } from 'react'

export const TextAreaPluginStateContext =
  createContext<EditorTextAreaExerciseDocument>(
    null as EditorTextAreaExerciseDocument
  )
