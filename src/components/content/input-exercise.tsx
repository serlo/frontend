import React from 'react'
import styled, { css } from 'styled-components'

import { makeMargin, makeDefaultButton, inputFontReset } from '../../helper/css'
import { StyledP } from '../tags/styled-p'
import { useInstanceData } from '@/contexts/instance-context'
import { EdtrPluginInputExercise } from '@/data-types'

interface AnswerData {
  value: any
  isCorrect: boolean
}

export interface InputExerciseProps {
  data: EdtrPluginInputExercise['state']
}

export function InputExercise({ data }: InputExerciseProps) {
  const [feedback, setFeedback] = React.useState<React.ReactNode>(null)
  const [value, setValue] = React.useState('')
  const { strings } = useInstanceData()

  function keyPress(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.keyCode == 13) {
      setFeedback(checkAnswer(value, data.answers))
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
        onClick={() => setFeedback(checkAnswer(value, data.answers))}
      >
        {strings.content.check}
      </CheckButton>
    </Wrapper>
  )

  function checkAnswer(val: string, answers: AnswerData[]) {
    const filteredAnswers = answers.filter((answer) => answer.value === val)
    if (filteredAnswers.length !== 1 || !filteredAnswers[0].isCorrect) {
      return <span>{strings.content.wrong}</span>
    } else {
      return <span>{strings.content.right}</span>
    }
  }
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
