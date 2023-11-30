import { useRouter } from 'next/router'

import { editorContent, entity, entityType } from './common/common'
import { ContentLoaders } from './helpers/content-loaders/content-loaders'
import { ToolbarMain } from './toolbar-main/toolbar-main'
import { AiExerciseGenerationButton } from '@/components/exercise-generation/ai-exercise-generation-button'
import { useAiFeatures } from '@/components/exercise-generation/use-ai-features'
import { UuidType } from '@/data-types'
import { cn } from '@/helper/cn'
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

  const { canUseAiFeatures } = useAiFeatures()

  const router = useRouter()
  const currentPath = router.asPath.toLowerCase()
  const isCreatingNewExercise = currentPath.includes('/create/exercise')

  const staticDocument = selectStaticDocument(store.getState(), id)
    ?.state as PrettyStaticState<TextExerciseTypePluginState>
  if (!staticDocument) return null

  return (
    <>
      {config.skipControls ? null : (
        <div className="absolute right-0 -mt-20 mr-side flex flex-row gap-4">
          {canUseAiFeatures && isCreatingNewExercise ? (
            <AiExerciseGenerationButton isSingularExercise />
          ) : null}
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
          <ToolbarMain showSubscriptionOptions {...state} />
        )}
      </article>
    </>
  )
}
