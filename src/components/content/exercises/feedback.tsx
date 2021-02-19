import * as React from 'react'
import styled from 'styled-components'

export interface FeedbackProps {
  correct: boolean
  children: React.ReactNode
}

export function Feedback({ children, correct }: FeedbackProps) {
  return (
    <FeedbackWrapper correct={correct}>
      <span>⬤</span> <div>{children}</div>
      {correct && '🎉'}
    </FeedbackWrapper>
  )
}

const FeedbackWrapper = styled.div<{ correct?: boolean }>`
  margin-left: 0;
  margin-bottom: 0;
  display: flex;
  > span {
    margin: 0 0 0 3px;
    color: ${(props) =>
      props.correct ? props.theme.colors.brandGreen : '#cc1500'};
  }
`
