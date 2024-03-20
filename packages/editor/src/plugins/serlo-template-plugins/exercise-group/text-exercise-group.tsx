import {
  boolean,
  type EditorPlugin,
  type EditorPluginProps,
  PrettyStaticState,
} from '@editor/plugin'
import { selectStaticDocument, store } from '@editor/store'
import { EditorPluginType } from '@editor/types/editor-plugin-type'
import { AiExerciseGenerationButton } from '@serlo/frontend/src/components/exercise-generation/ai-exercise-generation-button'
import { useAiFeatures } from '@serlo/frontend/src/components/exercise-generation/use-ai-features'
import { UuidType } from '@serlo/frontend/src/data-types'
import { useRouter } from 'next/router'

import { editorContent, entity, entityType } from '../common/common'
import { ContentLoaders } from '../helpers/content-loaders/content-loaders'
import { ToolbarMain } from '../toolbar-main/toolbar-main'

// text-exercises also include interactive exercises, we keep the naming to avoid db-migration

export const textExerciseGroupTypeState = entityType(
  {
    ...entity,
    content: editorContent(EditorPluginType.ExerciseGroup),
    /* cohesive field would indicate whether the children of a grouped exercise are cohesive
    this field might be used in the future, but currently it has no effect and can not be changed
    */
    cohesive: boolean(false),
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
  const { canUseAiFeatures } = useAiFeatures()
  const router = useRouter()
  const currentPath = router.asPath.toLowerCase()
  const isCreatingNewExerciseGroup = currentPath.includes(
    '/create/exercisegroup'
  )

  const staticState = selectStaticDocument(store.getState(), props.id)
    ?.state as PrettyStaticState<TextExerciseGroupTypePluginState>

  if (!staticState) return null

  return (
    <>
      <div className="absolute right-0 -mt-20 mr-side flex">
        {canUseAiFeatures && isCreatingNewExerciseGroup ? (
          <AiExerciseGenerationButton />
        ) : null}
        &nbsp;
        <ContentLoaders
          id={id.value}
          currentRevision={revision.value}
          onSwitchRevision={replaceOwnState}
          entityType={UuidType.ExerciseGroup}
        />
      </div>
      <article className="mt-32">
        {content.render()}
        <ToolbarMain showSubscriptionOptions {...props.state} />
      </article>
    </>
  )
}
