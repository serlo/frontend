import { FillInTheBlanksExerciseEditor } from './editor'
import { defaultFormattingOptions } from '../text/hooks/use-text-config'
import { TextEditorFormattingOption } from '@/serlo-editor/editor-ui/plugin-toolbar/text-controls/types'
import {
  type EditorPlugin,
  type EditorPluginProps,
  object,
  child,
  string,
} from '@/serlo-editor/plugin'
import { EditorPluginType } from '@/serlo-editor/types/editor-plugin-type'

export type FillInTheBlanksMode = 'typing' | 'drag-and-drop'

export type BlankId = string

export type DraggableId = string

export const fillInTheBlanksExercise: EditorPlugin<FillInTheBlanksExerciseState> =
  {
    Component: FillInTheBlanksExerciseEditor,
    config: {},
    state: createFillInTheBlanksExerciseState(),
  }

export type FillInTheBlanksExerciseState = ReturnType<
  typeof createFillInTheBlanksExerciseState
>

function createFillInTheBlanksExerciseState() {
  const defaultMode: FillInTheBlanksMode = 'drag-and-drop'

  return object({
    text: child({
      plugin: EditorPluginType.Text,
      config: {
        formattingOptions: [
          ...defaultFormattingOptions,
          TextEditorFormattingOption.blank,
        ],
      },
    }),
    mode: string(defaultMode),
  })
}

export type FillInTheBlanksExerciseProps =
  EditorPluginProps<FillInTheBlanksExerciseState>
