import { useEffect, useRef, useState } from 'react'

import type { InputExerciseProps } from '.'
import { InputExerciseRenderer } from './renderer'
import { InputExerciseToolbar } from './toolbar'
import {
  AddButton,
  InteractiveAnswer,
  PreviewOverlaySimple,
} from '../../editor-ui'
import {
  focus,
  selectFocused,
  selectIsDocumentEmpty,
  store,
  useAppDispatch,
} from '../../store'
import { useEditorStrings } from '@/contexts/logged-in-data-context'
import { EditorPluginType } from '@/serlo-editor-integration/types/editor-plugin-type'

export function InputExerciseEditor(props: InputExerciseProps) {
  const { state, id, focused } = props
  const { answers, type, unit } = state
  const inputExStrings = useEditorStrings().templatePlugins.inputExercise

  const dispatch = useAppDispatch()

  const [previewActive, setPreviewActive] = useState(false)
  const newestAnswerRef = useRef<HTMLInputElement>(null)

  function overwriteFocus(force?: boolean) {
    setTimeout(() => {
      if (force) dispatch(focus(id))
      newestAnswerRef.current?.focus()
      // Needs to wait for the editor focus to finish and then overwrite it. It's definitely a hack, but it works so far.
      // 50 is arbitrary value that seems to work nicely (10 was to low for firefox in my testing)
    }, 50)
  }

  // overwrite focus on first render
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => overwriteFocus, [])

  const storeState = store.getState()

  const renderer = (
    <InputExerciseRenderer
      type={type.value}
      unit={unit.value}
      answers={answers.map(({ isCorrect, value, feedback }) => {
        const isEmptyFeedback = selectIsDocumentEmpty(storeState, feedback.id)
        return {
          isCorrect: isCorrect.value,
          value: value.value,
          feedback: isEmptyFeedback ? null : feedback.render(),
        }
      })}
    />
  )

  const isAnyAnswerFocused = answers.some(
    ({ feedback }) => feedback.id === selectFocused(storeState)
  )

  const showUi = focused || isAnyAnswerFocused

  return (
    <div className="mb-12 mt-24 pt-4">
      {showUi ? (
        <InputExerciseToolbar
          {...props}
          previewActive={previewActive}
          setPreviewActive={setPreviewActive}
        />
      ) : null}

      {/* TODO: This will probably cause problems without editable */}
      <PreviewOverlaySimple previewActive={previewActive} fullOpacity={!showUi}>
        {renderer}
      </PreviewOverlaySimple>
      {!previewActive && showUi ? (
        <>
          {answers.map((answer, index: number) => {
            const isLast = index === answers.length - 1
            return (
              <InteractiveAnswer
                key={answer.feedback.id}
                answer={
                  <input
                    ref={isLast ? newestAnswerRef : undefined}
                    className="width-full ml-side border-none outline-none"
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
                remove={() => answers.remove(index)}
              />
            )
          })}
          <AddButton
            onClick={() => {
              const wrongAnswer = {
                value: '',
                isCorrect: false,
                feedback: { plugin: EditorPluginType.Text },
              }
              answers.insert(undefined, wrongAnswer)
              overwriteFocus(true)
            }}
          >
            {inputExStrings.addAnswer}
          </AddButton>
        </>
      ) : null}
    </div>
  )
}
