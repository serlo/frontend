import { shade } from 'polished'

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
      <>
        <style jsx>{`
          .formula {
            @apply align-baseline text-lg;
          }
          tr > td {
            padding: 3px 3px 13px 3px;
          }
        `}</style>
        <tr>
          <td className="text-right formula">
            {step.left ? renderStepFormula('left') : null}
          </td>
          <td className="text-center formula">
            {renderFormula(renderSignToString(step.sign), 'sign')}
          </td>
          <td className="text-left formula">
            {step.right ? renderStepFormula('right') : null}
          </td>
          <td className="formula">
            {step.transform ? (
              <span className="border-l border-black pl-1">
                {renderStepFormula('transform')}
              </span>
            ) : null}
          </td>
        </tr>
        {hasExplanation ? (
          <tr className="whitespace-normal" style={{ color: explanationColor }}>
            <td />
            {renderDownArrow()}
            <td colSpan={2}>
              {renderNested(step.explanation, `step${i}`, 'explaination')}
            </td>
          </tr>
        ) : null}
      </>
    )

    function renderStepFormula(key: 'transform' | 'left' | 'right') {
      return renderFormula('\\displaystyle ' + step[key], key)
    }

    function renderFormula(formula: string, key: string) {
      return renderNested([{ type: 'inline-math', formula }], `step${i}`, key)
    }
  }

  function renderDownArrow() {
    const downArrow = `
      <svg xmlns="http://www.w3.org/2000/svg">
        <defs>
          <marker
            id="arrow"
            markerWidth="10"
            markerHeight="10"
            orient="auto"
            markerUnits="strokeWidth"
            refX="10"
            refY="5"
            viewBox="0 0 20 10"
          >
            <path
              d="M 0,0 l 10,5 l -10,5"
              stroke="${explanationColor}"
              stroke-width="2"
              fill="none"
              vector-effect="non-scaling-size"
            />
          </marker>
        </defs>
        <line
          x1="10"
          y1="0%"
          x2="10"
          y2="99%"
          stroke="${explanationColor}"
          stroke-width="1.5"
          marker-end="url(#arrow)"
          vector-effect="non-scaling-stroke"
        />
      </svg>`
    const downArrowBase64 = Buffer.from(downArrow).toString('base64')

    return (
      <td
        style={{
          backgroundImage: `url('data:image/svg+xml;base64,${downArrowBase64}')`,
          backgroundSize: '20px calc(100% - 10px)',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center 5px',
        }}
      />
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
