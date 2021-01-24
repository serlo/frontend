import { faCircle, faSquare } from '@fortawesome/free-regular-svg-icons'
import { faCheckCircle, faCheckSquare } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import styled, { css } from 'styled-components'

import { Feedback } from './feedback'
import { useInstanceData } from '@/contexts/instance-context'
import { EdtrPluginScMcExercise } from '@/data-types'
import { makeMargin, makePrimaryButton } from '@/helper/css'
import { renderArticle } from '@/schema/article-renderer'

export interface ScMcExerciseProps {
  state: EdtrPluginScMcExercise['state']
  idBase: string
}

interface SingleChoiceProps {
  answers: EdtrPluginScMcExercise['state']['answers']
  idBase: string
}

export function ScMcExercise({ state, idBase }: ScMcExerciseProps) {
  const answers = state.answers.slice(0)

  if (state.isSingleChoice)
    return <SingleChoice answers={answers} idBase={idBase} />

  return <MultipleChoice answers={answers} idBase={idBase} />
}

function SingleChoice({ answers, idBase }: SingleChoiceProps) {
  const [selected, setSelected] = React.useState<number | undefined>(undefined)
  const [focused, setFocused] = React.useState<number | undefined>(undefined)
  const [showFeedback, setShowFeedback] = React.useState(false)
  const { strings } = useInstanceData()

  return (
    <Container>
      <Choices>
        {answers.map((answer, i) => {
          const id = `${idBase}${i}`
          return (
            <React.Fragment key={i}>
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
                    if (e.keyCode == 13) setShowFeedback(true)
                  }}
                />
                <StyledLabel
                  selected={selected === i}
                  htmlFor={id}
                  focused={focused === i}
                >
                  <FontAwesomeIcon
                    icon={selected === i ? faCheckCircle : faCircle}
                  />
                  {renderArticle(answer.content)}
                </StyledLabel>
              </ChoiceWrapper>
              {showFeedback &&
                selected !== undefined &&
                answers[selected] &&
                answers[selected] === answer && (
                  <Feedback correct={answers[selected].isCorrect}>
                    {renderArticle(answers[selected].feedback)}
                  </Feedback>
                )}
            </React.Fragment>
          )
        })}
      </Choices>
      <CheckButton
        selectable={selected !== undefined}
        onClick={() => setShowFeedback(true)}
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

function MultipleChoice({ answers, idBase }: SingleChoiceProps) {
  const [selected, setSelected] = React.useState(answers.map(() => false))
  const [focused, setFocused] = React.useState<number | undefined>(undefined)
  const [showFeedback, setShowFeedback] = React.useState(false)
  const { strings } = useInstanceData()
  const correct = answers.every((answer, i) => answer.isCorrect === selected[i])
  return (
    <Container>
      <Choices>
        {answers.map((answer, i) => {
          const id = `${idBase}${i}`

          const hasFeedback =
            answer.feedback[0].children &&
            answer.feedback[0].children.length > 0

          return (
            <React.Fragment key={i}>
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
                <StyledLabel
                  selected={selected[i]}
                  htmlFor={id}
                  focused={focused === i}
                >
                  <FontAwesomeIcon
                    icon={selected[i] ? faCheckSquare : faSquare}
                  />
                  {renderArticle(answer.content)}
                </StyledLabel>
              </ChoiceWrapper>
              {showFeedback &&
                selected[i] &&
                hasFeedback &&
                renderArticle(answer.feedback)}
            </React.Fragment>
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
        onClick={() => setShowFeedback(true)}
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

const StyledLabel = styled.label<{ selected: boolean; focused?: boolean }>`
  display: flex;
  align-items: center;
  cursor: pointer;

  > svg {
    font-size: 1.33rem;
    margin-top: 2px;
    color: ${(props) => props.theme.colors.brand};

    /* ${(props) =>
      props.selected
        ? props.theme.colors.brand
        : props.theme.colors.lightBlueBackground}; */
  }

  ${(props) =>
    props.focused &&
    css`
      outline: 1px dotted #212121;
      outline: 5px auto -webkit-focus-ring-color;
    `}

  > div > * {
    margin-left: 8px;
  }
`

const Container = styled.div`
  ${makeMargin}
  margin-bottom: ${(props) => props.theme.spacing.mb.block};

  &:hover {
  }
`
