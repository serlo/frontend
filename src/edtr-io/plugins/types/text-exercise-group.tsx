// eslint-disable-next-line import/no-internal-modules
import { AddButton } from '@edtr-io/editor-ui/internal'
import { boolean, EditorPlugin, EditorPluginProps, list } from '@edtr-io/plugin'
import * as React from 'react'

import { SemanticSection } from '../helpers/semantic-section'
import {
  editorContent,
  entity,
  serializedChild,
  OptionalChild,
  entityType,
} from './common/common'
import { RevisionHistoryLoader } from './helpers/revision-history-loader'
import { ToolbarMain } from './toolbar-main/toolbar-main'
import { useLoggedInData } from '@/contexts/logged-in-data-context'

export const textExerciseGroupTypeState = entityType(
  {
    ...entity,
    content: editorContent(),
    cohesive: boolean(false),
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

  const loggedInData = useLoggedInData()
  if (!loggedInData) return null
  const editorStrings = loggedInData.strings.editor

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
    <article className="exercisegroup">
      {props.renderIntoToolbar(
        <RevisionHistoryLoader
          id={props.state.id.value}
          currentRevision={props.state.revision.value}
          onSwitchRevision={props.state.replaceOwnState}
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
              removeLabel={editorStrings.textExerciseGroup.removeExercise}
              onRemove={() => children.remove(index)}
            />
          </div>
        </section>
      ))}
      <AddButton onClick={() => children.insert()}>
        {editorStrings.textExerciseGroup.addExercise}
      </AddButton>
      <ToolbarMain subscriptions {...props.state} />
    </article>
  )

  function getSettings() {
    return (
      <div>
        <label htmlFor="cohesiveSelect">
          {editorStrings.textExerciseGroup.kindOfExerciseGroup}:
        </label>{' '}
        <select
          id="cohesiveSelect"
          value={isCohesive ? 'cohesive' : 'non-cohesive'}
          onChange={(e) => cohesive.set(e.target.value === 'cohesive')}
        >
          <option value="non-cohesive">
            {editorStrings.textExerciseGroup.notCohesive}
          </option>
          <option value="cohesive">
            {editorStrings.textExerciseGroup.cohesive}
          </option>
        </select>
      </div>
    )
  }

  function getExerciseIndex(index: number) {
    return isCohesive ? index + 1 : String.fromCharCode(97 + index)
  }
}
