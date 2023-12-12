import { FillInTheBlanksExerciseEditor } from './editor'
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
    state: createState(),
  }

export type FillInTheBlanksExerciseState = ReturnType<typeof createState>

function createState() {
  const defaultMode: FillInTheBlanksMode = 'typing'

  return object({
    text: child({
      plugin: EditorPluginType.Text,
      config: {
        formattingOptions: [
          TextEditorFormattingOption.code,
          TextEditorFormattingOption.colors,
          TextEditorFormattingOption.lists,
          TextEditorFormattingOption.richTextBold,
          TextEditorFormattingOption.richTextItalic,
          TextEditorFormattingOption.textBlank,
        ],
        isInlineChildEditor: true,
      },
    }),
    mode: string(defaultMode), // Currently there is no method for the user to switch to 'drag-and-drop'
    // This could be used to store additional answers for mode drag-and-drop in the future
    // additionalDraggableAnswers: optional(list(object({ answer: string() }))),
  })
}

export type FillInTheBlanksExerciseProps =
  EditorPluginProps<FillInTheBlanksExerciseState>
