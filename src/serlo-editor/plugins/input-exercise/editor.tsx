import { useState } from 'react'

import { InputExerciseProps } from '.'
import { InputExerciseRenderer } from './renderer'
import { InputExerciseToolbar } from './toolbar'
import { AddButton, InteractiveAnswer, PreviewOverlay } from '../../editor-ui'
import {
  selectFocused,
  selectIsDocumentEmpty,
  store,
  useAppSelector,
} from '../../store'
import { useEditorStrings } from '@/contexts/logged-in-data-context'

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
        const isEmptyFeedback = selectIsDocumentEmpty(
          store.getState(),
          feedback.id
        )
        return {
          isCorrect: isCorrect.value,
          value: value.value,
          feedback: isEmptyFeedback ? null : feedback.render(),
        }
      })}
    />
  )

  if (!editable) return renderer

  return (
    <div className="mt-24 pt-4">
      {nestedFocus ? <InputExerciseToolbar {...props} /> : null}
      <PreviewOverlay focused={nestedFocus} onChange={setPreviewActive}>
        {renderer}
      </PreviewOverlay>
      {nestedFocus && !previewActive && (
        <>
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
    </div>
  )
}
