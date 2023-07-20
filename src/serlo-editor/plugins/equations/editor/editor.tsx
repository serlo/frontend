import {
  faArrowCircleUp,
  faPlusCircle,
  faTrashAlt,
} from '@fortawesome/free-solid-svg-icons'
import { includes } from 'ramda'
import { useEffect } from 'react'

import { toTransformationTarget, TransformationTarget } from './editor-renderer'
import { useGridFocus } from './grid-focus'
import { StepEditor } from './step-editor'
import { EquationsProps } from '..'
import { useInlineTextEditor } from '../../text/hooks/use-inline-text-editor'
import {
  EquationsRenderer,
  EquationsRendererStep,
  renderDownArrow,
} from '../renderer'
import { Sign } from '../sign'
import { EquationsToolbar } from '../toolbar'
import { FaIcon } from '@/components/fa-icon'
import { useEditorStrings } from '@/contexts/logged-in-data-context'
import { tw } from '@/helper/tw'
import { HotKeys } from '@/serlo-editor/core'
import { EditorTooltip } from '@/serlo-editor/editor-ui/editor-tooltip'
import { TextEditorFormattingOption } from '@/serlo-editor/editor-ui/plugin-toolbar/text-controls/types'
import { MathRenderer } from '@/serlo-editor/math'
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
import { EditorPluginType } from '@/serlo-editor-integration/types/editor-plugin-type'

// TODO: rename
const titleFormattingOptions = [
  TextEditorFormattingOption.colors,
  TextEditorFormattingOption.headings,
  TextEditorFormattingOption.katex,
  TextEditorFormattingOption.links,
  TextEditorFormattingOption.lists,
  TextEditorFormattingOption.math,
  TextEditorFormattingOption.paragraphs,
  TextEditorFormattingOption.richText,
]

export enum StepSegment {
  Left = 0,
  Right = 1,
  Transform = 2,
  Explanation = 3,
}

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

  const equationsStrings = useEditorStrings().plugins.equations

  // TODO: for some reason focus switches back to 'firstExplanation' all the time, especially after editing
  // could not find the problem so far
  // the cleaner solution would be to change the hook to a function so we can map the steps and return an editor for each step…

  const currentStepExplanationEditor = useInlineTextEditor({
    id:
      gridFocus.focus === 'firstExplanation' || gridFocus.focus === null
        ? state.firstExplanation.id
        : state.steps.length > gridFocus.focus.row
        ? state.steps[gridFocus.focus.row].explanation.id
        : state.firstExplanation.id,
    formattingOptions: titleFormattingOptions,
  })

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
    <>
      {!props.focused && !currentStepExplanationEditor.isFocused ? null : (
        <EquationsToolbar
          {...props}
          controls={currentStepExplanationEditor.toolbarControls}
          editor={currentStepExplanationEditor.editor}
        />
      )}

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
                    <td>{renderButtons(row)}</td>
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
                          controls: {
                            editor: currentStepExplanationEditor.editor,
                            textFormattingOptions:
                              currentStepExplanationEditor.textFormattingOptions,
                            isChanged: currentStepExplanationEditor.isChanged,
                            onChange: currentStepExplanationEditor.setIsChanged,
                          },
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
    </>
  )

  function renderFirstExplanation() {
    if (transformationTarget === TransformationTarget.Term) return

    return (
      <tbody onFocus={() => gridFocus.setFocus('firstExplanation')}>
        <tr className="text-center [&_div]:m-0">
          <td colSpan={3}>
            {state.firstExplanation.render({
              config: {
                placeholder: equationsStrings.firstExplanation,
                controls: {
                  editor: currentStepExplanationEditor.editor,
                  textFormattingOptions:
                    currentStepExplanationEditor.textFormattingOptions,
                  isChanged: currentStepExplanationEditor.isChanged,
                  onChange: currentStepExplanationEditor.setIsChanged,
                },
              },
            })}
          </td>
        </tr>
        <tr className="h-8">
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
      explanation: { plugin: EditorPluginType.Text },
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
        className="serlo-button-editor-secondary mt-6 text-base"
        onClick={() => insertNewEquationWithFocus(state.steps.length)}
      >
        <FaIcon icon={faPlusCircle} /> {equationsStrings.addNewRow}
      </button>
    )
  }

  function renderButtons(row: number) {
    if (!nestedFocus) return
    const buttonClass = tw`serlo-button-editor-secondary serlo-tooltip-trigger mr-2 h-8 w-8`

    return (
      <div className="ml-6 text-right">
        {row === 0 ? null : (
          <button
            onClick={() => state.steps.move(row, row - 1)}
            className={buttonClass}
          >
            <EditorTooltip text={equationsStrings.moveUpLabel} />
            <FaIcon icon={faArrowCircleUp} className="-ml-0.25 align-[-3px]" />
          </button>
        )}
        <button className={buttonClass} onClick={() => state.steps.remove(row)}>
          <EditorTooltip text={equationsStrings.removeRowLabel} />
          <FaIcon icon={faTrashAlt} className="align-baseline text-[15px]" />
        </button>
      </div>
    )
  }
}

export function firstColumn(transformationTarget: TransformationTarget) {
  return transformationTarget === TransformationTarget.Term
    ? StepSegment.Right
    : StepSegment.Left
}

export function lastColumn(transformationTarget: TransformationTarget) {
  return transformationTarget === TransformationTarget.Term
    ? StepSegment.Right
    : StepSegment.Transform
}
