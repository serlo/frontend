import A from 'algebra.js'
import React from 'react'
import styled, { css } from 'styled-components'

import { Feedback } from './feedback'
import { useInstanceData } from '@/contexts/instance-context'
import { EdtrPluginInputExercise } from '@/data-types'
import { makeMargin, makePrimaryButton, inputFontReset } from '@/helper/css'

export interface InputExerciseProps {
  data: EdtrPluginInputExercise['state']
}

interface FeedbackData {
  correct: boolean
  message: string
}

export function InputExercise({ data }: InputExerciseProps) {
  const [feedback, setFeedback] = React.useState<FeedbackData | null>(null)
  const [value, setValue] = React.useState('')
  const { strings } = useInstanceData()

  function evaluate() {
    setFeedback(checkAnswer())
  }

  return (
    <Wrapper>
      <StyledInput
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={(e) => {
          if (e.key == 'Enter') evaluate()
        }}
        placeholder={strings.content.yourAnswer}
      />{' '}
      {data.unit}
      <br />
      {feedback && (
        <Feedback correct={feedback.correct}>{feedback.message}</Feedback>
      )}
      <CheckButton selectable={value !== ''} onClick={evaluate}>
        {strings.content.check}
      </CheckButton>
    </Wrapper>
  )

  function checkAnswer() {
    const answers = data.answers
    const filteredAnswers = answers.filter((answer) => {
      try {
        const solution = normalize(answer.value)
        const submission = normalize(value)

        if (data.type === 'input-expression-equal-match-challenge') {
          return (
            (solution as A.Expression)
              .subtract(submission as A.Expression)
              .toString() === '0'
          )
        }
        return solution === submission
      } catch (e) {
        return false
      }
    })
    if (filteredAnswers.length !== 1 || !filteredAnswers[0].isCorrect) {
      return { correct: false, message: strings.content.wrong }
    } else {
      return { correct: true, message: strings.content.right }
    }
  }

  function normalize(value: string) {
    const _value = collapseWhitespace(value)
    switch (data.type) {
      case 'input-number-exact-match-challenge':
        return normalizeNumber(_value).replace(/( )?\/( )?/g, '/')
      case 'input-expression-equal-match-challenge':
        return A.parse(normalizeNumber(_value))
      case 'input-string-normalized-match-challenge':
        return _value.toUpperCase()
    }
  }
}

function collapseWhitespace(val: string): string {
  return val.replace(/\s+/g, ' ')
}

function normalizeNumber(val: string) {
  return val.replace(/,/g, '.')
}

const Wrapper = styled.div`
  ${makeMargin}
  margin-bottom: 30px;
`

const CheckButton = styled.a<{ selectable: boolean }>`
  ${makePrimaryButton}
  margin-top: 16px;

  ${(props) =>
    !props.selectable &&
    css`
      opacity: 0;
      pointer-events: none;
    `}
`

const StyledInput = styled.input`
  ${inputFontReset}
  border-radius: 2em;
  padding: 9px 12px;
  font-weight: bold;
  color: #fff;
  border: 3px solid ${(props) => props.theme.colors.brand};
  background-color: ${(props) => props.theme.colors.brand};
  margin-bottom: 20px;

  &:focus {
    outline: none;
    background-color: #fff;
    color: ${(props) => props.theme.colors.brand};
    border: 3px solid ${(props) => props.theme.colors.brand};
    opacity: 1 !important;
    &::placeholder {
      opacity: 0;
    }
  }

  &::placeholder {
    color: #fff;
    font-weight: 400;
  }
`
