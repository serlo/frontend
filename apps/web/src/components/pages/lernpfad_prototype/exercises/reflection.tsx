import type { ExerciseProps } from '../types'
import { ExerciseWrapper } from './exercise-wrapper'
import { EditorRenderer } from '@/serlo-editor-integration/editor-renderer'

// TODO: Add content here

export function Reflection(props: ExerciseProps) {
  return (
    <ExerciseWrapper {...props}>
      <EditorRenderer document={editorContent} />
    </ExerciseWrapper>
  )
}

const editorContent = {}
