import { faCircle, faSquare } from '@fortawesome/free-regular-svg-icons'
import { faCheckCircle, faCheckSquare } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import styled, { css } from 'styled-components'

import { makeMargin, makeDefaultButton } from '../../helper/css'
import { renderArticle } from '../../schema/article-renderer'
import { StyledP } from '../tags/styled-p'
import { useInstanceData } from '@/contexts/instance-context'
import { FrontendContentNode } from '@/data-types'

export interface ScMcExerciseProps {
  // TODO: should be typed in convert-edtr-io-state
  state: {
    answers: {
      isCorrect: boolean
      feedback: FrontendContentNode[]
      content: FrontendContentNode[]
    }[]
    isSingleChoice?: boolean
  }
  idBase: string
}

export function ScMcExercise({ state, idBase }: ScMcExerciseProps) {
  if (state.isSingleChoice)
    return <SingleChoice state={state} idBase={idBase} />

  return <MultipleChoice state={state} idBase={idBase} />
}

function SingleChoice({ state, idBase }: ScMcExerciseProps) {
  const [selected, setSelected] = React.useState<number | undefined>(undefined)
  const [showFeedback, setShowFeedback] = React.useState(false)
  const { strings } = useInstanceData()

  return (
    <Container>
      <Choices>
        {state.answers.map((answer, i) => {
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
                />
                <StyledLabel selected={selected === i} htmlFor={id}>
                  <FontAwesomeIcon
                    icon={selected === i ? faCheckCircle : faCircle}
                  />
                  {renderArticle(answer.content)}
                </StyledLabel>
              </ChoiceWrapper>
              {showFeedback &&
                selected !== undefined &&
                state.answers[selected] &&
                state.answers[selected] === answer && (
                  <Feedback right={state.answers[selected].isCorrect}>
                    {renderArticle(state.answers[selected].feedback)}
                  </Feedback>
                )}
            </React.Fragment>
          )
        })}
      </Choices>

      <CheckButton
        selectable={selected !== undefined}
        onClick={() => setShowFeedback(true)}
      >
        {selected !== undefined
          ? strings.content.check
          : strings.content.chooseOption}
      </CheckButton>
    </Container>
  )
}

function MultipleChoice({ state, idBase }: ScMcExerciseProps) {
  const [selected, setSelected] = React.useState(state.answers.map(() => false))
  const [showFeedback, setShowFeedback] = React.useState(false)
  const { strings } = useInstanceData()
  const right = state.answers.every(
    (answer, i) => answer.isCorrect === selected[i]
  )
  return (
    <Container>
      <Choices>
        {state.answers.map((answer, i) => {
          const id = `${idBase}${i}`
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
                />
                <StyledLabel selected={selected[i]} htmlFor={id}>
                  <FontAwesomeIcon
                    icon={selected[i] ? faCheckSquare : faSquare}
                  />
                  {renderArticle(answer.content)}
                </StyledLabel>
              </ChoiceWrapper>
              {showFeedback && selected[i] && renderArticle(answer.feedback)}
            </React.Fragment>
          )
        })}
      </Choices>
      {showFeedback && (
        <Feedback right={right}>
          <StyledP>
            {right ? strings.content.right : strings.content.wrong}
          </StyledP>
        </Feedback>
      )}
      <CheckButton selectable onClick={() => setShowFeedback(true)}>
        {strings.content.check}
      </CheckButton>
    </Container>
  )
}

const CheckButton = styled.a<{ selectable: boolean }>`
  ${makeDefaultButton}
  margin-top: 16px;

  color: #fff;
  background-color: ${(props) => props.theme.colors.brand};

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

const StyledLabel = styled.label<{ selected: boolean }>`
  display: flex;
  cursor: pointer;

  > svg {
    font-size: 1.33rem;
    margin-top: 2px;
    color: ${(props) => props.theme.colors.brand}

    /* ${(props) =>
      props.selected
        ? props.theme.colors.brand
        : props.theme.colors.lightBlueBackground}; */
  }

  > div > * {
    margin-left: 8px;
  }
`

const Feedback = styled.div<{ right?: boolean }>`
  margin-left: 14px;
  color: ${(props) => (props.right ? 'green' : 'red')};
`

const Container = styled.div`
  ${makeMargin}
  margin-bottom: ${(props) => props.theme.spacing.mb.block};

  &:hover {

  }
`
