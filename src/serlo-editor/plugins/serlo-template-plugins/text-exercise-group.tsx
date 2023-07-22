import {
  editorContent,
  entity,
  serializedChild,
  OptionalChild,
  entityType,
} from './common/common'
import { ContentLoaders } from './helpers/content-loaders/content-loaders'
import { ToolbarMain } from './toolbar-main/toolbar-main'
import { useEditorStrings } from '@/contexts/logged-in-data-context'
import { UuidType } from '@/data-types'
import { AddButton } from '@/serlo-editor/editor-ui'
import {
  boolean,
  EditorPlugin,
  EditorPluginProps,
  list,
} from '@/serlo-editor/plugin'

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

type TextExerciseGroupTypePluginState = typeof textExerciseGroupTypeState

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

  //  const contentRendered = content.render({
  //    renderSettings(children) {
  //      return children
  //    },
  //  })
  // TODO: check out if this still works
  const contentRendered = content.render()

  return (
    <article className="exercisegroup mt-16">
      <section className="row">{contentRendered}</section>
      <ol className="mb-2.5 ml-2 bg-white pb-3.5 [counter-reset:exercises] sm:pl-12">
        {children.map((child, index) => (
          <li
            key={child.id}
            className="[&>div] serlo-exercise-wrapper serlo-grouped-exercise-wrapper mt-12 [&>div]:border-none"
          >
            <OptionalChild
              state={child}
              removeLabel={exGroupStrings.removeExercise}
              onRemove={() => children.remove(index)}
            />
          </li>
        ))}
      </ol>
      <AddButton onClick={() => children.insert()}>
        {exGroupStrings.addExercise}
      </AddButton>
      <ToolbarMain showSubscriptionOptions {...props.state} />
      {props.renderIntoSideToolbar(
        <ContentLoaders
          id={id.value}
          currentRevision={revision.value}
          onSwitchRevision={replaceOwnState}
          entityType={UuidType.ExerciseGroup}
        />
      )}
    </article>
  )
}
