import StyledP from '../tags/StyledP'
import styled, { css } from 'styled-components'
import {
  makeMargin,
  makeDefaultButton,
  inputFontReset
} from '../../helper/csshelper'
import React from 'react'

export default function InputExercise({ state }) {
  const [feedback, setFeedback] = React.useState(null)
  const [value, setValue] = React.useState('')

  function keyPress(e) {
    if (e.keyCode == 13) {
      setFeedback(checkAnswer(value, state))
    }
  }

  return (
    <Wrapper>
      <StyledInput
        type="text"
        value={value}
        onChange={e => setValue(e.target.value)}
        onKeyDown={keyPress}
        placeholder={'Deine Antwort…'}
      />{' '}
      {state.unit}
      <br />
      <Feedback>{feedback}</Feedback>
      <CheckButton
        selectable={value !== ''}
        onClick={() => setFeedback(checkAnswer(value, state))}
      >
        Stimmt&apos;s?
      </CheckButton>
    </Wrapper>
  )
}

function checkAnswer(val, state) {
  const answers = state.answers.filter(answer => answer.value === val)
  if (answers.length !== 1 || !answers[0].isCorrect) {
    return <span>Falsch</span>
  } else {
    return <span>Richtig</span>
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
  background-color: ${props => props.theme.colors.brand};

  ${props =>
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
  border: 3px solid ${props => props.theme.colors.brand};
  background-color: ${props => props.theme.colors.brand};

  &:focus {
    outline: none;
    background-color: #fff;
    color: ${props => props.theme.colors.brand};
    border: 3px solid ${props => props.theme.colors.brand};
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
