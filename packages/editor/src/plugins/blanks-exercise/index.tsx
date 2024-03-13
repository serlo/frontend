import { TextEditorFormattingOption } from '@editor/editor-ui/plugin-toolbar/text-controls/types'
import {
  type EditorPlugin,
  type EditorPluginProps,
  object,
  child,
  string,
  list,
  optional,
} from '@editor/plugin'
import { EditorPluginType } from '@editor/types/editor-plugin-type'

import { BlanksExerciseEditor } from './editor'

export type BlanksExerciseMode = 'typing' | 'drag-and-drop'

export type BlankId = string

export type DraggableId = string

export const blanksExercise: EditorPlugin<BlanksExerciseState> = {
  Component: BlanksExerciseEditor,
  config: {},
  state: createState(),
}

export type BlanksExerciseState = ReturnType<typeof createState>

function createState() {
  const defaultMode: BlanksExerciseMode = 'typing'

  return object({
    // text can also be a table plugin
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
    extraDraggableAnswers: optional(list(object({ answer: string() }))),
  })
}

export type BlanksExerciseProps = EditorPluginProps<BlanksExerciseState>
