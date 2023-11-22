import clsx from 'clsx'

import { editorContent, entity, entityType } from './common/common'
import { ContentLoaders } from './helpers/content-loaders/content-loaders'
import { ToolbarMain } from './toolbar-main/toolbar-main'
import { UuidType } from '@/data-types'
import {
  type EditorPlugin,
  type EditorPluginProps,
  type PrettyStaticState,
} from '@/serlo-editor/plugin'
import { selectStaticDocument, store } from '@/serlo-editor/store'
import { EditorPluginType } from '@/serlo-editor/types/editor-plugin-type'

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

  const staticDocument = selectStaticDocument(store.getState(), id)
    ?.state as PrettyStaticState<TextExerciseTypePluginState>
  if (!staticDocument) return null

  return (
    <>
      {config.skipControls ? null : (
        <div className="absolute right-0 -mt-20 mr-side">
          <ContentLoaders
            id={state.id.value}
            currentRevision={state.revision.value}
            onSwitchRevision={state.replaceOwnState}
            entityType={UuidType.Exercise}
          />
        </div>
      )}
      <article
        className={clsx(
          'text-exercise',
          config.skipControls ? 'mt-12' : 'mt-32'
        )}
      >
        {content.render()}
        {config.skipControls ? null : (
          <ToolbarMain showSubscriptionOptions {...state} />
        )}
      </article>
    </>
  )
}
