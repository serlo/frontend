import { useState } from 'react'

import { InputExerciseProps, InputExerciseType } from '.'
import { InputExerciseRenderer } from './renderer'
import { AddButton, InteractiveAnswer, PreviewOverlay } from '../../editor-ui'
import { selectFocused, useAppSelector } from '../../store'
import { useEditorStrings } from '@/contexts/logged-in-data-context'
import { OverlayInput } from '@/serlo-editor/plugin/plugin-toolbar'

export function InputExerciseEditor(props: InputExerciseProps) {
  const { editable, state, focused } = props
  const inputExStrings = useEditorStrings().templatePlugins.inputExercise

  const focusedElement = useAppSelector(selectFocused)
  const nestedFocus =
    focused ||
    !!props.state.answers.find(({ feedback }) => feedback.id === focusedElement)

  const [previewActive, setPreviewActive] = useState(false)

  const renderer = (
    <InputExerciseRenderer
      type={state.type.value}
      unit={state.unit.value}
      answers={state.answers.map(({ isCorrect, value, feedback }) => {
        return {
          isCorrect: isCorrect.value,
          value: value.value,
          feedback: feedback.render(),
        }
      })}
    />
  )

  if (!editable) return renderer

  return (
    <>
      <PreviewOverlay focused={nestedFocus} onChange={setPreviewActive}>
        {renderer}
      </PreviewOverlay>
      {nestedFocus && !previewActive && (
        <>
          <div className="mb-2">
            <label>
              {inputExStrings.chooseType}:{' '}
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
          </div>
          {state.answers.map((answer, index: number) => {
            return (
              <InteractiveAnswer
                key={answer.feedback.id}
                answer={
                  <input
                    className="width-full border-none outline-none"
                    value={answer.value.value}
                    placeholder={inputExStrings.enterTheValue}
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
            {inputExStrings.addAnswer}
          </AddButton>
        </>
      )}
      {props.renderIntoSettings(
        <OverlayInput
          label={inputExStrings.unit}
          value={state.unit.value}
          onChange={({ target }) => state.unit.set(target.value)}
        />
      )}
    </>
  )

  function getType(type: InputExerciseType) {
    return inputExStrings.types[
      type === InputExerciseType.InputNumberExactMatchChallenge
        ? 'mathExpression'
        : InputExerciseType.InputNumberExactMatchChallenge
        ? 'number'
        : 'text'
    ]
  }
}
