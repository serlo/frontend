import clsx from 'clsx'
import { Fragment, type ReactNode } from 'react'

import { Sign, renderSignToString } from './sign'
import { getPathData } from '@/serlo-editor/editor-ui/focus-helper'

export interface EquationsRendererStep {
  left: string
  sign: Sign
  right: string
  transform: string
  explanation?: JSX.Element | null
}

export interface EquationsRendererProps {
  steps: EquationsRendererStep[]
  firstExplanation?: JSX.Element | null
  transformationTarget: 'term' | 'equation'
  formulaRenderer: (formula: string) => JSX.Element | null
}

export function EquationsRenderer({
  steps,
  firstExplanation,
  formulaRenderer,
  transformationTarget,
}: EquationsRendererProps) {
  return (
    <div className="mx-side mb-7 overflow-x-auto py-2.5">
      <table>
        <tbody className="whitespace-nowrap">
          {renderFirstExplanation()}
          {steps.map(renderStep)}
        </tbody>
      </table>
    </div>
  )

  function renderStep(step: EquationsRendererStep, i: number) {
    const path = ['steps', i]

    return (
      <Fragment key={i}>
        <tr
          {...getPathData([
            ...path,
            transformationTarget !== 'term' ? 'left' : 'right',
          ])}
        >
          {transformationTarget !== 'term' &&
            renderTD(
              step.left ? renderStepFormula('left') : null,
              'text-right',
              [...path, 'left']
            )}
          {transformationTarget !== 'term' || i !== 0 ? (
            renderTD(
              formulaRenderer(renderSignToString(step.sign)),
              'text-center'
            )
          ) : (
            <td />
          )}
          {renderTD(
            step.right ? renderStepFormula('right') : null,
            'text-left',
            [...path, 'right']
          )}
          {renderTD(
            step.transform ? (
              <span className="border-l border-black pl-1">
                {renderStepFormula('transform')}
              </span>
            ) : null,
            undefined,
            [...path, 'transform']
          )}
        </tr>
        {step.explanation ? (
          <tr
            className="text-brandgreen-darker whitespace-normal"
            {...getPathData([...path, 'explanation'])}
          >
            <td />
            {renderDownArrow()}
            <td colSpan={2} className="relative -left-side px-1 pb-3 pt-1">
              {step.explanation}
            </td>
          </tr>
        ) : null}
      </Fragment>
    )

    function renderTD(
      content: JSX.Element | ReactNode[] | null,
      align?: 'text-left' | 'text-right' | 'text-center',
      path?: Array<string | number>
    ) {
      return (
        <td
          className={clsx('px-1 pb-3 pt-1 align-baseline text-lg', align)}
          {...getPathData(path)}
        >
          {content}
        </td>
      )
    }

    function renderStepFormula(key: 'transform' | 'left' | 'right') {
      return formulaRenderer('\\displaystyle ' + step[key])
    }
  }

  function renderFirstExplanation() {
    if (transformationTarget === 'term' || !firstExplanation) return null

    return (
      <>
        <tr
          className="text-brandgreen-darker whitespace-normal text-center"
          {...getPathData(['firstExplanation'])}
        >
          <td className="relative -left-side pb-4" colSpan={3}>
            {firstExplanation}
          </td>
        </tr>
        <tr
          className="text-brandgreen-darker"
          {...getPathData(['firstExplanation'])}
        >
          <td />
          {renderDownArrow()}
        </tr>
      </>
    )
  }
}

export function renderDownArrow() {
  return (
    <td className="text-center font-[serif] text-4xl">
      <div className="-mt-3">&darr;</div>
    </td>
  )
}
