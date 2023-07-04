import { faPlusCircle, faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import { includes } from 'ramda'
import { useContext, useEffect, useState } from 'react'

import { EquationsProps, stepProps } from '.'
import { toTransformationTarget, TransformationTarget } from './editor-renderer'
import {
  EquationsRenderer,
  EquationsRendererStep,
  renderDownArrow,
} from './renderer'
import { renderSignToString, Sign } from './sign'
import { FaIcon } from '@/components/fa-icon'
import { useEditorStrings } from '@/contexts/logged-in-data-context'
import {
  HotKeys,
  PreferenceContext,
  setDefaultPreference,
} from '@/serlo-editor/core'
import { MathEditor, MathRenderer } from '@/serlo-editor/math'
import { StateTypeReturnType, StringStateType } from '@/serlo-editor/plugin'
import {
  store,
  focus,
  focusNext,
  focusPrevious,
  selectFocused,
  selectIsDocumentEmpty,
  useAppSelector,
  useAppDispatch,
  selectFocusTree,
} from '@/serlo-editor/store'

enum StepSegment {
  Left = 0,
  Right = 1,
  Transform = 2,
  Explanation = 3,
}

const preferenceKey = 'katex:usevisualmath'

setDefaultPreference(preferenceKey, true)

export function EquationsEditor(props: EquationsProps) {
  const { focused, state } = props

  const dispatch = useAppDispatch()
  const focusTree = useAppSelector(selectFocusTree)
  const focusedElement = useAppSelector(selectFocused)
  const nestedFocus =
    focused ||
    includes(
      focusedElement,
      props.state.steps.map((step) => step.explanation.id)
    ) ||
    focusedElement === state.firstExplanation.id

  const transformationTarget = toTransformationTarget(
    state.transformationTarget.value
  )

  const gridFocus = useGridFocus({
    rows: state.steps.length,
    columns: 4,
    focusNext: () => dispatch(focusNext(focusTree)),
    focusPrevious: () => dispatch(focusPrevious(focusTree)),
    transformationTarget,
    onFocusChanged: (state) => {
      if (state === 'firstExplanation') {
        dispatch(focus(props.state.firstExplanation.id))
      } else if (state.column === StepSegment.Explanation) {
        dispatch(focus(props.state.steps[state.row].explanation.id))
      } else {
        dispatch(focus(props.id))
      }
    },
  })

  useEffect(() => {
    if (nestedFocus) {
      gridFocus.setFocus({
        row: 0,
        column: firstColumn(transformationTarget),
      })
      dispatch(focus(props.id))
    }
    //prevents loop
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [nestedFocus])

  const editorStrings = useEditorStrings()

  if (!nestedFocus)
    return (
      <EquationsRenderer
        firstExplanation={
          selectIsDocumentEmpty(
            store.getState(),
            state.firstExplanation.id
          ) ? null : (
            <div className="serlo-p mb-0 [&_.document-editor-container]:!mb-0">
              {state.firstExplanation.render()}
            </div>
          )
        }
        steps={getStaticSteps()}
        transformationTarget={transformationTarget}
        formulaRenderer={(formula: string) => (
          <MathRenderer inline state={formula} />
        )}
      />
    )

  function getStaticSteps(): EquationsRendererStep[] {
    return state.steps.map(({ left, sign, right, transform, explanation }) => {
      return {
        left: left.value,
        sign: sign.value as Sign,
        right: right.value,
        transform: transform.value,
        explanation: selectIsDocumentEmpty(
          store.getState(),
          explanation.id
        ) ? null : (
          <div className="serlo-p mb-0 [&_.document-editor-container]:!mb-0">
            {explanation.render()}
          </div>
        ),
      }
    })
  }

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
                column: lastColumn(transformationTarget),
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
      {props.renderIntoSettings(
        <div>
          <label htmlFor="transformationTarget">
            {editorStrings.plugins.equations.mode}:
          </label>{' '}
          <select
            id="transformationTarget"
            value={transformationTarget}
            onChange={(e) => state.transformationTarget.set(e.target.value)}
          >
            <option value={TransformationTarget.Equation}>
              {editorStrings.plugins.equations.transformationOfEquations}
            </option>
            <option value={TransformationTarget.Term}>
              {editorStrings.plugins.equations.transformationOfTerms}
            </option>
          </select>
        </div>
      )}
      <div className="py-2.5">
        <table className="whitespace-nowrap">
          {renderFirstExplanation()}
          {state.steps.map((step, row) => {
            return (
              <tbody key={step.explanation.id}>
                <tr>
                  <StepEditor
                    gridFocus={gridFocus}
                    row={row}
                    state={step}
                    transformationTarget={transformationTarget}
                  />
                  <td>{renderCloseButton(row)}</td>
                </tr>
                {renderExplantionTr()}
              </tbody>
            )

            function renderExplantionTr() {
              if (row === state.steps.length - 1) return null

              return (
                <tr
                  className="[&_div]:m-0"
                  onFocus={() =>
                    gridFocus.setFocus({
                      row,
                      column: StepSegment.Explanation,
                    })
                  }
                >
                  {transformationTarget === TransformationTarget.Equation && (
                    <td />
                  )}
                  <td />
                  {!selectIsDocumentEmpty(
                    store.getState(),
                    step.explanation.id
                  ) ? (
                    renderDownArrow()
                  ) : (
                    <td />
                  )}
                  <td colSpan={2} className="min-w-[10rem]">
                    {step.explanation.render({
                      config: {
                        placeholder:
                          row === 0 &&
                          transformationTarget === TransformationTarget.Term
                            ? editorStrings.plugins.equations.combineLikeTerms
                            : editorStrings.plugins.equations.explanation,
                      },
                    })}
                  </td>
                </tr>
              )
            }
          })}
        </table>

        {renderAddButton()}
      </div>
    </HotKeys>
  )

  // const { source, destination } = result
  // if (!destination) return
  // state.steps.move(source.index, destination.index)

  function renderFirstExplanation() {
    if (transformationTarget === TransformationTarget.Term) return

    return (
      <tbody onFocus={() => gridFocus.setFocus('firstExplanation')}>
        <tr className="text-center [&_div]:m-0">
          <td />
          <td colSpan={3}>
            {state.firstExplanation.render({
              config: {
                placeholder: editorStrings.plugins.equations.firstExplanation,
              },
            })}
          </td>
        </tr>
        <tr className="h-8">
          <td />
          <td />
          {!selectIsDocumentEmpty(store.getState(), state.firstExplanation.id)
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
    gridFocus.setFocus({
      row: index,
      column: firstColumn(transformationTarget),
    })
  }

  function renderAddButton() {
    if (!nestedFocus) return

    return (
      <button
        className="serlo-button-editor-secondary mt-6"
        onClick={() => insertNewEquationWithFocus(state.steps.length)}
      >
        <FaIcon icon={faPlusCircle} /> {editorStrings.plugins.equations.addNew}
      </button>
    )
  }
  function renderCloseButton(row: number) {
    if (!nestedFocus) return
    return (
      <button
        className="serlo-button-editor-secondary h-7 w-7"
        onClick={() => state.steps.remove(row)}
      >
        <FaIcon icon={faTrashAlt} className="align-baseline text-sm" />
      </button>
    )
  }
}

interface StepEditorProps {
  gridFocus: GridFocus
  row: number
  state: StateTypeReturnType<typeof stepProps>
  transformationTarget: TransformationTarget
}

function StepEditor(props: StepEditorProps) {
  const editorStrings = useEditorStrings()
  const { gridFocus, row, state, transformationTarget } = props

  return (
    <>
      {transformationTarget === TransformationTarget.Equation && (
        <td
          className="text-right"
          onClick={() => gridFocus.setFocus({ row, column: StepSegment.Left })}
        >
          <InlineMath
            focused={gridFocus.isFocused({ row, column: StepSegment.Left })}
            placeholder={
              row === 0
                ? '3x+1'
                : `[${editorStrings.plugins.equations.leftHandSide}]`
            }
            state={state.left}
            onChange={(src) => state.left.set(src)}
            onFocusNext={() => gridFocus.moveRight()}
            onFocusPrevious={() => gridFocus.moveLeft()}
          />
        </td>
      )}
      <td className="py-0 px-[3px] text-center align-baseline">
        {(transformationTarget === 'equation' || row !== 0) && (
          <select
            className="ml-4 mr-2.5 h-8 w-9 rounded-md border-[1px] border-gray-200 bg-gray-200"
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
              Sign.NotEqualTo,
              Sign.AlmostEqualTo,
              Sign.Estimates,
            ].map((sign) => {
              return (
                <option key={sign} value={sign}>
                  {renderSignToString(sign)}
                </option>
              )
            })}
          </select>
        )}
      </td>
      <td
        className="align-baseline"
        onClick={() => gridFocus.setFocus({ row, column: StepSegment.Right })}
      >
        <InlineMath
          focused={gridFocus.isFocused({ row, column: StepSegment.Right })}
          placeholder={
            row === 0
              ? '4x+3x'
              : transformationTarget === TransformationTarget.Term
              ? `[${editorStrings.plugins.equations.term}]`
              : `[${editorStrings.plugins.equations.rightHandSide}]`
          }
          state={state.right}
          onChange={(src) => state.right.set(src)}
          onFocusNext={() => gridFocus.moveRight()}
          onFocusPrevious={() => gridFocus.moveLeft()}
        />
      </td>
      {transformationTarget === TransformationTarget.Equation && (
        <td
          className="pl-[5px] align-baseline"
          onClick={() =>
            gridFocus.setFocus({ row, column: StepSegment.Transform })
          }
        >
          |{' '}
          <InlineMath
            focused={gridFocus.isFocused({
              row,
              column: StepSegment.Transform,
            })}
            placeholder={
              row === 0
                ? editorStrings.plugins.equations.transformationExample
                : `[${editorStrings.plugins.equations.transformation}]`
            }
            state={state.transform}
            onChange={(src) => state.transform.set(src)}
            onFocusNext={() => gridFocus.moveRight()}
            onFocusPrevious={() => gridFocus.moveLeft()}
          />
        </td>
      )}
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

  const preferences = useContext(PreferenceContext)

  return (
    <MathEditor
      readOnly={!focused}
      state={`${prefix}${state.value}${suffix}`}
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
  transformationTarget,
}: {
  rows: number
  columns: number
  focusNext: () => void
  focusPrevious: () => void
  onFocusChanged: (args: GridFocusState) => void
  transformationTarget: TransformationTarget
}): GridFocus {
  const [focus, setFocusState] = useState<GridFocusState | null>(null)
  const setFocus = (state: GridFocusState) => {
    onFocusChanged(state)
    setFocusState(state)
  }
  const isFocused = (state: GridFocusState) => {
    if (focus === null) return false
    if (focus === 'firstExplanation') return state === focus

    return (
      state !== 'firstExplanation' &&
      focus.row === state.row &&
      focus.column === state.column
    )
  }

  return {
    focus,
    isFocused,
    setFocus(state) {
      if (!isFocused(state)) setFocus(state)
    },
    moveRight() {
      if (focus === null) return
      if (focus === 'firstExplanation') {
        setFocus({ row: 0, column: firstColumn(transformationTarget) })
        return
      }

      if (
        focus.row === rows - 1 &&
        focus.column === lastColumn(transformationTarget)
      ) {
        focusNext()
      } else if (transformationTarget === TransformationTarget.Term) {
        if (focus.column === StepSegment.Right) {
          setFocus({ row: focus.row, column: StepSegment.Explanation })
        } else {
          setFocus({
            row: focus.row + 1,
            column: firstColumn(transformationTarget),
          })
        }
      } else if (focus.column === columns - 1) {
        setFocus({ row: focus.row + 1, column: StepSegment.Left })
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

      if (transformationTarget === TransformationTarget.Term) {
        if (focus.row === 0 && focus.column === StepSegment.Right) {
          focusPrevious()
        } else if (focus.column === StepSegment.Right) {
          setFocus({ row: focus.row - 1, column: StepSegment.Explanation })
        } else {
          setFocus({ row: focus.row, column: StepSegment.Right })
        }
      } else {
        if (focus.column === 0) {
          if (focus.row === 0) {
            setFocus('firstExplanation')
          } else {
            setFocus({ row: focus.row - 1, column: columns - 1 })
          }
        } else {
          setFocus({ row: focus.row, column: focus.column - 1 })
        }
      }
    },
  }
}

function firstColumn(transformationTarget: TransformationTarget) {
  return transformationTarget === TransformationTarget.Term
    ? StepSegment.Right
    : StepSegment.Left
}

function lastColumn(transformationTarget: TransformationTarget) {
  return transformationTarget === TransformationTarget.Term
    ? StepSegment.Right
    : StepSegment.Transform
}
