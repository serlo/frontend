import { useState } from 'react'

import type { ScMcExerciseProps } from '.'
import { ScMcExerciseRenderer } from './renderer/renderer'
import { ScMcExerciseToolbar } from './toolbar'
import {
  AddButton,
  InteractiveAnswer,
  PreviewOverlaySimple,
} from '../../editor-ui'
import { store, selectIsDocumentEmpty, selectFocused } from '../../store'
import { useEditorStrings } from '@/contexts/logged-in-data-context'
import { EditableContext } from '@/serlo-editor/core/contexts'

export function ScMcExerciseEditor(props: ScMcExerciseProps) {
  const { editable, state, id, focused } = props
  const { answers, isSingleChoice } = state

  const editorStrings = useEditorStrings()

  const handleCheckboxChange = (index: number) => () => {
    answers[index].isCorrect.set((currentVal) => !currentVal)
  }

  const handleRadioButtonChange = (rightanswerIndex: number) => () => {
    answers.forEach((answer, index) => {
      answer.isCorrect.set(index === rightanswerIndex)
    })
  }

  const handleAddButtonClick = () => answers.insert()
  const removeAnswer = (index: number) => () => answers.remove(index)

  const [previewActive, setPreviewActive] = useState(false)

  const isAnyAnswerFocused = answers.some(({ content, feedback }) => {
    const focusedId = selectFocused(store.getState())
    return focusedId === content.id || focusedId === feedback.id
  })

  const showUi = focused || isAnyAnswerFocused

  const renderer = (
    <EditableContext.Provider value={false}>
      {/* margin-hack */}
      <div className="[&_.ml-4.flex]:mb-block">
        <ScMcExerciseRenderer
          isSingleChoice={isSingleChoice.value}
          idBase={`sc-mc-${id}`}
          answers={answers.slice(0).map(({ isCorrect, feedback, content }) => {
            return {
              isCorrect: isCorrect.value,
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
      {showUi ? (
        <ScMcExerciseToolbar
          {...props}
          previewActive={previewActive}
          setPreviewActive={setPreviewActive}
        />
      ) : null}
      <PreviewOverlaySimple previewActive={previewActive} fullOpacity={!showUi}>
        {renderer}
      </PreviewOverlaySimple>

      {editable && !previewActive && showUi ? (
        <>
          {answers.map((answer, index) => {
            return (
              <InteractiveAnswer
                key={answer.content.id}
                answer={answer.content.render()}
                answerID={answer.content.id}
                feedback={answer.feedback.render()}
                feedbackID={answer.feedback.id}
                isRadio={isSingleChoice.value}
                isActive={answer.isCorrect.value}
                remove={removeAnswer(index)}
                handleChange={
                  isSingleChoice.value
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
      ) : null}
    </div>
  )

  function isEmpty(id: string) {
    return selectIsDocumentEmpty(store.getState(), id)
  }
}
