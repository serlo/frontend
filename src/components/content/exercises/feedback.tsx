import React from 'react'
import styled from 'styled-components'

export interface FeedbackProps {
  correct: boolean
  children: React.ReactNode
}

export function Feedback({ children, correct }: FeedbackProps) {
  return (
    <FeedbackWrapper correct={correct}>
      <span>⬤</span> {children} {correct && '🎉'}
    </FeedbackWrapper>
  )
}

const FeedbackWrapper = styled.div<{ correct?: boolean }>`
  margin-left: 0;
  margin-bottom: 0;
  > div {
    display: inline-block;
    > p {
      margin-left: 0;
    }
  }
  > span {
    color: ${(props) =>
      props.correct
        ? props.theme.colors.brandGreen
        : props.theme.colors.orange};
  }
`
