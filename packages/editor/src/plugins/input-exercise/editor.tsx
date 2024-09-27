import { EditorPluginType } from '@editor/types/editor-plugin-type'
import { EditorInputExerciseDocument } from '@editor/types/editor-plugins'
import { useEditorStrings } from '@serlo/frontend/src/contexts/logged-in-data-context'
import { useEffect, useRef } from 'react'

import type { InputExerciseProps } from '.'
import { InputExerciseStaticRenderer } from './static'
import { InputExerciseToolbar } from './toolbar'
import {
  AddButton,
  InteractiveAnswer,
  PreviewOverlaySimple,
} from '../../editor-ui'
import {
  focus,
  selectFocused,
  selectStaticDocument,
  store,
  useAppDispatch,
  useAppSelector,
} from '../../store'
import { useIsPreviewActive } from '../exercise/context/preview-context'

export function InputExerciseEditor(props: InputExerciseProps) {
  const { state, id, focused } = props
  const { answers } = state
  const inputExStrings = useEditorStrings().templatePlugins.inputExercise

  const dispatch = useAppDispatch()

  const newestAnswerRef = useRef<HTMLInputElement>(null)
  const previewActive = useIsPreviewActive()

  const staticDocument = useAppSelector(
    (storeState) =>
      selectStaticDocument(storeState, id) as EditorInputExerciseDocument
  )

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

  const isAnyAnswerFocused = answers.some(
    ({ feedback }) => feedback.id === selectFocused(store.getState())
  )

  const showUi = focused || isAnyAnswerFocused

  return (
    <div className="mb-12">
      <InputExerciseToolbar {...props} />

      <PreviewOverlaySimple previewActive={previewActive} fullOpacity={!showUi}>
        <InputExerciseStaticRenderer {...staticDocument} />
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
                feedback={answer.feedback.render({
                  config: {
                    placeholder: inputExStrings.feedbackPlaceholder,
                  },
                })}
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
