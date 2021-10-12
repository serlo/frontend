/**
 * This file is part of Serlo.org.
 *
 * Copyright (c) 2013-2021 Serlo Education e.V.
 *
 * Licensed under the Apache License, Version 2.0 (the "License")
 * you may not use this file except in compliance with the License
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * @copyright Copyright (c) 2013-2021 Serlo Education e.V.
 * @license   http://www.apache.org/licenses/LICENSE-2.0 Apache License 2.0
 * @link      https://github.com/serlo-org/serlo.org for the canonical source repository
 */
import { HotKeys, useScopedSelector, useScopedStore } from '@edtr-io/core'
import { PreferenceContext, setDefaultPreference } from '@edtr-io/core/beta'
import { AddButton } from '@edtr-io/editor-ui/internal'
import { MathEditor } from '@edtr-io/math'
import { StateTypeReturnType, StringStateType } from '@edtr-io/plugin'
import {
  focus,
  focusNext,
  focusPrevious,
  getFocused,
  isEmpty,
} from '@edtr-io/store'
import { edtrDragHandle, EdtrIcon, faTimes, Icon, styled } from '@edtr-io/ui'
import { useI18n } from '@serlo/i18n'
import * as R from 'ramda'
import * as React from 'react'
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd'

import { EquationsProps, stepProps } from '.'
import {
  EquationsRenderer,
  ExplanationTr,
  LeftTd,
  MathTd,
  renderDownArrow,
  SignTd,
  Table,
  TableWrapper,
  TransformTd,
} from './renderer'
import { renderSignToString, Sign } from './sign'

enum StepSegment {
  Left = 0,
  Right = 1,
  Transform = 2,
  Explanation = 3,
}

const preferenceKey = 'katex:usevisualmath'

setDefaultPreference(preferenceKey, true)

const RemoveButton = styled.button({
  outline: 'none',
  width: '35px',
  border: 'none',
  background: 'transparent',
})
const DragButton = styled.span({
  cursor: 'grab',
  paddingRight: '5px',
})

export function EquationsEditor(props: EquationsProps) {
  const i18n = useI18n()

  const { focused, state } = props

  const store = useScopedStore()
  const focusedElement = useScopedSelector(getFocused())
  const nestedFocus =
    focused ||
    R.includes(
      focusedElement,
      props.state.steps.map((step) => step.explanation.id)
    ) ||
    focusedElement === state.firstExplanation.id

  const gridFocus = useGridFocus({
    rows: state.steps.length,
    columns: 4,
    focusNext: () => store.dispatch(focusNext()),
    focusPrevious: () => store.dispatch(focusPrevious()),
    onFocusChanged: (state) => {
      if (state === 'firstExplanation') {
        store.dispatch(focus(props.state.firstExplanation.id))
      } else if (state.column === StepSegment.Explanation) {
        store.dispatch(focus(props.state.steps[state.row].explanation.id))
      } else {
        store.dispatch(focus(props.id))
      }
    },
  })

  React.useEffect(() => {
    if (nestedFocus) {
      gridFocus.setFocus({ row: 0, column: 0 })
      store.dispatch(focus(props.id))
    }
  }, [nestedFocus])

  if (!nestedFocus) return <EquationsRenderer {...props} />

  return (
    <HotKeys
      allowChanges
      keyMap={{
        FOCUS_NEXT_OR_INSERT: 'tab',
        FOCUS_PREVIOUS: 'shift+tab',
        INSERT: 'return',
      }}
      handlers={{
        FOCUS_NEXT_OR_INSERT: (e) => {
          handleKeyDown(e, () => {
            if (
              gridFocus.isFocused({
                row: state.steps.length - 1,
                column: StepSegment.Transform,
              })
            ) {
              const index = state.steps.length
              insertNewEquationAt(index)
              gridFocus.setFocus({
                row: index - 1,
                column: StepSegment.Explanation,
              })
            } else {
              gridFocus.moveRight()
            }
          })
        },
        FOCUS_PREVIOUS: (e) => {
          handleKeyDown(e, () => gridFocus.moveLeft())
        },
        INSERT: (e) => {
          handleKeyDown(e, () => {
            if (!gridFocus.focus || gridFocus.focus === 'firstExplanation')
              return
            insertNewEquationWithFocus(gridFocus.focus.row + 1)
          })
        },
      }}
    >
      <TableWrapper>
        <DragDropContext
          onDragEnd={(result) => {
            const { source, destination } = result
            if (!destination) return
            state.steps.move(source.index, destination.index)
          }}
        >
          <Droppable droppableId="default">
            {(provided: any) => {
              return (
                <Table ref={provided.innerRef} {...provided.droppableProps}>
                  {renderFirstExplanation()}
                  {state.steps.map((step, row) => {
                    return (
                      <Draggable
                        key={step.explanation.id}
                        draggableId={step.explanation.id}
                        index={row}
                      >
                        {(provided: any) => {
                          return (
                            <tbody
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                            >
                              <tr>
                                <td>
                                  <DragButton
                                    {...provided.dragHandleProps}
                                    tabIndex={-1}
                                  >
                                    <EdtrIcon icon={edtrDragHandle} />
                                  </DragButton>
                                </td>
                                <StepEditor
                                  gridFocus={gridFocus}
                                  row={row}
                                  state={step}
                                />
                                <td>
                                  <RemoveButton
                                    tabIndex={-1}
                                    onClick={() => state.steps.remove(row)}
                                  >
                                    <Icon icon={faTimes} />
                                  </RemoveButton>
                                </td>
                              </tr>
                              {renderExplantionTr()}
                            </tbody>
                          )
                        }}
                      </Draggable>
                    )

                    function renderExplantionTr() {
                      if (row === state.steps.length - 1) return null

                      return (
                        <ExplanationTr
                          onFocus={() =>
                            gridFocus.setFocus({
                              row,
                              column: StepSegment.Explanation,
                            })
                          }
                        >
                          <td />
                          <td />
                          {!isEmpty(step.explanation.id)(store.getState()) ? (
                            renderDownArrow()
                          ) : (
                            <td />
                          )}
                          <td colSpan={2}>
                            {step.explanation.render({
                              config: {
                                placeholder: i18n.t('equations::explanation'),
                              },
                            })}
                          </td>
                        </ExplanationTr>
                      )
                    }
                  })}
                  {provided.placeholder}
                </Table>
              )
            }}
          </Droppable>
        </DragDropContext>
        {renderAddButton()}
      </TableWrapper>
    </HotKeys>
  )

  function renderFirstExplanation() {
    return (
      <tbody onFocus={() => gridFocus.setFocus('firstExplanation')}>
        <ExplanationTr>
          <td />
          <td colSpan={3} style={{ textAlign: 'center' }}>
            {state.firstExplanation.render({
              config: {
                placeholder: i18n.t('equations::frist-explanation'),
              },
            })}
          </td>
        </ExplanationTr>
        <tr style={{ height: '30px' }}>
          <td />
          <td />
          {!isEmpty(state.firstExplanation.id)(store.getState())
            ? renderDownArrow()
            : null}
        </tr>
      </tbody>
    )
  }

  function handleKeyDown(e: KeyboardEvent | undefined, next: () => void) {
    e && e.preventDefault()
    next()
  }

  function insertNewEquationAt(index: number) {
    state.steps.insert(index, {
      left: '',
      sign: state.steps[index - 1].sign.value,
      right: '',
      transform: '',
      explanation: { plugin: 'text' },
    })
  }

  function insertNewEquationWithFocus(index: number) {
    insertNewEquationAt(index)
    gridFocus.setFocus({ row: index, column: StepSegment.Left })
  }

  function renderAddButton() {
    if (!nestedFocus) return

    return (
      <AddButton onClick={() => insertNewEquationWithFocus(state.steps.length)}>
        {i18n.t('equations::add new equation')}
      </AddButton>
    )
  }
}

const DropDown = styled.select({
  height: '30px',
  width: '35px',
  marginLeft: '15px',
  marginRight: '10px',
  backgroundColor: 'lightgrey',
  border: '1px solid lightgrey',
  borderRadius: '5px',
})

interface StepEditorProps {
  gridFocus: GridFocus
  row: number
  state: StateTypeReturnType<typeof stepProps>
}

function StepEditor(props: StepEditorProps) {
  const i18n = useI18n()
  const { gridFocus, row, state } = props

  return (
    <>
      <LeftTd
        onClick={() => gridFocus.setFocus({ row, column: StepSegment.Left })}
      >
        <InlineMath
          focused={gridFocus.isFocused({ row, column: StepSegment.Left })}
          placeholder={
            row === 0 ? '3x+1' : `[${i18n.t('equations::left-hand side')}]`
          }
          state={state.left}
          onChange={(src) => state.left.set(src)}
          onFocusNext={() => gridFocus.moveRight()}
          onFocusPrevious={() => gridFocus.moveLeft()}
        />
      </LeftTd>
      <SignTd>
        <DropDown
          tabIndex={-1}
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
            state.sign.set(e.target.value)
          }}
          value={state.sign.value}
        >
          {[
            Sign.Equals,
            Sign.GreaterThan,
            Sign.LessThan,
            Sign.GreaterThanOrEqual,
            Sign.LessThanOrEqual,
            Sign.AlmostEqualTo,
            Sign.Estimates,
          ].map((sign) => {
            return (
              <option key={sign} value={sign}>
                {renderSignToString(sign)}
              </option>
            )
          })}
        </DropDown>
      </SignTd>
      <MathTd
        onClick={() => gridFocus.setFocus({ row, column: StepSegment.Right })}
      >
        <InlineMath
          focused={gridFocus.isFocused({ row, column: StepSegment.Right })}
          placeholder={
            row === 0 ? '7x' : `[${i18n.t('equations::right-hand side')}]`
          }
          state={state.right}
          onChange={(src) => state.right.set(src)}
          onFocusNext={() => gridFocus.moveRight()}
          onFocusPrevious={() => gridFocus.moveLeft()}
        />
      </MathTd>
      <TransformTd
        onClick={() =>
          gridFocus.setFocus({ row, column: StepSegment.Transform })
        }
      >
        |{' '}
        <InlineMath
          focused={gridFocus.isFocused({ row, column: StepSegment.Transform })}
          placeholder={
            row === 0 ? '-3x' : `[${i18n.t('equations::transformation')}]`
          }
          state={state.transform}
          onChange={(src) => state.transform.set(src)}
          onFocusNext={() => gridFocus.moveRight()}
          onFocusPrevious={() => gridFocus.moveLeft()}
        />
      </TransformTd>
    </>
  )
}

interface InlineMathProps {
  state: StateTypeReturnType<StringStateType>
  placeholder: string
  onChange: (state: string) => void
  onFocusNext: () => void
  onFocusPrevious: () => void
  focused?: boolean
  prefix?: string
  suffix?: string
}

function InlineMath(props: InlineMathProps) {
  const {
    focused,
    onFocusNext,
    onFocusPrevious,
    onChange,
    state,
    prefix = '',
    suffix = '',
  } = props

  const preferences = React.useContext(PreferenceContext)

  return (
    <MathEditor
      readOnly={!focused}
      state={`${prefix}${state.value}${suffix}`}
      config={{ i18n: { placeholder: props.placeholder } }}
      inline
      disableBlock
      visual={preferences.getKey(preferenceKey) === true}
      onEditorChange={(visual) => {
        preferences.setKey(preferenceKey, visual)
      }}
      onInlineChange={() => {}}
      onChange={onChange}
      onMoveOutRight={onFocusNext}
      onMoveOutLeft={onFocusPrevious}
    />
  )
}

type GridFocusState =
  | {
      row: number
      column: number
    }
  | 'firstExplanation'

interface GridFocus {
  focus: GridFocusState | null
  isFocused: (cell: GridFocusState) => boolean
  setFocus: (cell: GridFocusState) => void
  moveRight: () => void
  moveLeft: () => void
}

function useGridFocus({
  rows,
  columns,
  focusNext,
  focusPrevious,
  onFocusChanged,
}: {
  rows: number
  columns: number
  focusNext: () => void
  focusPrevious: () => void
  onFocusChanged: (args: GridFocusState) => void
}): GridFocus {
  const [focus, setFocusState] = React.useState<GridFocusState | null>(null)
  const setFocus = (state: GridFocusState) => {
    onFocusChanged(state)
    setFocusState(state)
  }

  return {
    focus,
    isFocused(state) {
      if (focus === null) return false
      if (focus === 'firstExplanation') return state === focus

      return (
        state !== 'firstExplanation' &&
        focus.row === state.row &&
        focus.column === state.column
      )
    },
    setFocus,
    moveRight() {
      if (focus === null) return
      if (focus === 'firstExplanation') {
        setFocus({ row: 0, column: 0 })
        return
      }
      // Last column
      if (focus.column === columns - 1) {
        // Last row
        if (focus.row === rows - 1) {
          focusNext()
        } else {
          setFocus({ row: focus.row + 1, column: 0 })
        }
      } else {
        setFocus({ row: focus.row, column: focus.column + 1 })
      }
    },
    moveLeft() {
      if (focus === null) return
      if (focus === 'firstExplanation') {
        focusPrevious()
        return
      }

      // First column
      if (focus.column === 0) {
        // First row
        if (focus.row === 0) {
          setFocus('firstExplanation')
        } else {
          setFocus({ row: focus.row - 1, column: columns - 1 })
        }
      } else {
        setFocus({ row: focus.row, column: focus.column - 1 })
      }
    },
  }
}
