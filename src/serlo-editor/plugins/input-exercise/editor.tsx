import * as R from 'ramda'
import { useState } from 'react'

import { InputExerciseProps, InputExerciseType } from '.'
import { OverlayInput } from '../../core'
import {
  AddButton,
  InteractiveAnswer,
  PreviewOverlay,
  styled,
} from '../../editor-ui'
import { selectFocused, useAppSelector } from '../../store'
import { InputExerciseRenderer } from './renderer'
import { useLoggedInData } from '@/contexts/logged-in-data-context'

const AnswerTextfield = styled.input({
  border: 'none',
  outline: 'none',
  width: '100%',
})

const TypeMenu = styled.div({
  marginBottom: '0.5em',
})

export function InputExerciseEditor(props: InputExerciseProps) {
  const { editable, state, focused } = props
  const editorStrings = useLoggedInData()!.strings.editor

  const focusedElement = useAppSelector(selectFocused)
  const nestedFocus =
    focused ||
    R.includes(
      focusedElement,
      props.state.answers.map((answer) => answer.feedback.id)
    )
  const [previewActive, setPreviewActive] = useState(false)

  if (!editable) return <InputExerciseRenderer {...props} />

  return (
    <>
      <PreviewOverlay focused={nestedFocus} onChange={setPreviewActive}>
        <InputExerciseRenderer {...props} />
      </PreviewOverlay>
      {nestedFocus && !previewActive && (
        <>
          <TypeMenu>
            <label>
              {editorStrings.inputExercise.chooseType}:{' '}
              <select
                value={state.type.value}
                onChange={(event) => state.type.set(event.target.value)}
              >
                {Object.values(InputExerciseType).map((exerciseType) => (
                  <option key={exerciseType} value={exerciseType}>
                    {getType(exerciseType)}
                  </option>
                ))}
              </select>
            </label>
          </TypeMenu>
          {state.answers.map((answer, index: number) => {
            return (
              <InteractiveAnswer
                key={answer.feedback.id}
                answer={
                  <AnswerTextfield
                    value={answer.value.value}
                    placeholder={editorStrings.inputExercise.enterTheValue}
                    type="text"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      answer.value.set(e.target.value)
                    }}
                  />
                }
                feedback={answer.feedback.render()}
                feedbackID={answer.feedback.id}
                isActive={answer.isCorrect.value}
                handleChange={() =>
                  answer.isCorrect.set(!answer.isCorrect.value)
                }
                remove={() => state.answers.remove(index)}
                focusedElement={focusedElement || undefined}
              />
            )
          })}
          <AddButton onClick={() => state.answers.insert()}>
            {editorStrings.inputExercise.addAnswer}
          </AddButton>
        </>
      )}
      {props.renderIntoSettings(
        <OverlayInput
          label={editorStrings.inputExercise.unit}
          value={state.unit.value}
          onChange={(e) => state.unit.set(e.target.value)}
        />
      )}
    </>
  )

  function getType(type: InputExerciseType) {
    return editorStrings.inputExercise.types[
      type === InputExerciseType.InputNumberExactMatchChallenge
        ? 'mathExpression'
        : InputExerciseType.InputNumberExactMatchChallenge
        ? 'number'
        : 'text'
    ]
  }
}
