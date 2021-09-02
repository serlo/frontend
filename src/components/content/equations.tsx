import { shade } from 'polished'
import { Fragment } from 'react'
import styled from 'styled-components'

import { FrontendContentNode, Sign } from '@/data-types'
import { makeMargin } from '@/helper/css'
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
  renderNested: RenderNestedFunction
}

export function Equations({ steps, renderNested }: EquationProps) {
  return (
    <Wrapper>
      <TableWrapper>
        <table>
          <TBody>
            {steps.map((step, i) => {
              const hasExplanation = step.explanation.some((node) => {
                return node?.children?.length || node.type == 'math'
              })

              return (
                <Fragment key={i}>
                  <tr>
                    <LeftTd>
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
                    </LeftTd>
                    <SignTd>
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
                    </SignTd>
                    <RightTd>
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
                    </RightTd>
                    <TransformTd>
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
                    </TransformTd>
                  </tr>
                  {hasExplanation ? (
                    <ExplanationTr>
                      <td />
                      <SignTd>{i === steps.length - 1 ? '→' : '↓'}</SignTd>
                      <td colSpan={2}>
                        {renderNested(
                          step.explanation,
                          `step${i}`,
                          'explaination'
                        )}
                      </td>
                    </ExplanationTr>
                  ) : null}
                </Fragment>
              )
            })}
          </TBody>
        </table>
      </TableWrapper>
    </Wrapper>
  )
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

const TableWrapper = styled.div`
  overflow-x: auto;
  padding: 10px 0;
`

const TBody = styled.tbody`
  white-space: nowrap;

  > tr > td {
    padding: 3px 3px 13px 3px;
  }
`

const RightTd = styled.td`
  vertical-align: baseline;
  font-size: 1.125rem;
`

const LeftTd = styled(RightTd)`
  text-align: right;
`

const SignTd = styled(RightTd)`
  padding: 0 3px;
  text-align: center;
`

const TransformTd = styled(RightTd)`
  padding-left: 5px;
`

const ExplanationTr = styled.tr`
  color: ${(props) => shade(0.3, props.theme.colors.brandGreen)};
  white-space: normal;
`
