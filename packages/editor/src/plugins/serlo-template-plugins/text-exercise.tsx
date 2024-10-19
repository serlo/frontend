import { SaveButton } from '@editor/editor-ui/editor-toolbar/save-button'
import {
  type EditorPlugin,
  type EditorPluginProps,
  type PrettyStaticState,
} from '@editor/plugin'
import { selectStaticDocument, useStore } from '@editor/store'
import { EditorPluginType } from '@editor/types/editor-plugin-type'
import { UuidType } from '@serlo/frontend/src/data-types'
import { ContentLoaders } from '@serlo/frontend/src/serlo-editor-integration/components/content-loaders/content-loaders'

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
  }

function TextExerciseTypeEditor({
  state,
  id,
}: EditorPluginProps<TextExerciseTypePluginState>) {
  const { content, licenseId, changes } = state

  const store = useStore()

  const staticDocument = selectStaticDocument(store.getState(), id)
    ?.state as PrettyStaticState<TextExerciseTypePluginState>
  if (!staticDocument) return null

  return (
    <>
      <div className="absolute right-0 -mt-20 mr-side flex flex-row gap-4">
        <ContentLoaders
          id={state.id.value}
          currentRevision={state.revision.value}
          onSwitchRevision={state.replaceOwnState}
          entityType={UuidType.Exercise}
        />
      </div>
      <article className="text-exercise mt-32">
        {content.render()}

        <SaveButton changes={changes} licenseId={licenseId} />
      </article>
    </>
  )
}
