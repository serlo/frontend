import { useState } from 'react'

import { ScMcExerciseProps } from '.'
import { ScMcExerciseRenderer } from './renderer'
import { ScMcExerciseToolbar } from './toolbar'
import { AddButton, InteractiveAnswer, PreviewOverlay } from '../../editor-ui'
import {
  store,
  selectFocused,
  selectIsDocumentEmpty,
  useAppSelector,
} from '../../store'
import { useEditorStrings } from '@/contexts/logged-in-data-context'
import { EditableContext } from '@/serlo-editor/core/contexts'

export function ScMcExerciseEditor(props: ScMcExerciseProps) {
  const focusedElement = useAppSelector(selectFocused)

  const { editable, domFocusWithin, state } = props
  const editorStrings = useEditorStrings()

  const handleCheckboxChange = (index: number) => () => {
    state.answers[index].isCorrect.set((currentVal) => !currentVal)
  }

  const handleRadioButtonChange = (rightanswerIndex: number) => () => {
    state.answers.forEach((answer, index) => {
      answer.isCorrect.set(index === rightanswerIndex)
    })
  }

  const handleAddButtonClick = () => props.state.answers.insert()
  const removeAnswer = (index: number) => () => state.answers.remove(index)

  const [previewActive, setPreviewActive] = useState(false)

  const renderer = (
    <EditableContext.Provider value={false}>
      {/* //margin-hack */}
      <div className="[&_.ml-4.flex]:mb-block">
        <ScMcExerciseRenderer
          isSingleChoice={state.isSingleChoice.value}
          idBase="sc-mc"
          answers={state.answers
            .slice(0)
            .map(({ isCorrect, feedback, content }, index) => {
              return {
                isCorrect: isCorrect.value,
                originalIndex: index, // let's see
                feedback: isEmpty(feedback.id) ? null : feedback.render(),
                content: isEmpty(content.id) ? null : content.render(),
              }
            })}
        />
      </div>
    </EditableContext.Provider>
  )
  if (!editable) return renderer

  return (
    <div className="mb-12 mt-24 pt-4">
      {domFocusWithin ? <ScMcExerciseToolbar {...props} /> : null}
      <PreviewOverlay
        focused={domFocusWithin || false}
        onChange={setPreviewActive}
        editable={previewActive}
      >
        {renderer}
      </PreviewOverlay>
      {editable && domFocusWithin && !previewActive && (
        <>
          {state.answers.map((answer, index) => {
            return (
              <InteractiveAnswer
                key={answer.content.id}
                answer={answer.content.render()}
                answerID={answer.content.id}
                feedback={answer.feedback.render()}
                feedbackID={answer.feedback.id}
                focusedElement={focusedElement || undefined}
                isRadio={state.isSingleChoice.value}
                isActive={answer.isCorrect.value}
                remove={removeAnswer(index)}
                handleChange={
                  state.isSingleChoice.value
                    ? handleRadioButtonChange(index)
                    : handleCheckboxChange(index)
                }
              />
            )
          })}
          <AddButton onClick={handleAddButtonClick}>
            {editorStrings.templatePlugins.scMcExercise.addAnswer}
          </AddButton>
        </>
      )}
    </div>
  )

  function isEmpty(id: string) {
    return selectIsDocumentEmpty(store.getState(), id)
  }
}
