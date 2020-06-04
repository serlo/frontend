import styled from 'styled-components'

import { makeMargin } from '../../helper/css'
import { renderArticle } from '../../schema/article-renderer'

type SignType =
  | 'equals'
  | '='
  | 'greater-than'
  | 'greater-than-or-equal'
  | 'less-than'
  | 'less-than-or-equal'
  | 'almost-equal-to'

//TODO: define and export data types somewhere
interface StepProps {
  left: any
  sign: SignType
  right: any
  transform: any
}

export interface EquationProps {
  steps: StepProps[]
}

export function Equations({ steps }: EquationProps) {
  return (
    <Wrapper>
      {steps.map((step, i) => (
        <LayoutContainer key={i}>
          <LeftSide>{renderArticle(step.left, false)}</LeftSide>
          <RightSide>
            {renderSignToString(step.sign)}
            {renderArticle(step.right, false)}
          </RightSide>
          <Transformation>
            {renderArticle(step.transform, false)}
          </Transformation>
        </LayoutContainer>
      ))}
    </Wrapper>
  )
}

const Wrapper = styled.div`
  margin-bottom: ${(props) => props.theme.spacing.mb.block};
  ${makeMargin}
`

export const LayoutContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: flex-start;
`

export const LeftSide = styled.div`
  width: 33%;
  @media (max-width: 480px) {
    width: 100%;
    text-align: left;
  }
  @media (max-width: 768px) {
    width: 50%;
    text-align: right;
  }
  @media (min-width: 768px) {
    text-align: right;
  }
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

export const Transformation = styled.div`
  width: 33%;
  @media (max-width: 768px) {
    width: 100%;
    text-align: center;
  }
`

export function renderSignToString(sign: SignType): string {
  switch (sign) {
    case 'equals':
      return '='
    case 'greater-than':
      return '>'
    case 'greater-than-or-equal':
      return '≥'
    case 'less-than':
      return '<'
    case 'less-than-or-equal':
      return '≤'
    case 'almost-equal-to':
      return '≈'
  }
  return ''
}
