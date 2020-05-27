import styled, { css } from 'styled-components'
import { makeMargin, makeDefaultButton } from '../../helper/csshelper'
import React from 'react'
import { renderArticle } from '../../schema/articleRenderer'
import StyledP from '../tags/StyledP'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckCircle, faCheckSquare } from '@fortawesome/free-solid-svg-icons'
import { faCircle, faSquare } from '@fortawesome/free-regular-svg-icons'

// TODO: needs type declaration
type ScMcExerciseProps = any

export default function ScMcExercise({
  state,
  positionOnPage,
  positionInGroup,
}: ScMcExerciseProps) {
  const keyBase = `ex-${positionOnPage}-${positionInGroup}-`
  if (state.isSingleChoice)
    return <SingleChoice state={state} keyBase={keyBase} />

  return <MultipleChoice state={state} keyBase={keyBase} />
}

// TODO: needs type declaration
type SingleChoiceProps = any

function SingleChoice({ state, keyBase }: SingleChoiceProps) {
  // TODO: needs type declaration
  const [selected, setSelected] = React.useState<any>(undefined)
  const [showFeedback, setShowFeedback] = React.useState(false)

  return (
    <Container>
      <Choices>
        {/* TODO: needs type declaration */}
        {state.answers.map((answer: any, i: any) => {
          const key = keyBase + i
          return (
            <React.Fragment key={key}>
              <ChoiceWrapper>
                <StyledInput
                  id={key}
                  type="radio"
                  checked={selected === i}
                  onChange={() => {
                    setShowFeedback(false)
                    setSelected(i)
                  }}
                />
                <StyledLabel selected={selected === i} key={key} htmlFor={key}>
                  <FontAwesomeIcon
                    icon={selected === i ? faCheckCircle : faCircle}
                  />
                  {renderArticle(answer.content)}
                </StyledLabel>
              </ChoiceWrapper>
              {showFeedback &&
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
        {selected !== undefined ? "Stimmt's?" : 'Klicke auf eine der Optionen'}
      </CheckButton>
    </Container>
  )
}

// TODO: needs type declaration
type MultipleChoiceProps = any

function MultipleChoice({ state, keyBase }: MultipleChoiceProps) {
  const [selected, setSelected] = React.useState(state.answers.map(() => false))
  const [showFeedback, setShowFeedback] = React.useState(false)
  const right = state.answers.every(
    // TODO: needs type declaration
    (answer: any, i: any) => answer.isCorrect === selected[i]
  )
  return (
    <Container>
      <Choices>
        {/* TODO: needs type declaration */}
        {state.answers.map((answer: any, i: any) => {
          const key = keyBase + i
          return (
            <React.Fragment key={key}>
              <ChoiceWrapper key={key}>
                <StyledInput
                  id={key}
                  type="checkbox"
                  checked={selected[i]}
                  onChange={() => {
                    setShowFeedback(false)
                    const newArr = selected.slice(0)
                    newArr[i] = !newArr[i]
                    setSelected(newArr)
                  }}
                />
                <StyledLabel selected={selected[i]} key={key} htmlFor={key}>
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
          <StyledP>{right ? 'Richtig' : 'Falsch'}</StyledP>
        </Feedback>
      )}
      <CheckButton selectable={true} onClick={() => setShowFeedback(true)}>
        Stimmt&apos;s?
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
