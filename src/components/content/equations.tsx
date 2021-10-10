import clsx from 'clsx'
import { shade } from 'polished'
import { ReactNode, Fragment } from 'react'

import { FrontendContentNode, Sign } from '@/data-types'
import { RenderNestedFunction } from '@/schema/article-renderer'
import { theme } from '@/theme'

export interface StepProps {
  left: string
  sign: Sign
  right: string
  transform: string
  explanation: FrontendContentNode[]
}

export interface EquationProps {
  steps: StepProps[]
  renderNested: RenderNestedFunction
}

export function Equations({ steps, renderNested }: EquationProps) {
  const explanationColor = shade(0.3, theme.colors.brandGreen)

  return (
    <div className="overflow-x-auto py-2.5 mx-side mb-7">
      <table>
        <tbody className="whitespace-nowrap">{steps.map(renderStep)}</tbody>
      </table>
    </div>
  )

  function renderStep(step: StepProps, i: number) {
    const hasExplanation = step.explanation.some((node) => {
      return node?.children?.length || node.type == 'math'
    })

    return (
      <Fragment key={i}>
        <tr>
          {renderTD(step.left ? renderStepFormula('left') : null, 'text-right')}
          {renderTD(
            renderFormula(renderSignToString(step.sign), 'sign'),
            'text-center'
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
        {hasExplanation ? (
          <tr className="whitespace-normal" style={{ color: explanationColor }}>
            <td />
            {renderDownArrow()}
            <td colSpan={2} className="px-1 pt-1 pb-3">
              {renderNested(step.explanation, `step${i}`, 'explaination')}
            </td>
          </tr>
        ) : null}
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
      return renderNested([{ type: 'inline-math', formula }], `step${i}`, key)
    }
  }

  function renderDownArrow() {
    return (
      <td className="text-4xl" style={{ fontFamily: 'serif' }}>
        <div className="-mt-3">&darr;</div>
      </td>
    )
  }
}

function renderSignToString(sign: Sign): string {
  switch (sign) {
    case Sign.Equals:
      return '='
    case Sign.GreaterThan:
      return '>'
    case Sign.GreaterThanOrEqual:
      return '≥'
    case Sign.LessThan:
      return '<'
    case Sign.LessThanOrEqual:
      return '≤'
    case Sign.AlmostEqualTo:
      return '≈'
  }
}
