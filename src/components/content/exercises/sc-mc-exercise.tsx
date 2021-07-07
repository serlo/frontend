import { faCircle, faSquare } from '@fortawesome/free-regular-svg-icons'
import { faCheckCircle, faCheckSquare } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import clsx from 'clsx'
import { useState, Fragment } from 'react'
import styled, { css } from 'styled-components'

import { Feedback } from './feedback'
import { useInstanceData } from '@/contexts/instance-context'
import { EdtrPluginScMcExercise } from '@/data-types'
import { makeMargin, makePrimaryButton } from '@/helper/css'
import { submitEventWithPath } from '@/helper/submit-event'
import { NodePath, RenderNestedFunction } from '@/schema/article-renderer'

export interface ScMcExerciseProps {
  state: EdtrPluginScMcExercise['state']
  idBase: string
  renderNested: RenderNestedFunction
  path?: NodePath
  isRevisionView?: boolean
}

export function ScMcExercise({
  state,
  idBase,
  renderNested,
  path,
  isRevisionView,
}: ScMcExerciseProps) {
  const { strings } = useInstanceData()
  const answers = state.answers.slice(0)
  const [selected, setSelected] = useState<number | undefined>(undefined)
  const [showFeedback, setShowFeedback] = useState(false)
  const [focused, setFocused] = useState<number | undefined>(undefined)
  const [selectedArray, setSelectedArray] = useState(answers.map(() => false))

  if (state.isSingleChoice) return renderSingleChoice()

  return renderMultipleChoice()

  function renderSingleChoice() {
    return (
      <Container>
        <Choices>
          {answers.map((answer, i) => {
            const id = `${idBase}${i}`
            return (
              <Fragment key={i}>
                <ChoiceWrapper>
                  <StyledInput
                    id={id}
                    type="radio"
                    checked={selected === i}
                    onChange={() => {
                      setShowFeedback(false)
                      setSelected(i)
                    }}
                    onFocus={() => setFocused(i)}
                    onBlur={() => setFocused(undefined)}
                    onKeyDown={(e) => {
                      if (e.key == 'Enter') setShowFeedback(true)
                    }}
                  />
                  <label
                    className={clsx('serlo-styled-label', {
                      'outline-gray': focused === i,
                    })}
                    htmlFor={id}
                  >
                    <FontAwesomeIcon
                      icon={selected === i ? faCheckCircle : faCircle}
                      className="text-xl mt-0.5 text-brand"
                    />
                    {renderNested(answer.content, `scoption${i}`)}
                  </label>
                </ChoiceWrapper>
                {showFeedback &&
                  selected !== undefined &&
                  answers[selected] &&
                  answers[selected] === answer && (
                    <Feedback correct={answers[selected].isCorrect}>
                      {renderNested(
                        answers[selected].feedback,
                        `scfeedback${selected}`
                      )}
                    </Feedback>
                  )}
                {isRevisionView && renderRevisionExtra(answer)}
              </Fragment>
            )
          })}
        </Choices>
        <CheckButton
          selectable={selected !== undefined}
          onClick={() => {
            setShowFeedback(true)
            submitEventWithPath('checksc', path)
            if (selected !== undefined && path) {
              submitEventWithPath('scoption', [
                ...path,
                answers[selected].originalIndex,
              ])
            }
          }}
          //blur-hack, use https://caniuse.com/#feat=css-focus-visible when supported
          onPointerUp={(e) => e.currentTarget.blur()}
        >
          {selected !== undefined
            ? strings.content.check
            : strings.content.chooseOption}
        </CheckButton>
      </Container>
    )
  }

  function renderMultipleChoice() {
    const correct = answers.every(
      (answer, i) => answer.isCorrect === selectedArray[i]
    )
    return (
      <Container>
        <Choices>
          {answers.map((answer, i) => {
            const id = `${idBase}${i}`

            const hasFeedback =
              answer.feedback[0]?.children &&
              answer.feedback[0].children.length > 0

            return (
              <Fragment key={i}>
                <ChoiceWrapper>
                  <StyledInput
                    id={id}
                    type="checkbox"
                    checked={selectedArray[i]}
                    onChange={() => {
                      setShowFeedback(false)
                      const newArr = selectedArray.slice(0)
                      newArr[i] = !newArr[i]
                      setSelectedArray(newArr)
                    }}
                    onFocus={() => setFocused(i)}
                    onBlur={() => setFocused(undefined)}
                  />
                  <label
                    className={clsx('serlo-styled-label', {
                      'outline-gray': focused === i,
                    })}
                    htmlFor={id}
                  >
                    <FontAwesomeIcon
                      icon={selectedArray[i] ? faCheckSquare : faSquare}
                      className="text-xl mt-0.5 text-brand"
                    />
                    {renderNested(answer.content, `mcoption${i}`)}
                  </label>
                </ChoiceWrapper>
                {showFeedback &&
                  selectedArray[i] &&
                  hasFeedback &&
                  renderNested(answer.feedback, `mcfeedback${i}`)}
                {isRevisionView && hasFeedback && renderRevisionExtra(answer)}
              </Fragment>
            )
          })}
        </Choices>
        {showFeedback && (
          <Feedback correct={correct}>
            {correct ? strings.content.right : strings.content.wrong}
          </Feedback>
        )}
        <CheckButton
          selectable
          onClick={() => {
            setShowFeedback(true)
            submitEventWithPath('checkmc', path)
            if (path) {
              for (let i = 0; i < selectedArray.length; i++) {
                if (selectedArray[i]) {
                  submitEventWithPath('mcoption', [
                    ...path,
                    answers[i].originalIndex,
                  ])
                }
              }
              if (correct) {
                submitEventWithPath('mccorrect', path)
              }
            }
          }}
          onPointerUp={(e) => e.currentTarget.blur()}
        >
          {strings.content.check}
        </CheckButton>
      </Container>
    )
  }

  function renderRevisionExtra(
    answer: EdtrPluginScMcExercise['state']['answers'][0]
  ) {
    return (
      <RevisionExtraInfo className="bg-yellow-200 rounded-xl py-2 mb-4">
        {answer.isCorrect && (
          <span className="font-bold text-sm mx-side">
            [{strings.content.right}]
          </span>
        )}
        {renderNested(answer.feedback, `mcfeedbackrevision`)}
      </RevisionExtraInfo>
    )
  }
}

const CheckButton = styled.button<{ selectable: boolean }>`
  ${makePrimaryButton}
  margin-top: 16px;

  ${(props) =>
    !props.selectable &&
    css`
      opacity: 1;
      background-color: transparent;
      color: ${(props) => props.theme.colors.gray};
      pointer-events: none;
    `}
`

const Choices = styled.ul`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  padding: 0;
  margin: 0;
  list-style-type: none;
  overflow: auto;
`

const ChoiceWrapper = styled.li`
  display: flex;
  margin-bottom: 15px;
`

const StyledInput = styled.input`
  &[type='radio'],
  &[type='checkbox'] {
    width: 1px;
    margin: 0;
    padding: 0;
    opacity: 0 !important;
  }
`

const Container = styled.div`
  ${makeMargin}
  margin-bottom: ${(props) => props.theme.spacing.mb.block};

  &:hover {
  }
`

// Only for review view: hack to display feedback more compactly
export const RevisionExtraInfo = styled.div`
  .serlo-p:last-child {
    margin-bottom: 0;
  }

  > .serlo-p {
    font-size: 1rem !important;
  }
`
