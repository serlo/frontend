import StyledP from '../tags/StyledP'
import React from 'react'

export default function InputExercise({ state }) {
  const [feedback, setFeedback] = React.useState(null)
  const [value, setValue] = React.useState('')
  return (
    <StyledP>
      <input
        type="text"
        value={value}
        onChange={e => setValue(e.target.value)}
      />{' '}
      {state.unit}
      <br />
      {feedback}
      <br />
      <button onClick={() => setFeedback(checkAnswer(value, state))}>
        Stimmt&apos;s?
      </button>
    </StyledP>
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
