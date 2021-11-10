import { useScopedStore } from '@edtr-io/core'
import { MathRenderer } from '@edtr-io/math'
import { isEmpty } from '@edtr-io/store'
import { styled } from '@edtr-io/ui'
import * as React from 'react'

import { EquationsProps } from '.'
import { renderSignToString, Sign } from './sign'

export const TableWrapper = styled.div({
  overflowX: 'scroll',
  padding: '10px 0',
})

export const Table = styled.table({
  whiteSpace: 'nowrap',
})

export const MathTd = styled.td({ verticalAlign: 'baseline' })

export const LeftTd = styled(MathTd)({
  textAlign: 'right',
})

export const SignTd = styled.td({
  padding: '0 3px',
  textAlign: 'center',
  verticalAlign: 'baseline',
})

export const TransformTd = styled(MathTd)({
  paddingLeft: '5px',
})

export const ExplanationTr = styled.tr({
  color: '#688312',
  div: {
    margin: 0,
  },
})

export function EquationsRenderer({ state }: EquationsProps) {
  const store = useScopedStore()

  return (
    <TableWrapper>
      <Table>
        <tbody>
          {renderFirstExplanation()}
          {state.steps.map((step, index) => {
            return (
              <React.Fragment key={index}>
                <tr>
                  <LeftTd>
                    {step.left.value ? (
                      <MathRenderer inline state={step.left.value} />
                    ) : null}
                  </LeftTd>
                  <SignTd>
                    <MathRenderer
                      inline
                      state={renderSignToString(step.sign.value as Sign)}
                    />
                  </SignTd>
                  <MathTd>
                    {step.right.value ? (
                      <MathRenderer inline state={step.right.value} />
                    ) : null}
                  </MathTd>
                  <TransformTd>
                    {step.transform.value ? (
                      <>
                        |
                        <MathRenderer inline state={step.transform.value} />
                      </>
                    ) : null}
                  </TransformTd>
                </tr>
                {isEmpty(step.explanation.id)(store.getState()) ? null : (
                  <ExplanationTr>
                    <td />
                    {renderDownArrow()}
                    <td colSpan={2}>{step.explanation.render()}</td>
                  </ExplanationTr>
                )}
              </React.Fragment>
            )
          })}
        </tbody>
      </Table>
    </TableWrapper>
  )

  function renderFirstExplanation() {
    if (isEmpty(state.firstExplanation.id)(store.getState())) return

    return (
      <>
        <ExplanationTr>
          <td colSpan={3} style={{ textAlign: 'center' }}>
            {state.firstExplanation.render()}
          </td>
        </ExplanationTr>
        <tr style={{ height: '30px' }}>
          <td />
          {renderDownArrow()}
        </tr>
      </>
    )
  }
}

export function renderDownArrow() {
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
            stroke="#688312"
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
        stroke="#688312"
        stroke-width="2"
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
