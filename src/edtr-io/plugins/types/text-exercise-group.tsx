// eslint-disable-next-line import/no-internal-modules
import { AddButton } from '@edtr-io/editor-ui/internal'
import { boolean, EditorPlugin, EditorPluginProps, list } from '@edtr-io/plugin'
import * as React from 'react'
import { useVirtual } from 'react-virtual'

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

// https://github.com/tannerlinsley/react-virtual/issues/167
function useVirtualResizeObserver<T>(options: {
  size: number
  parentRef: React.RefObject<T>
  estimateSize: () => number
}) {
  const measureRefCacheRef = React.useRef<
    Record<string, (el: HTMLElement | null) => void>
  >({})
  const elCacheRef = React.useRef<Record<number, HTMLElement | null>>({})

  const resizeObserverRef = React.useRef(
    new ResizeObserver((entries) => {
      entries.forEach((entry) => {
        const el = entry.target as HTMLElement
        const index = el.getAttribute('data-index')
        if (index !== null) measureRefCacheRef.current[index](el)
      })
    })
  )

  React.useEffect(() => {
    const resizeObserver = resizeObserverRef.current
    return () => {
      resizeObserver.disconnect()
    }
  }, [])

  const rowVirtualizer = useVirtual<T>(options)

  const refs = React.useMemo(() => {
    const obj: Record<number, (el: HTMLElement | null) => void> = {}
    for (let i = 0; i < options.size; i++) {
      obj[i] = (el: HTMLElement | null) => {
        const currentElCache = elCacheRef.current[i]
        if (currentElCache) {
          resizeObserverRef.current.unobserve(currentElCache)
        }

        if (el) {
          // sync
          measureRefCacheRef.current[i](el)

          el.setAttribute('data-index', i.toString())
          resizeObserverRef.current.observe(el)
        }

        elCacheRef.current[i] = el
      }
    }
    return obj
  }, [options.size])

  for (let i = 0; i < rowVirtualizer.virtualItems.length; i++) {
    const item = rowVirtualizer.virtualItems[i]
    if (item.measureRef !== refs[item.index]) {
      measureRefCacheRef.current[item.index] = item.measureRef
    }
    item.measureRef = refs[item.index]
  }

  return rowVirtualizer
}

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

  const virtualizer = useVirtualResizeObserver({
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
