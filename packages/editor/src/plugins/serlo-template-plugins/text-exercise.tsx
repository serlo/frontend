import {
  type EditorPlugin,
  type EditorPluginProps,
  type PrettyStaticState,
} from '@editor/plugin'
import { selectStaticDocument, useStore } from '@editor/store'
import { EditorPluginType } from '@editor/types/editor-plugin-type'

import { editorContent, entity, entityType } from './common/common'

export const textExerciseTypeState = entityType(
  {
    ...entity,
    content: editorContent(EditorPluginType.Exercise),
  },
  {}
)

export type TextExerciseTypePluginState = typeof textExerciseTypeState

/** Exercise with an optional solution spoiler */
export const textExerciseTypePlugin: EditorPlugin<TextExerciseTypePluginState> =
  {
    Component: TextExerciseTypeEditor,
    state: textExerciseTypeState,
    config: {},
  }

function TextExerciseTypeEditor({
  state,
  id,
}: EditorPluginProps<TextExerciseTypePluginState>) {
  const { content } = state

  const store = useStore()

  const staticDocument = selectStaticDocument(store.getState(), id)
    ?.state as PrettyStaticState<TextExerciseTypePluginState>
  if (!staticDocument) return null

  return <article className="text-exercise mt-32">{content.render()}</article>
}
