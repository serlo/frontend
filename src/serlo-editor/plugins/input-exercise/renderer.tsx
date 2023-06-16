import A from 'algebra.js'
import { useState, createRef } from 'react'

import { InputExerciseProps, InputExerciseType } from '.'
import { styled } from '../../editor-ui'
import { Feedback, SubmitButton } from '../../renderer-ui'
import { store, selectIsDocumentEmpty } from '../../store'
import { useInstanceData } from '@/contexts/instance-context'
import { useEditorStrings } from '@/contexts/logged-in-data-context'
import { legacyEditorTheme } from '@/helper/colors'

enum ExerciseState {
  Default = 1,
  SolvedRight,
  SolvedWrong,
}

const InputContainer = styled.div({
  float: 'right',
  display: 'flex',
  flexDirection: 'row',
})

const InputExerciseField = styled.input({
  border: 'none',
  borderBottom: `3px solid ${legacyEditorTheme.primary.background}`,
  textAlign: 'center',
  outline: 'none',
  marginBottom: '10px',
})

export function InputExerciseRenderer(props: InputExerciseProps) {
  const { state } = props
  const [feedbackIndex, setFeedbackIndex] = useState<number>(-1)
  const [feedbackVisible, setFeedbackVisible] = useState<boolean>()
  const [exerciseState, setExerciseState] = useState<ExerciseState>(
    ExerciseState.Default
  )
  const editorStrings = useEditorStrings()
  const { strings } = useInstanceData()

  const input = createRef<HTMLInputElement>()
  const handleWrongAnswer = () => {
    setTimeout(() => {
      setExerciseState(ExerciseState.Default)
    }, 2000)
    setExerciseState(ExerciseState.SolvedWrong)
  }

  function checkAnswer(event: React.FormEvent) {
    if (!input.current) {
      return
    }
    event.preventDefault()
    setFeedbackIndex(-1)
    setFeedbackVisible(true)
    setExerciseState(ExerciseState.Default)
    if (input.current.value === '') {
      setFeedbackVisible(false)
      return
    }
    const { state } = props

    let containedAnswer = false
    state.answers.forEach((answer, index) => {
      if (
        input.current &&
        matchesInput(
          {
            type: state.type.value as InputExerciseType,
            value: answer.value.value,
          },
          input.current.value
        )
      ) {
        setFeedbackIndex(index)
        if (answer.isCorrect.value) {
          setExerciseState(ExerciseState.SolvedRight)
        } else {
          handleWrongAnswer()
        }
        containedAnswer = true
      }
    })

    if (!containedAnswer) {
      handleWrongAnswer()
    }
  }

  return (
    <div>
      <form onSubmit={checkAnswer}>
        <InputContainer>
          <InputExerciseField
            onKeyDown={(k: React.KeyboardEvent<HTMLInputElement>) => {
              const { key } = k as unknown as KeyboardEvent
              if ((key === 'Enter' || key === 'Backspace') && props.editable) {
                k.stopPropagation()
              }
            }}
            data-type={state.type.value}
            type="text"
            placeholder={editorStrings.inputExercise.yourSolution}
            ref={input}
          />
          {state.unit.value}
        </InputContainer>
        <div className="clear-both" />

        {feedbackVisible ? (
          feedbackIndex > -1 ? (
            <Feedback
              boxFree
              isTrueAnswer={state.answers[feedbackIndex].isCorrect.value}
            >
              {selectIsDocumentEmpty(
                store.getState(),
                state.answers[feedbackIndex].feedback.id
              )
                ? state.answers[feedbackIndex].isCorrect.value
                  ? strings.content.exercises.correct
                  : strings.content.exercises.wrong
                : state.answers[feedbackIndex].feedback.render()}
            </Feedback>
          ) : (
            <Feedback boxFree>{strings.content.exercises.wrong}</Feedback>
          )
        ) : null}
        <div>
          <SubmitButton exerciseState={exerciseState} />
          <div className="clear-both" />
        </div>
      </form>
    </div>
  )
}

function normalize(type: InputExerciseType, text: string) {
  const temp = collapseWhitespace(text)

  switch (type) {
    case InputExerciseType.InputNumberExactMatchChallenge:
      return normalizeNumber(temp).replace(/\s/g, '')
    case InputExerciseType.InputExpressionEqualMatchChallenge:
      return A.parse(normalizeNumber(temp))
    case InputExerciseType.InputStringNormalizedMatchChallenge:
      return temp.toUpperCase()
  }
}

function matchesInput(
  field: { type: InputExerciseType; value: string },
  input: string
) {
  try {
    const solution = normalize(field.type, field.value)
    const submission = normalize(field.type, input)

    switch (field.type) {
      case InputExerciseType.InputExpressionEqualMatchChallenge:
        return (
          (solution as A.Expression)
            .subtract(submission as A.Expression)
            .toString() === '0'
        )
      case InputExerciseType.InputNumberExactMatchChallenge:
      case InputExerciseType.InputStringNormalizedMatchChallenge:
        return solution === submission
    }
  } catch (err) {
    // e.g. if user input could not be parsed
    return false
  }
}

function normalizeNumber(numberText: string) {
  return numberText.replace(/,/g, '.').replace(/^[+]/, '')
}

function collapseWhitespace(text: string) {
  return text.replace(/[\s\xa0]+/g, ' ').trim()
}
