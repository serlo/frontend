import {
  faArrowCircleUp,
  faPlusCircle,
  faTrashAlt,
} from '@fortawesome/free-solid-svg-icons'
import { includes } from 'ramda'
import { useCallback, useEffect, useRef } from 'react'
import { useHotkeys } from 'react-hotkeys-hook'

import { toTransformationTarget, TransformationTarget } from './editor-renderer'
import { useGridFocus } from './grid-focus'
import { StepEditor } from './step-editor'
import { StepSegment } from './step-segment'
import type { EquationsProps } from '..'
import { renderDownArrow } from '../renderer'
import { EquationsStaticRenderer } from '../static'
import { EquationsToolbar } from '../toolbar'
import { FaIcon } from '@/components/fa-icon'
import { useEditorStrings } from '@/contexts/logged-in-data-context'
import { cn } from '@/helper/cn'
import { EditorTooltip } from '@/serlo-editor/editor-ui/editor-tooltip'
import {
  store,
  focus,
  focusNext,
  focusPrevious,
  selectFocused,
  selectIsDocumentEmpty,
  useAppSelector,
  useAppDispatch,
  selectChildTree,
  selectStaticDocument,
} from '@/serlo-editor/store'
import { EditorPluginType } from '@/serlo-editor/types/editor-plugin-type'
import type { EditorEquationsDocument } from '@/serlo-editor/types/editor-plugins'

export function EquationsEditor(props: EquationsProps) {
  const { focused, state, id } = props

  const dispatch = useAppDispatch()
  const focusedElement = useAppSelector(selectFocused)
  const nestedFocus =
    focused ||
    includes(
      focusedElement,
      props.state.steps.map((step) => step.explanation.id)
    ) ||
    focusedElement === state.firstExplanation.id

  const staticDocument = useAppSelector((storeState) =>
    selectStaticDocument(storeState, id)
  )

  const transformationTarget = toTransformationTarget(
    state.transformationTarget.value
  )

  const gridFocus = useGridFocus({
    rows: state.steps.length,
    columns: 4,
    focusNext: () => {
      const focusTree = selectChildTree(store.getState())
      dispatch(focusNext(focusTree))
    },
    focusPrevious: () => {
      const focusTree = selectChildTree(store.getState())
      dispatch(focusPrevious(focusTree))
    },
    transformationTarget,
    onFocusChanged: (state) => {
      if (state === 'firstExplanation') {
        dispatch(focus(props.state.firstExplanation.id))
      } else if (state?.column === StepSegment.Explanation) {
        dispatch(focus(props.state.steps[state.row].explanation.id))
      } else {
        dispatch(focus(props.id))
      }
    },
  })
  const { setFocus } = gridFocus

  const pluginFocusWrapper = useRef<HTMLDivElement>(null)

  const resetFocus = useCallback(() => {
    setFocus(null)
    pluginFocusWrapper?.current?.focus()
  }, [setFocus])

  useHotkeys(
    'tab',
    (event) => {
      handleKeyDown(event, () => {
        const isPluginWrapperFocused =
          pluginFocusWrapper.current === document.activeElement

        // Restore focus to first explanation
        if (isPluginWrapperFocused) {
          gridFocus.setFocus('firstExplanation')
          return
        }

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
    {
      scopes: ['global'],
      enabled: focused,
    }
  )

  useHotkeys(
    'shift+tab',
    (event) => {
      handleKeyDown(event, () => {
        const isPluginWrapperFocused =
          pluginFocusWrapper.current === document.activeElement
        // Restore focus to first explanation
        if (isPluginWrapperFocused) {
          gridFocus.setFocus('firstExplanation')
          return
        }
        gridFocus.moveLeft()
      })
    },
    {
      scopes: ['global'],
      enabled: focused,
    }
  )

  useHotkeys(
    'return',
    (event) => {
      handleKeyDown(event, () => {
        if (!gridFocus.focus || gridFocus.focus === 'firstExplanation') return
        insertNewEquationWithFocus(gridFocus.focus.row + 1)
      })
    },
    {
      scopes: ['global'],
      enabled: focused,
    }
  )

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

  if (!nestedFocus) {
    return (
      <EquationsStaticRenderer
        {...(staticDocument as EditorEquationsDocument)}
      />
    )
  }

  const hasFocusWithin =
    typeof window !== 'undefined' && pluginFocusWrapper.current
      ? pluginFocusWrapper.current.contains(document.activeElement)
      : false

  return (
    <div ref={pluginFocusWrapper} className="outline-none" tabIndex={-1}>
      {props.focused || hasFocusWithin ? <EquationsToolbar {...props} /> : null}
      <div className="mx-side py-2.5">
        <table className="whitespace-nowrap">
          {renderFirstExplanation()}
          {state.steps.map((step, row) => {
            return (
              <tbody key={step.explanation.id}>
                <tr>
                  <StepEditor
                    gridFocus={gridFocus}
                    resetFocus={resetFocus}
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
                        isInlineChildEditor: true,
                        placeholder:
                          row === 0 &&
                          transformationTarget === TransformationTarget.Term
                            ? equationsStrings.combineLikeTerms
                            : equationsStrings.explanation,
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
    </div>
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
                isInlineChildEditor: true,
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

  function handleKeyDown(e: KeyboardEvent | undefined, callback: () => void) {
    e && e.preventDefault()
    callback()
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
    const buttonClass = cn(
      `serlo-button-editor-secondary serlo-tooltip-trigger mr-2 h-8 w-8`
    )

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
