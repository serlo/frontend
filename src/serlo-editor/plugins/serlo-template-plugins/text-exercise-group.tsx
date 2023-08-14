import { faTrashAlt } from '@fortawesome/free-solid-svg-icons'

import {
  editorContent,
  entity,
  serializedChild,
  entityType,
} from './common/common'
import { ContentLoaders } from './helpers/content-loaders/content-loaders'
import { TextExerciseTypePluginState } from './text-exercise'
import { ToolbarMain } from './toolbar-main/toolbar-main'
import { FaIcon } from '@/components/fa-icon'
import { useEditorStrings } from '@/contexts/logged-in-data-context'
import { UuidType } from '@/data-types'
import { tw } from '@/helper/tw'
import { AddButton } from '@/serlo-editor/editor-ui'
import { EditorTooltip } from '@/serlo-editor/editor-ui/editor-tooltip'
import {
  boolean,
  type EditorPlugin,
  type EditorPluginProps,
  list,
  StateTypeSerializedType,
} from '@/serlo-editor/plugin'
import { selectSerializedDocument, store } from '@/serlo-editor/store'
import { TemplatePluginType } from '@/serlo-editor-integration/types/template-plugin-type'

export const textExerciseGroupTypeState = entityType(
  {
    ...entity,
    content: editorContent(),
    cohesive: boolean(false),
    /* cohesive field would indicate whether the children of a grouped exercise are cohesive
    this field might be used in the future, but currently it has no effect and can not be changed
    */
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

  const exGroupStrings = useEditorStrings().templatePlugins.textExerciseGroup
  const contentRendered = content.render()

  const serializedState = selectSerializedDocument(store.getState(), props.id)
    ?.state as StateTypeSerializedType<TextExerciseGroupTypePluginState>

  if (!serializedState) return null
  const serializedExercises = serializedState[
    'grouped-text-exercise'
  ] as StateTypeSerializedType<TextExerciseTypePluginState>[]

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
      <article className="exercisegroup mt-32">
        <section className="row">{contentRendered}</section>
        <ol className="mb-2.5 ml-2 bg-white pb-3.5 [counter-reset:exercises] sm:pl-12">
          {children.map((child, index) => (
            <li
              key={child.id}
              className={tw`
                serlo-exercise-wrapper serlo-grouped-exercise-wrapper
                mt-12 pt-2 [&>div]:border-none
              `}
            >
              <nav className="flex justify-end">
                <button
                  className="serlo-button-editor-secondary serlo-tooltip-trigger mr-2"
                  onClick={() => children.remove(index)}
                >
                  <EditorTooltip text={exGroupStrings.removeExercise} />
                  <FaIcon icon={faTrashAlt} />
                </button>
                <ContentLoaders
                  id={serializedExercises[index].id}
                  currentRevision={serializedExercises[index].revision}
                  onSwitchRevision={(data) =>
                    child.replace(TemplatePluginType.TextExercise, data)
                  }
                  entityType={UuidType.GroupedExercise}
                />
              </nav>
              {child.render()}
            </li>
          ))}
        </ol>
        <AddButton onClick={() => children.insert()}>
          {exGroupStrings.addExercise}
        </AddButton>
        <ToolbarMain showSubscriptionOptions {...props.state} />
      </article>
    </>
  )
}
