import {
  faArrowCircleUp,
  faPlusCircle,
  faTrashAlt,
} from '@fortawesome/free-solid-svg-icons'
import { useContext } from 'react'

import { toTransformationTarget, TransformationTarget } from './editor-renderer'
import { StepEditor } from './step-editor'
import type { EquationsProps } from '..'
import {
  EquationsRenderer,
  type EquationsRendererStep,
  renderDownArrow,
} from '../renderer'
import { Sign } from '../sign'
import { EquationsToolbar } from '../toolbar'
import { FaIcon } from '@/components/fa-icon'
import { useEditorStrings } from '@/contexts/logged-in-data-context'
import { tw } from '@/helper/tw'
import { FocusContext } from '@/serlo-editor/core'
import { EditorTooltip } from '@/serlo-editor/editor-ui/editor-tooltip'
import { getPathDataForFocus } from '@/serlo-editor/editor-ui/focus-helper'
import { MathRenderer } from '@/serlo-editor/math'
import { store, selectIsDocumentEmpty } from '@/serlo-editor/store'
import { EditorPluginType } from '@/serlo-editor-integration/types/editor-plugin-type'

export function EquationsEditor(props: EquationsProps) {
  const { state, id: pluginId } = props

  const currentFocus = useContext(FocusContext)
  const hasNestedFocus = currentFocus.some((plugin) => plugin.id === pluginId)

  const transformationTarget = toTransformationTarget(
    state.transformationTarget.value
  )

  const equationsStrings = useEditorStrings().plugins.equations

  if (!hasNestedFocus)
    return (
      <EquationsRenderer
        firstExplanation={
          selectIsDocumentEmpty(
            store.getState(),
            state.firstExplanation.id
          ) ? null : (
            <div className="serlo-p mb-0 [&_.plugin-wrapper-container]:!mb-0">
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
          <div className="serlo-p mb-0 [&_.plugin-wrapper-container]:!mb-0">
            {explanation.render()}
          </div>
        ),
      }
    })
  }

  return (
    <div className="outline-none" tabIndex={-1}>
      {hasNestedFocus ? <EquationsToolbar {...props} /> : null}
      <div className="mx-side py-2.5">
        <table className="whitespace-nowrap">
          {renderFirstExplanation()}
          {state.steps.map((step, row) => {
            const path = ['steps', row]

            return (
              <tbody
                key={step.explanation.id}
                {...getPathDataForFocus({
                  pluginId,
                  path,
                  targetPath: [
                    ...path,
                    transformationTarget !== 'term' ? 'left' : 'right',
                  ],
                  currentFocus,
                })}
              >
                <tr>
                  <StepEditor
                    row={row}
                    path={path}
                    pluginId={pluginId}
                    currentFocus={currentFocus}
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
                  {...getPathDataForFocus({
                    pluginId,
                    path: [...path, 'explanation'],
                    currentFocus,
                  })}
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
      <tbody
        {...getPathDataForFocus({
          pluginId,
          path: ['firstExplanation'],
          currentFocus,
        })}
      >
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
  }

  function renderAddButton() {
    if (!hasNestedFocus) return

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
    if (!hasNestedFocus) return
    const buttonClass = tw`serlo-button-editor-secondary serlo-tooltip-trigger mr-2 h-8 w-8`

    return (
      <div className="ml-6 text-right">
        {row === 0 ? null : (
          <button
            onClick={() => state.steps.move(row, row - 1)}
            className={buttonClass}
            tabIndex={-1}
          >
            <EditorTooltip text={equationsStrings.moveUpLabel} />
            <FaIcon icon={faArrowCircleUp} className="-ml-0.25 align-[-3px]" />
          </button>
        )}
        <button
          className={buttonClass}
          onClick={() => state.steps.remove(row)}
          tabIndex={-1}
        >
          <EditorTooltip text={equationsStrings.removeRowLabel} />
          <FaIcon icon={faTrashAlt} className="align-baseline text-[15px]" />
        </button>
      </div>
    )
  }
}
