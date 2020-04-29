import styled, { css } from 'styled-components'
import { makeMargin, makeDefaultButton } from '../../helper/csshelper'
import React from 'react'
import { renderArticle } from '../../schema/articleRenderer'
import { convertEdtrioState } from '../../schema/convertEdtrioState'
import { getServerSideProps } from '../../../pages/[...slug]'
import StyledP from '../tags/StyledP'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faCircle,
  faCheckCircle,
  faCheckSquare,
  faSquare
} from '@fortawesome/free-solid-svg-icons'

export default function ScMcExercise({ state }) {
  if (state.isSingleChoice) return <SingleChoice state={state} />

  return <MultipleChoice state={state} />
}

function randomIdentifier(i) {
  return (
    Math.random()
      .toString(20)
      .substr(2, 8) +
    '-' +
    i
  )
}

function SingleChoice({ state }) {
  const [selected, setSelected] = React.useState(undefined)
  const [showFeedback, setShowFeedback] = React.useState(false)

  return (
    <Container>
      <Choices>
        {state.answers.map((answer, i) => {
          const unique = randomIdentifier(i)
          return (
            <div key={unique}>
              <ChoiceWrapper>
                <StyledInput
                  id={unique}
                  type="radio"
                  checked={selected === i}
                  onChange={() => {
                    setShowFeedback(false)
                    setSelected(i)
                  }}
                />
                <StyledLabel
                  selected={selected === i}
                  key={unique}
                  htmlFor={unique}
                >
                  <FontAwesomeIcon
                    icon={selected === i ? faCheckCircle : faCircle}
                  />
                  {renderArticle(convertEdtrioState(answer.content).children)}
                </StyledLabel>
              </ChoiceWrapper>
              {showFeedback &&
                state.answers[selected] &&
                state.answers[selected] === answer && (
                  <Feedback right={state.answers[selected].isCorrect}>
                    {renderArticle(
                      convertEdtrioState(state.answers[selected].feedback)
                        .children
                    )}
                  </Feedback>
                )}
            </div>
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

function MultipleChoice({ state }) {
  const [selected, setSelected] = React.useState(state.answers.map(_ => false))
  const [showFeedback, setShowFeedback] = React.useState(false)
  const right = state.answers.every(
    (answer, i) => answer.isCorrect === selected[i]
  )
  return (
    <Container>
      <Choices>
        {state.answers.map((answer, i) => {
          const unique = randomIdentifier(i)
          return (
            <>
              <ChoiceWrapper key={unique}>
                <StyledInput
                  id={unique}
                  type="checkbox"
                  checked={selected[i]}
                  onChange={() => {
                    setShowFeedback(false)
                    const newArr = selected.slice(0)
                    newArr[i] = !newArr[i]
                    setSelected(newArr)
                  }}
                />
                <StyledLabel
                  selected={selected[i]}
                  key={unique}
                  htmlFor={unique}
                >
                  <FontAwesomeIcon
                    icon={selected[i] ? faCheckSquare : faSquare}
                  />
                  {renderArticle(convertEdtrioState(answer.content).children)}
                </StyledLabel>
              </ChoiceWrapper>
              {showFeedback &&
                selected[i] &&
                renderArticle(convertEdtrioState(answer.feedback).children)}
            </>
          )
        })}
      </Choices>
      {showFeedback && (
        <Feedback right={right}>
          <StyledP>{right ? 'Richtig' : 'Falsch'}</StyledP>
        </Feedback>
      )}
      <CheckButton selectable={true} onClick={() => setShowFeedback(true)}>
        Stimmt's?
      </CheckButton>
    </Container>
  )
}

const CheckButton = styled.a<{ selectable: boolean }>`
  ${makeDefaultButton}
  margin-top: 16px;

  color: #fff;
  background-color: ${props => props.theme.colors.brand};

  ${props =>
    !props.selectable &&
    css`
      opacity: 1;
      background-color: transparent;
      color: ${props => props.theme.colors.gray};
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
    opacity: 0;
  }
`

const StyledLabel = styled.label<{ selected: boolean }>`
  display: flex;
  cursor: pointer;

  > svg {
    font-size: 1.33rem;
    margin-top: 2px;
    color: ${props => props.theme.colors.brand}
    
    /* ${props =>
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
  color: ${props => (props.right ? 'green' : 'red')};
`

const Container = styled.div`
  ${makeMargin}
  margin-bottom: ${props => props.theme.spacing.mb.block}
`
