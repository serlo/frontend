import { renderArticle } from '../../schema/articleRenderer'
import styled, { css } from 'styled-components'
import React from 'react'
import { makeMargin, makeDefaultButton } from '../../helper/csshelper'
import { convertEdtrioState } from '../../schema/convertEdtrioState'
import ScMcExercise from './ScMcExercise'
import InputExercise from './InputExercise'
import LicenseNotice from './LicenseNotice'

export default function Exercise(props) {
  const { task, solution, taskLicense, solutionLicense, inGroup } = props
  const [solutionVisible, setVisible] = React.useState(false)

  let taskValue = task.children
  let solutionValue = solution.children
  let interactiveComp = null

  if (taskValue.length === 1 && taskValue[0].type === '@edtr-io/exercise') {
    const state = taskValue[0].state
    taskValue = convertEdtrioState(state.content).children
    if (state.interactive) {
      if (state.interactive.plugin === 'scMcExercise') {
        interactiveComp = <ScMcExercise state={state.interactive.state} />
      }
      if (state.interactive.plugin === 'inputExercise') {
        interactiveComp = <InputExercise state={state.interactive.state} />
      }
    }
  }

  if (
    solutionValue.length === 1 &&
    solutionValue[0].type === '@edtr-io/solution'
  ) {
    const state = solutionValue[0].state
    const prereq = []
    if (state.prerequisite) {
      prereq.push({
        type: 'p',
        children: [
          {
            text: 'Für diese Aufgabe benötigst Du folgendes Grundwissen: '
          },
          {
            type: 'a',
            href: '/' + state.prerequisite.id,
            children: [{ text: state.prerequisite.title }]
          }
        ]
      })
    }
    const strategy = convertEdtrioState(state.strategy).children
    const steps = convertEdtrioState(state.steps).children
    solutionValue = [...prereq, ...strategy, ...steps]
  }
  return (
    <Wrapper inGroup={inGroup}>
      {renderArticle(taskValue, false)}
      {interactiveComp}
      {taskLicense && <LicenseNotice minimal data={taskLicense} />}
      <SolutionToggle
        onClick={() => {
          setVisible(!solutionVisible)
        }}
        active={solutionVisible}
      >
        <StyledSpan>{solutionVisible ? '▾ ' : '▸ '}</StyledSpan>Lösung{' '}
        {solutionVisible ? 'ausblenden' : 'anzeigen'}
      </SolutionToggle>
      <SolutionBox visible={solutionVisible}>
        {renderArticle(solutionValue, false)}
        {solutionLicense && <LicenseNotice minimal data={solutionLicense} />}
      </SolutionBox>
    </Wrapper>
  )
}

const StyledSpan = styled.span`
  display: inline-block;
  width: 0.9rem;
`

const Wrapper = styled.div<{ inGroup?: boolean }>`
  margin-bottom: 30px;
  border-bottom: 8px solid ${props => props.theme.colors.lightBlueBackground};

  ${props =>
    !props.inGroup &&
    css`
    ${makeMargin}
    border-left: 8px solid ${props => props.theme.colors.lightBlueBackground};
    border-bottom: 0;
  `};
`

const SolutionToggle = styled.a<{ active: boolean }>`
  ${makeMargin}
  ${makeDefaultButton}
  padding-right: 9px;
  font-size: 1rem;
  display: inline-block;
  cursor: pointer;
  margin-bottom: 16px;

  ${props =>
    props.active &&
    css`
      background-color: ${props => props.theme.colors.brand} !important;
      color: #fff !important;
    `}

  @media (hover: none) {
    &:hover {
      background-color: transparent;
      color: ${props => props.theme.colors.brand};
    }
  }
`

const SolutionBox = styled.div<{ visible: boolean }>`
  padding-top: 10px;
  padding-bottom: 10px;
  display: ${props => (props.visible ? 'block' : 'none')};
  ${makeMargin}
  margin-bottom: ${props => props.theme.spacing.mb.block};
  border-left: 4px solid ${props => props.theme.colors.brand};;
`
