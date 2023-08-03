import { useState } from 'react'

import { InputExerciseProps } from '.'
import { InputExerciseRenderer } from './renderer'
import { InputExerciseToolbar } from './toolbar'
import { AddButton, InteractiveAnswer, PreviewOverlay } from '../../editor-ui'
import { selectIsDocumentEmpty, store } from '../../store'
import { useEditorStrings } from '@/contexts/logged-in-data-context'

export function InputExerciseEditor(props: InputExerciseProps) {
  const { editable, state, domFocusWithin } = props
  const inputExStrings = useEditorStrings().templatePlugins.inputExercise

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
    <div className="mb-12 mt-24 pt-4">
      {domFocusWithin ? (
        <InputExerciseToolbar
          {...props}
          previewActive={previewActive}
          setPreviewActive={setPreviewActive}
        />
      ) : null}
      <PreviewOverlay showOverlay={previewActive || !domFocusWithin}>
        {renderer}
      </PreviewOverlay>
      {domFocusWithin && !previewActive && (
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
