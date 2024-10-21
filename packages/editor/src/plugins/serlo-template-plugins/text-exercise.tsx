import { SaveButton } from '@editor/editor-ui/editor-toolbar/save-button'
import {
  type EditorPlugin,
  type EditorPluginProps,
  type PrettyStaticState,
} from '@editor/plugin'
import { selectStaticDocument, useStore } from '@editor/store'
import { EditorPluginType } from '@editor/types/editor-plugin-type'
import { cn } from '@editor/utils/cn'
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
export const textExerciseTypePlugin: EditorPlugin<
  TextExerciseTypePluginState,
  { skipControls: boolean }
> = {
  Component: TextExerciseTypeEditor,
  state: textExerciseTypeState,
  config: { skipControls: false },
}

function TextExerciseTypeEditor({
  state,
  config,
  id,
}: EditorPluginProps<TextExerciseTypePluginState, { skipControls: boolean }>) {
  const { content } = state

  const store = useStore()

  const staticDocument = selectStaticDocument(store.getState(), id)
    ?.state as PrettyStaticState<TextExerciseTypePluginState>
  if (!staticDocument) return null

  return (
    <>
      {config.skipControls ? null : (
        <div className="absolute right-0 -mt-20 mr-side flex flex-row gap-4">
          <ContentLoaders
            id={state.id.value}
            currentRevision={state.revision.value}
            onSwitchRevision={state.replaceOwnState}
            entityType={UuidType.Exercise}
          />
        </div>
      )}
      <article
        className={cn('text-exercise', config.skipControls ? 'mt-12' : 'mt-32')}
      >
        {content.render()}
        {config.skipControls ? null : (
          <SaveButton showSubscriptionOptions {...state} />
        )}
      </article>
    </>
  )
}
