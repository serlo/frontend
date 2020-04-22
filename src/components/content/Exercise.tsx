import { renderArticle } from '../../schema/articleRenderer'
import styled from 'styled-components'
import React from 'react'
import { makeMargin } from '../../helper/csshelper'
import { convertEdtrioState } from '../../schema/convertEdtrioState'
import ScMcExercise from './ScMcExercise'
import InputExercise from './InputExercise'
import LicenseNotice from './LicenseNotice'

export default function Exercise(props) {
  const { task, solution, taskLicense, solutionLicense } = props
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
    <>
      {renderArticle(taskValue, false)}
      {interactiveComp}
      {taskLicense && <LicenseNotice data={taskLicense} />}
      <SolutionToggle
        onClick={() => {
          setVisible(!solutionVisible)
        }}
      >
        Lösung anzeigen
      </SolutionToggle>
      <SolutionBox visible={solutionVisible}>
        {renderArticle(solutionValue, false)}
        {solutionLicense && <LicenseNotice data={solutionLicense} />}
      </SolutionBox>
    </>
  )
}

const SolutionToggle = styled.div`
  ${makeMargin}
  font-size: 1.125rem;
  cursor: pointer;
  text-decoration: underline;
  color: ${props => props.theme.colors.brand};
  margin-bottom: ${props => props.theme.spacing.mb.block};
`

const SolutionBox = styled.div<{ visible: boolean }>`
  padding-top: 10px;
  padding-bottom: 10px;
  display: ${props => (props.visible ? 'block' : 'none')};
  ${makeMargin}
  border: 1px solid black;
  margin-bottom: ${props => props.theme.spacing.mb.block};
`
