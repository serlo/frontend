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
import { defaultFormattingOptions } from '../text/hooks/use-text-config'

export type FillInTheBlanksMode = 'typing' | 'drag-and-drop'

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
  const defaultMode: FillInTheBlanksMode = 'typing'

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
