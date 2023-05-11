import * as R from 'ramda'
import { useState } from 'react'

import { ScMcExerciseProps } from '.'
import { useScopedSelector, useScopedStore } from '../core'
import {
  AddButton,
  InteractiveAnswer,
  PreviewOverlay,
  styled,
} from '../editor-ui'
import { getFocused, isEmpty as isEmptySelector } from '../store'
import { useScMcExerciseConfig } from './config'
import { ScMcExerciseRenderer } from './renderer'

const TypeMenu = styled.div({
  marginBottom: '0.5em',
})

export function ScMcExerciseEditor(props: ScMcExerciseProps) {
  const config = useScMcExerciseConfig(props.config)
  const store = useScopedStore()
  const focusedElement = useScopedSelector(getFocused())

  const { editable, focused, state } = props
  const children = R.flatten(
    props.state.answers.map((answer) => {
      return [answer.content.id, answer.feedback.id]
    })
  )
  const handleCheckboxChange = (index: number) => () => {
    const { state } = props
    state.answers[index].isCorrect.set((currentVal) => !currentVal)
  }

  const handleRadioButtonChange = (rightanswerIndex: number) => () => {
    const { state } = props
    state.answers.forEach((answer, index) => {
      answer.isCorrect.set(index === rightanswerIndex)
    })
  }

  const handleSCMCChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { state } = props

    state.isSingleChoice.set(event.target.value === 'sc')
    state.isSingleChoice.value &&
      state.answers.forEach((answer) => answer.isCorrect.set(false))
  }

  const addButton = () => {
    const { state } = props

    state.answers.insert()
  }

  const removeAnswer = (index: number) => () => {
    const { state } = props
    state.answers.remove(index)
  }

  const nestedFocus = focused || R.includes(focusedElement, children)
  const [previewActive, setPreviewActive] = useState(false)

  if (!editable) {
    return <ScMcExerciseRenderer {...props} isEmpty={isEmpty} />
  }

  return (
    <>
      <PreviewOverlay
        focused={nestedFocus || false}
        onChange={setPreviewActive}
        editable={previewActive}
      >
        <ScMcExerciseRenderer {...props} isEmpty={isEmpty} />
      </PreviewOverlay>
      {editable && nestedFocus && !previewActive && (
        <>
          <TypeMenu>
            <label>
              {config.i18n.isSingleChoice.label}:{' '}
              <select
                value={state.isSingleChoice.value ? 'sc' : 'mc'}
                onChange={handleSCMCChange}
              >
                <option value="mc">{config.i18n.types.multipleChoice}</option>
                <option value="sc">{config.i18n.types.singleChoice}</option>
              </select>
            </label>
          </TypeMenu>
          {state.answers.map((answer, index) => {
            return (
              <InteractiveAnswer
                i18n={config.i18n}
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
          <AddButton onClick={addButton}>
            {config.i18n.answer.addLabel}
          </AddButton>
        </>
      )}
    </>
  )

  function isEmpty(id: string) {
    return isEmptySelector(id)(store.getState())
  }
}
