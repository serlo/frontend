import { TextEditorFormattingOption } from '@editor/editor-ui/plugin-toolbar/text-controls/types'
import {
  type EditorPlugin,
  type EditorPluginProps,
  object,
  child,
  string,
  optional,
  list,
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
          TextEditorFormattingOption.math,
        ],
        isInlineChildEditor: true,
      },
    }),
    mode: string(defaultMode),
    additionalDraggableAnswers: optional(list(object({ answer: string() }))),
  })
}

export type FillInTheBlanksExerciseProps =
  EditorPluginProps<FillInTheBlanksExerciseState>
