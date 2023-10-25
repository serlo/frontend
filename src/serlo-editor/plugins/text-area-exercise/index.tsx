import { TextAreaExerciseStaticRenderer } from './static'
import {
  type EditorPlugin,
  object,
  EditorPluginProps,
} from '@/serlo-editor/plugin'

function createTextAreaState() {
  return object({})
}

export function createTextAreaPlugin(): EditorPlugin<TextAreaState> {
  return {
    Component: TextAreaEditor,
    state: createTextAreaState(),
    config: {},
  }
}

export type TextAreaState = ReturnType<typeof createTextAreaState>
export type TextAreaProps = EditorPluginProps<TextAreaState>

export function TextAreaEditor(_: TextAreaProps) {
  return <TextAreaExerciseStaticRenderer />
}
