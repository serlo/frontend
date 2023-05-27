import clsx from 'clsx'
import { ReactNode, Fragment } from 'react'

import { renderSignToString } from '@/edtr-io/plugins/equations/sign'
import {
  FrontendContentNode,
  FrontendNodeType,
  Sign,
} from '@/frontend-node-types'
import { RenderNestedFunction } from '@/schema/article-renderer'

export interface StepProps {
  left: string
  sign: Sign
  right: string
  transform: string
  explanation: FrontendContentNode[]
}

export interface EquationProps {
  steps: StepProps[]
  firstExplanation: FrontendContentNode[]
  transformationTarget: 'term' | 'equation'
  renderNested: RenderNestedFunction
}

export function Equations({
  steps,
  firstExplanation,
  renderNested,
  transformationTarget,
}: EquationProps) {
  return (
    <div className="overflow-x-auto py-2.5 mx-side mb-7">
      <table>
        <tbody className="whitespace-nowrap">
          {renderFirstExplanation()}
          {steps.map(renderStep)}
        </tbody>
      </table>
    </div>
  )

  function renderStep(step: StepProps, i: number) {
    return (
      <Fragment key={i}>
        <tr>
          {transformationTarget !== 'term' &&
            renderTD(
              step.left ? renderStepFormula('left') : null,
              'text-right'
            )}
          {transformationTarget !== 'term' || i !== 0 ? (
            renderTD(
              renderFormula(renderSignToString(step.sign), 'sign'),
              'text-center'
            )
          ) : (
            <td />
          )}
          {renderTD(
            step.right ? renderStepFormula('right') : null,
            'text-left'
          )}
          {renderTD(
            step.transform ? (
              <span className="border-l border-black pl-1">
                {renderStepFormula('transform')}
              </span>
            ) : null
          )}
        </tr>
        {hasContent(step.explanation) && (
          <tr className="whitespace-normal text-brandgreen-darker">
            <td />
            {renderDownArrow()}
            <td colSpan={2} className="relative -left-side px-1 pt-1 pb-3">
              {renderNested(step.explanation, `step${i}`, 'explanation')}
            </td>
          </tr>
        )}
      </Fragment>
    )

    function renderTD(
      content: JSX.Element | ReactNode[] | null,
      align?: 'text-left' | 'text-right' | 'text-center'
    ) {
      return (
        <td className={clsx('align-baseline text-lg px-1 pt-1 pb-3', align)}>
          {content}
        </td>
      )
    }

    function renderStepFormula(key: 'transform' | 'left' | 'right') {
      return renderFormula('\\displaystyle ' + step[key], key)
    }

    function renderFormula(formula: string, key: string) {
      return renderNested(
        [{ type: FrontendNodeType.InlineMath, formula }],
        `step${i}`,
        key
      )
    }
  }

  function renderFirstExplanation() {
    if (transformationTarget === 'term') return
    if (!hasContent(firstExplanation)) return

    return (
      <>
        <tr className="whitespace-normal text-brandgreen-darker text-center">
          <td className="relative -left-side pb-4" colSpan={3}>
            {renderNested(firstExplanation, 'firstExplanation')}
          </td>
        </tr>
        <tr className="text-brandgreen-darker">
          <td />
          {renderDownArrow()}
        </tr>
      </>
    )
  }

  function renderDownArrow() {
    return (
      <td className="text-4xl text-center" style={{ fontFamily: 'serif' }}>
        <div className="-mt-3">&darr;</div>
      </td>
    )
  }
}

function hasContent(content: FrontendContentNode[]): boolean {
  if (content[0]?.type === 'slate-container')
    return hasContent(content[0].children ?? [])
  return content.some((node) => node?.children?.length || node.type === 'math')
}
