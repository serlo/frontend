import { createContext } from 'react'

import type { TextAreaExerciseProps } from '.'

export const TextAreaEditorContext =
  createContext<TextAreaExerciseProps | null>(null)
