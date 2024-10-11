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

const blanksState = object({
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
  mode: string('typing'),
  extraDraggableAnswers: optional(list(object({ answer: string() }))),
})

export function createBlanksExercisePlugin(): EditorPlugin<BlanksExerciseState> {
  return {
    Component: BlanksExerciseEditor,
    state: blanksState,
    config: {},
  }
}

export type BlanksExerciseState = typeof blanksState
export type BlanksExerciseProps = EditorPluginProps<BlanksExerciseState>
