import React from 'react'
import styled from 'styled-components'

import { Math } from '@/components/content/math'
import { FrontendContentNode, Sign } from '@/data-types'
import { makeMargin } from '@/helper/css'
import { renderArticle } from '@/schema/article-renderer'

export const TableWrapper = styled.div`
  overflow-x: scroll;
  padding: 10px 0;
`

export const Table = styled.table`
  white-space: nowrap;
`

export const LeftTd = styled.td`
  text-align: right;
`

export const SignTd = styled.td`
  padding: 0 3px;
  text-align: center;
`

export const TransformTd = styled.td`
  padding-left: 5px;
`

export const ExplanationTr = styled.tr`
  color: ${(props) => props.theme.colors.brand};
`

export interface StepProps {
  left: string
  sign: Sign
  right: string
  transform: string
  explanation: FrontendContentNode[]
}

export interface EquationProps {
  steps: StepProps[]
}

export function Equations({ steps }: EquationProps) {
  return (
    <Wrapper>
      <TableWrapper>
        <Table>
          <tbody>
            {steps.map((step, i) => {
              const hasExplanation = step.explanation.some((p) => {
                return p?.children?.length
              })

              return (
                <React.Fragment key={i}>
                  <tr>
                    <LeftTd>
                      {step.left ? <Math formula={step.left} /> : null}
                    </LeftTd>
                    <SignTd>
                      <Math formula={renderSignToString(step.sign)} />
                    </SignTd>
                    <td>{step.right ? <Math formula={step.right} /> : null}</td>
                    <TransformTd>
                      {step.transform ? (
                        <>
                          |
                          <Math formula={step.transform} />
                        </>
                      ) : null}
                    </TransformTd>
                  </tr>
                  {hasExplanation ? (
                    <ExplanationTr>
                      <td />
                      <SignTd>{i === steps.length - 1 ? '→' : '↓'}</SignTd>
                      <td colSpan={2}>
                        {renderArticle(step.explanation, false)}
                      </td>
                    </ExplanationTr>
                  ) : null}
                </React.Fragment>
              )
            })}
          </tbody>
        </Table>
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

export const RightSide = styled.div`
  width: 33%;
  display: flex;
  flex-direction: row;
  @media (max-width: 480px) {
    width: 100%;
  }
  @media (max-width: 768px) {
    width: 50%;
  }
`
