import { SemanticSection } from '../../plugin/helpers/semantic-section'
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
    /* cohesive field indicated whether the children of a grouped exercise are cohesive
    this info might be used in the future, but currently has no effect in the frontend.
    */
  },
  {
    'grouped-text-exercise': list(serializedChild('type-text-exercise')),
  }
)

export const textExerciseGroupTypePlugin: EditorPlugin<
  typeof textExerciseGroupTypeState
> = {
  Component: TextExerciseGroupTypeEditor,
  state: textExerciseGroupTypeState,
  config: {},
}

function TextExerciseGroupTypeEditor(
  props: EditorPluginProps<typeof textExerciseGroupTypeState>
) {
  const { cohesive, content, 'grouped-text-exercise': children } = props.state
  const isCohesive = cohesive.value ?? false

  const exGroupStrings = useEditorStrings().templatePlugins.textExerciseGroup

  const contentRendered = content.render({
    renderSettings(children) {
      return (
        <>
          {children}
          {getSettings()}
        </>
      )
    },
  })

  return (
    <article className="exercisegroup mt-16">
      {props.renderIntoToolbar(
        <ContentLoaders
          id={props.state.id.value}
          currentRevision={props.state.revision.value}
          onSwitchRevision={props.state.replaceOwnState}
          entityType={UuidType.ExerciseGroup}
        />
      )}
      <section className="row">
        <SemanticSection editable={props.editable}>
          {contentRendered}
        </SemanticSection>
      </section>
      {children.map((child, index) => (
        <section className="row" key={child.id}>
          <div className="col-sm-1 hidden-xs">
            <em>{getExerciseIndex(index)})</em>
          </div>
          <div className="col-sm-11 col-xs-12">
            <OptionalChild
              state={child}
              removeLabel={exGroupStrings.removeExercise}
              onRemove={() => children.remove(index)}
            />
          </div>
        </section>
      ))}
      <AddButton onClick={() => children.insert()}>
        {exGroupStrings.addExercise}
      </AddButton>
      <ToolbarMain showSubscriptionOptions {...props.state} />
    </article>
  )

  function getSettings() {
    return (
      <div>
        <label htmlFor="cohesiveSelect">
          {exGroupStrings.kindOfExerciseGroup}:
        </label>{' '}
        <select
          id="cohesiveSelect"
          value={isCohesive ? 'cohesive' : 'non-cohesive'}
          onChange={(e) => cohesive.set(e.target.value === 'cohesive')}
          className="border-2"
        >
          <option value="non-cohesive">{exGroupStrings.notCohesive}</option>
          <option value="cohesive">{exGroupStrings.cohesive}</option>
        </select>
      </div>
    )
  }

  function getExerciseIndex(index: number) {
    return isCohesive ? index + 1 : String.fromCharCode(97 + index)
  }
}
