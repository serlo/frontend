import { cn } from '@serlo/frontend/src/helper/cn'
import { Fragment, type ReactNode } from 'react'

import { Sign, signStrings } from './sign'

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
    return (
      <Fragment key={i}>
        <tr>
          {transformationTarget !== 'term' &&
            renderTD(
              step.left ? renderStepFormula('left') : null,
              'text-right'
            )}
          {transformationTarget !== 'term' || i !== 0 ? (
            renderTD(formulaRenderer(signStrings[step.sign]), 'text-center')
          ) : (
            <td />
          )}
          {renderTD(
            step.right ? renderStepFormula('right') : null,
            'text-left'
          )}
          {renderTD(
            transformationTarget !== 'term' && step.transform ? (
              <span className="border-l border-black pl-1">
                {renderStepFormula('transform')}
              </span>
            ) : null
          )}
        </tr>
        {step.explanation ? (
          <tr className="text-brandgreen-darker whitespace-normal">
            <td />
            {transformationTarget === 'term' ? (
              <td colSpan={2}>
                <span className="flex">
                  {renderDownArrow()}
                  {step.explanation}
                </span>
              </td>
            ) : (
              <>
                <td className="text-center">{renderDownArrow()}</td>
                <td colSpan={2}>{step.explanation}</td>
              </>
            )}
          </tr>
        ) : null}
      </Fragment>
    )

    function renderTD(
      content: JSX.Element | ReactNode[] | null,
      align?: 'text-left' | 'text-right' | 'text-center'
    ) {
      return (
        <td className={cn('px-1 pb-3 pt-1 align-baseline text-lg', align)}>
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
        <tr className="text-brandgreen-darker whitespace-normal text-center">
          <td className="relative -left-side pb-4" colSpan={3}>
            {firstExplanation}
          </td>
        </tr>
        <tr className="text-brandgreen-darker">
          <td />
          <td className="text-center">{renderDownArrow()}</td>
        </tr>
      </>
    )
  }
}

export function renderDownArrow() {
  return <span className="self-center font-[serif] text-4xl">&darr;</span>
}
