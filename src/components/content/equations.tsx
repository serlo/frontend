import { shade } from 'polished'
import React from 'react'
import styled from 'styled-components'

import { Math } from '@/components/content/math'
import { FrontendContentNode, Sign } from '@/data-types'
import { makeMargin } from '@/helper/css'
import { renderArticle } from '@/schema/article-renderer'

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

const TableWrapper = styled.div`
  overflow-x: scroll;
  padding: 10px 0;
`

const Table = styled.table`
  white-space: nowrap;

  > tr > td {
    padding: 3px 3px 13px 3px;
  }
`

const LeftTd = styled.td`
  text-align: right;
`

const SignTd = styled.td`
  padding: 0 3px;
  text-align: center;
`

const TransformTd = styled.td`
  padding-left: 5px;
`

const ExplanationTr = styled.tr`
  color: ${(props) => shade(0.3, props.theme.colors.brandGreen)};
  white-space: normal;
`

/*
const RightSide = styled.div`
  width: 33%;
  display: flex;
  flex-direction: row;
  @media (max-width: 480px) {
    width: 100%;
  }
  @media (max-width: 768px) {
    width: 50%;
  }
`*/
