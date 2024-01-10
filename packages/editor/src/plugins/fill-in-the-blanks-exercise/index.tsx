import { TextEditorFormattingOption } from '@editor/editor-ui/plugin-toolbar/text-controls/types'
import {
  type EditorPlugin,
  type EditorPluginProps,
  object,
  child,
  string,
} from '@editor/plugin'
import { EditorPluginType } from '@editor/types/editor-plugin-type'

import { FillInTheBlanksExerciseEditor } from './editor'

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
    mode: string(defaultMode),
    // This could be used to store additional answers for mode drag-and-drop in the future
    // additionalDraggableAnswers: optional(list(object({ answer: string() }))),
  })
}

export type FillInTheBlanksExerciseProps =
  EditorPluginProps<FillInTheBlanksExerciseState>
