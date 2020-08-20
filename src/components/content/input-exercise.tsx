import A from 'algebra.js'
import React from 'react'
import styled, { css } from 'styled-components'

import { makeMargin, makeDefaultButton, inputFontReset } from '../../helper/css'
import { StyledP } from '../tags/styled-p'
import { useInstanceData } from '@/contexts/instance-context'
import { EdtrPluginInputExercise } from '@/data-types'

export interface InputExerciseProps {
  data: EdtrPluginInputExercise['state']
}

export function InputExercise({ data }: InputExerciseProps) {
  const [feedback, setFeedback] = React.useState<React.ReactNode>(null)
  const [value, setValue] = React.useState('')
  const { strings } = useInstanceData()

  function keyPress(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.keyCode == 13) {
      setFeedback(checkAnswer())
    }
  }

  return (
    <Wrapper>
      <StyledInput
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={keyPress}
        placeholder={strings.content.yourAnswer}
      />{' '}
      {data.unit}
      <br />
      <Feedback>{feedback}</Feedback>
      <CheckButton
        selectable={value !== ''}
        onClick={() => setFeedback(checkAnswer())}
      >
        {strings.content.check}
      </CheckButton>
    </Wrapper>
  )

  function checkAnswer() {
    const answers = data.answers
    const filteredAnswers = answers.filter((answer) => {
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
    })
    if (filteredAnswers.length !== 1 || !filteredAnswers[0].isCorrect) {
      return <span>{strings.content.wrong}</span>
    } else {
      return <span>{strings.content.right}</span>
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

const Feedback = styled(StyledP)`
  margin-top: 10px;
  margin-bottom: 10px;
`

const CheckButton = styled.a<{ selectable: boolean }>`
  ${makeDefaultButton}
  margin-top: 16px;

  color: #fff;
  background-color: ${(props) => props.theme.colors.brand};

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
