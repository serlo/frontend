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
import type { NodePath, RenderNestedFunction } from '@/schema/article-renderer'

export interface ScMcExerciseProps {
  state: EdtrPluginScMcExercise['state']
  idBase: string
  renderNested: RenderNestedFunction
  path?: NodePath
}

interface SingleChoiceProps {
  answers: EdtrPluginScMcExercise['state']['answers']
  idBase: string
  renderNested: RenderNestedFunction
  path?: NodePath
}

export function ScMcExercise({
  state,
  idBase,
  renderNested,
  path,
}: ScMcExerciseProps) {
  const answers = state.answers.slice(0)

  if (state.isSingleChoice)
    return (
      <SingleChoice
        answers={answers}
        idBase={idBase}
        renderNested={renderNested}
        path={path}
      />
    )

  return (
    <MultipleChoice
      answers={answers}
      idBase={idBase}
      renderNested={renderNested}
      path={path}
    />
  )
}

function SingleChoice({
  answers,
  idBase,
  renderNested,
  path,
}: SingleChoiceProps) {
  const [selected, setSelected] = useState<number | undefined>(undefined)
  const [focused, setFocused] = useState<number | undefined>(undefined)
  const [showFeedback, setShowFeedback] = useState(false)
  const { strings } = useInstanceData()

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

function MultipleChoice({
  answers,
  idBase,
  renderNested,
  path,
}: SingleChoiceProps) {
  const [selected, setSelected] = useState(answers.map(() => false))
  const [focused, setFocused] = useState<number | undefined>(undefined)
  const [showFeedback, setShowFeedback] = useState(false)
  const { strings } = useInstanceData()
  const correct = answers.every((answer, i) => answer.isCorrect === selected[i])
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
                  checked={selected[i]}
                  onChange={() => {
                    setShowFeedback(false)
                    const newArr = selected.slice(0)
                    newArr[i] = !newArr[i]
                    setSelected(newArr)
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
                    icon={selected[i] ? faCheckSquare : faSquare}
                  />
                  {renderNested(answer.content, `mcoption${i}`)}
                </label>
              </ChoiceWrapper>
              {showFeedback &&
                selected[i] &&
                hasFeedback &&
                renderNested(answer.feedback, `mcfeedback${i}`)}
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
            for (let i = 0; i < selected.length; i++) {
              if (selected[i]) {
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
