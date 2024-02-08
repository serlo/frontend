import { AddButton } from '@editor/editor-ui'
import { EditorTooltip } from '@editor/editor-ui/editor-tooltip'
import {
  boolean,
  type EditorPlugin,
  type EditorPluginProps,
  list,
  PrettyStaticState,
} from '@editor/plugin'
import { selectStaticDocument, store } from '@editor/store'
import { EditorPluginType } from '@editor/types/editor-plugin-type'
import { TemplatePluginType } from '@editor/types/template-plugin-type'
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import { AiExerciseGenerationButton } from '@serlo/frontend/src/components/exercise-generation/ai-exercise-generation-button'
import { useAiFeatures } from '@serlo/frontend/src/components/exercise-generation/use-ai-features'
import { FaIcon } from '@serlo/frontend/src/components/fa-icon'
import { useEditorStrings } from '@serlo/frontend/src/contexts/logged-in-data-context'
import { UuidType } from '@serlo/frontend/src/data-types'
import { useRouter } from 'next/router'

import { TextExerciseGroupTypeRenderer } from './renderer'
import {
  editorContent,
  entity,
  serializedChild,
  entityType,
} from '../common/common'
import { ContentLoaders } from '../helpers/content-loaders/content-loaders'
import { TextExerciseTypePluginState } from '../text-exercise'
import { ToolbarMain } from '../toolbar-main/toolbar-main'

// text-exercises also include interactive exercises, we keep the naming to avoid db-migration

export const textExerciseGroupTypeState = entityType(
  {
    ...entity,
    content: editorContent(EditorPluginType.Rows),
    /* cohesive field would indicate whether the children of a grouped exercise are cohesive
    this field might be used in the future, but currently it has no effect and can not be changed
    */
    cohesive: boolean(false),
  },
  {
    'grouped-text-exercise': list(serializedChild('type-text-exercise')),
  }
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
  const {
    content,
    'grouped-text-exercise': children,
    id,
    revision,
    replaceOwnState,
  } = props.state
  const { canUseAiFeatures } = useAiFeatures()
  const router = useRouter()
  const currentPath = router.asPath.toLowerCase()
  const isCreatingNewExerciseGroup = currentPath.includes(
    '/create/exercisegroup'
  )
  const exGroupStrings = useEditorStrings().templatePlugins.textExerciseGroup

  const staticState = selectStaticDocument(store.getState(), props.id)
    ?.state as PrettyStaticState<TextExerciseGroupTypePluginState>

  if (!staticState) return null
  const staticExercises = staticState[
    'grouped-text-exercise'
  ] as PrettyStaticState<TextExerciseTypePluginState>[]

  if (staticState.content.startsWith('{"plugin":"rows"')) {
    return renderLegacyExerciseGroupEditor()
  }
  return (
    <article className="exercisegroup mt-32">
      {content.render()}
      <ToolbarMain showSubscriptionOptions {...props.state} />
    </article>
  )

  function renderLegacyExerciseGroupEditor() {
    return (
      <>
        <div className="absolute right-0 -mt-20 mr-side flex">
          {canUseAiFeatures && isCreatingNewExerciseGroup ? (
            <AiExerciseGenerationButton />
          ) : null}
          <ContentLoaders
            id={id.value}
            currentRevision={revision.value}
            onSwitchRevision={replaceOwnState}
            entityType={UuidType.ExerciseGroup}
          />
        </div>
        <article className="exercisegroup mt-32">
          <TextExerciseGroupTypeRenderer
            content={<>{content.render()}</>}
            exercises={children.map((child, index) => {
              return {
                id: child.id,
                element: (
                  <>
                    <nav className="flex justify-end">
                      <button
                        className="serlo-button-editor-secondary serlo-tooltip-trigger mr-2"
                        onClick={() => children.remove(index)}
                      >
                        <EditorTooltip text={exGroupStrings.removeExercise} />
                        <FaIcon icon={faTrashAlt} />
                      </button>
                      <ContentLoaders
                        id={staticExercises[index].id}
                        currentRevision={staticExercises[index].revision}
                        onSwitchRevision={(data) =>
                          child.replace(TemplatePluginType.TextExercise, data)
                        }
                        entityType={UuidType.GroupedExercise}
                      />
                    </nav>
                    {child.render()}
                  </>
                ),
              }
            })}
          />
          <AddButton onClick={() => children.insert()}>
            {exGroupStrings.addExercise}
          </AddButton>
          <ToolbarMain showSubscriptionOptions {...props.state} />
        </article>
      </>
    )
  }
}
