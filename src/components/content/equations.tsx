import { shade } from 'polished'
import { Fragment } from 'react'
import styled from 'styled-components'

import { FrontendContentNode, Sign } from '@/data-types'
import { makeMargin } from '@/helper/css'
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
    <Wrapper className="overflow-x-auto py-2.5">
      <table>
        <style jsx>{`
          .formula {
            @apply align-baseline text-lg;
          }
        `}</style>
        <TBody className="whitespace-no-wrap">
          {steps.map((step, i) => {
            const hasExplanation = step.explanation.some((node) => {
              return node?.children?.length || node.type == 'math'
            })

            return (
              <Fragment key={i}>
                <tr>
                  <td className="text-right formula">
                    {step.left
                      ? renderNested(
                          [
                            {
                              type: 'inline-math',
                              formula: '\\displaystyle ' + step.left,
                            },
                          ],
                          `step${i}`,
                          'left'
                        )
                      : null}
                  </td>
                  <td className="text-center formula">
                    {renderNested(
                      [
                        {
                          type: 'inline-math',
                          formula: renderSignToString(step.sign),
                        },
                      ],
                      `step${i}`,
                      'sign'
                    )}
                  </td>
                  <td className="text-left formula">
                    {step.right
                      ? renderNested(
                          [
                            {
                              type: 'inline-math',
                              formula: '\\displaystyle ' + step.right,
                            },
                          ],
                          `step${i}`,
                          'right'
                        )
                      : null}
                  </td>
                  <td className="pl-1 formula">
                    {step.transform ? (
                      <>
                        |
                        {renderNested(
                          [
                            {
                              type: 'inline-math',
                              formula: '\\displaystyle ' + step.transform,
                            },
                          ],
                          `step${i}`,
                          'transform'
                        )}
                      </>
                    ) : null}
                  </td>
                </tr>
                {hasExplanation ? (
                  <tr
                    className="whitespace-normal"
                    style={{ color: explanationColor }}
                  >
                    <td />
                    {renderDownArrow()}
                    <td colSpan={2}>
                      {renderNested(
                        step.explanation,
                        `step${i}`,
                        'explaination'
                      )}
                    </td>
                  </tr>
                ) : null}
              </Fragment>
            )
          })}
        </TBody>
      </table>
    </Wrapper>
  )

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

const Wrapper = styled.div`
  margin-bottom: ${(props) => props.theme.spacing.mb.block};
  ${makeMargin}
`

const TBody = styled.tbody`
  > tr > td {
    padding: 3px 3px 13px 3px;
  }
`
