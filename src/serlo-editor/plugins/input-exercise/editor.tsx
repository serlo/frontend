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
import { useInputExerciseConfig } from './config'
import { InputExerciseRenderer } from './renderer'

const AnswerTextfield = styled.input({
  border: 'none',
  outline: 'none',
  width: '100%',
})

const TypeMenu = styled.div({
  marginBottom: '0.5em',
})

export function InputExerciseEditor(props: InputExerciseProps) {
  const { editable, state, focused, config } = props
  const { i18n } = useInputExerciseConfig(config)
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
              {i18n.type.label}:{' '}
              <select
                value={state.type.value}
                onChange={(event) => state.type.set(event.target.value)}
              >
                {Object.values(InputExerciseType).map((exerciseType) => (
                  <option key={exerciseType} value={exerciseType}>
                    {i18n.types[exerciseType]}
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
                    placeholder={i18n.answer.value.placeholder}
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
            {i18n.answer.addLabel}
          </AddButton>
        </>
      )}
      {props.renderIntoSettings(
        <OverlayInput
          label={i18n.unit.label}
          value={state.unit.value}
          onChange={(e) => state.unit.set(e.target.value)}
        />
      )}
    </>
  )
}
