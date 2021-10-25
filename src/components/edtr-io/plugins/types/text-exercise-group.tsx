// eslint-disable-next-line import/no-internal-modules
import { AddButton } from '@edtr-io/editor-ui/internal'
import { boolean, EditorPlugin, EditorPluginProps, list } from '@edtr-io/plugin'
import * as React from 'react'
import { useVirtual } from 'react-virtual'

import { SemanticSection } from '../helpers/semantic-section'
import {
  editorContent,
  entity,
  Controls,
  serializedChild,
  OptionalChild,
  entityType,
} from './common'
import { RevisionHistoryLoader } from './helpers/revision-history-loader'
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

  const virtualParent = React.useRef(null)

  const virtualizer = useVirtual({
    size: children.length,
    parentRef: virtualParent,
    estimateSize: React.useCallback(() => 35, []),
  })

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
      <div
        ref={virtualParent}
        style={{
          height: '100%',
          overflow: 'auto',
        }}
      >
        <div
          style={{
            height: `${virtualizer.totalSize}px`,
            width: '100%',
            position: 'relative',
          }}
        >
          {virtualizer.virtualItems.map((virtualRow) => {
            const child = children[virtualRow.index]
            return (
              <div
                key={virtualRow.index}
                ref={virtualRow.measureRef}
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  transform: `translateY(${virtualRow.start}px)`,
                }}
              >
                <section className="row" key={child.id}>
                  <div className="col-sm-1 hidden-xs">
                    <em>{getExerciseIndex(virtualRow.index)})</em>
                  </div>
                  <div className="col-sm-11 col-xs-12">
                    <OptionalChild
                      state={child}
                      removeLabel={
                        editorStrings.textExerciseGroup.removeExercise
                      }
                      onRemove={() => children.remove(virtualRow.index)}
                    />
                  </div>
                </section>
              </div>
            )
          })}
        </div>
      </div>
      <AddButton onClick={() => children.insert()}>
        {editorStrings.textExerciseGroup.addExercise}
      </AddButton>
      <Controls subscriptions {...props.state} />
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
