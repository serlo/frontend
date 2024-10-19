import {
  type EditorPlugin,
  type EditorPluginProps,
  PrettyStaticState,
} from '@editor/plugin'
import { selectStaticDocument, useStore } from '@editor/store'
import { EditorPluginType } from '@editor/types/editor-plugin-type'
import { UuidType } from '@serlo/frontend/src/data-types'
import { ContentLoaders } from '@serlo/frontend/src/serlo-editor-integration/components/content-loaders/content-loaders'

import { editorContent, entity, entityType } from '../common/common'

// text-exercises also include interactive exercises, we keep the naming to avoid db-migration

export const textExerciseGroupTypeState = entityType(
  {
    ...entity,
    content: editorContent(EditorPluginType.ExerciseGroup),
  },
  {}
)

export type TextExerciseGroupTypePluginState = typeof textExerciseGroupTypeState

export const textExerciseGroupTypePlugin: EditorPlugin<TextExerciseGroupTypePluginState> =
  {
    Component: TextExerciseGroupTypeEditor,
    state: textExerciseGroupTypeState,
    config: {},
  }

function TextExerciseGroupTypeEditor(
  props: EditorPluginProps<TextExerciseGroupTypePluginState>
) {
  const { content, id, revision, replaceOwnState } = props.state
  const store = useStore()

  const staticState = selectStaticDocument(store.getState(), props.id)
    ?.state as PrettyStaticState<TextExerciseGroupTypePluginState>

  if (!staticState) return null

  return (
    <>
      <div className="absolute right-0 -mt-20 mr-side flex">
        <ContentLoaders
          id={id.value}
          currentRevision={revision.value}
          onSwitchRevision={replaceOwnState}
          entityType={UuidType.ExerciseGroup}
        />
      </div>
      <article className="mt-32">{content.render()}</article>
    </>
  )
}
