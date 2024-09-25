import { EditorScMcExerciseDocument } from '@editor/types/editor-plugins'
import { useEditorStrings } from '@serlo/frontend/src/contexts/logged-in-data-context'

import type { ScMcExerciseProps } from '.'
import { ScMcExerciseStaticRenderer } from './static'
import { ScMcExerciseToolbar } from './toolbar'
import {
  AddButton,
  InteractiveAnswer,
  PreviewOverlaySimple,
} from '../../editor-ui'
import {
  store,
  selectFocused,
  selectStaticDocument,
  useAppSelector,
} from '../../store'
import { useIsPreviewActive } from '../exercise/context/preview-context'

export function ScMcExerciseEditor(props: ScMcExerciseProps) {
  const { state, id, focused } = props
  const { answers, isSingleChoice } = state

  const staticDocument = useAppSelector(
    (storeState) =>
      selectStaticDocument(storeState, id) as EditorScMcExerciseDocument
  )

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

  const previewActive = useIsPreviewActive()

  const isAnyAnswerFocused = answers.some(({ content, feedback }) => {
    const focusedId = selectFocused(store.getState())
    return focusedId === content.id || focusedId === feedback.id
  })

  const showUi = focused || isAnyAnswerFocused

  // cleanup answers states:
  // make sure we have at least one answer
  if (answers.length === 0) answers.insert()

  if (isSingleChoice.value && answers.length > 0) {
    const correctAnswers = state.answers.filter(
      (answer) => answer.isCorrect.value === true
    )
    // make sure for single choice at least one answer is correct
    if (correctAnswers.length === 0) answers[0].isCorrect.set(true)

    // make sure for single choice we never have multiple correct answers
    if (correctAnswers.length > 1) {
      correctAnswers.forEach((answer) => answer.isCorrect.set(false))
      correctAnswers[0].isCorrect.set(true)
    }
  }

  return (
    <div className="mb-12">
      <ScMcExerciseToolbar {...props} />
      <PreviewOverlaySimple previewActive={previewActive} fullOpacity={!showUi}>
        {/* margin-hack */}
        <div className="[&_.ml-4.flex]:mb-block">
          <ScMcExerciseStaticRenderer {...staticDocument} noShuffle />
        </div>
      </PreviewOverlaySimple>

      {!previewActive && showUi ? (
        <div className="[&_.plugin-toolbar]:left-side [&_.plugin-toolbar]:top-[-60px]">
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
        </div>
      ) : null}
    </div>
  )
}
