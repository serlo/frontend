import React from 'react'
import styled, { css } from 'styled-components'

import { makeMargin, makeDefaultButton } from '../../helper/css'
import { renderArticle } from '../../schema/article-renderer'
import { ExerciseNumbering } from './exercise-numbering'
import { InputExercise, InputExerciseProps } from './input-exercise'
import { LicenseNotice, LicenseNoticeData } from './license-notice'
import { ScMcExercise, ScMcExerciseProps } from './sc-mc-exercise'

//TODO: define and export data types somewhere
export interface ExerciseProps {
  task: TaskData
  solution: SolutionData
  taskLicense: LicenseNoticeData
  solutionLicense: LicenseNoticeData
  grouped: boolean
  positionInGroup: number
  positionOnPage: number
}

/* Experiment to type out the EditorState */

interface TaskData {
  children: [
    {
      type: string
      state: {
        content: TaskData
        interactive: {
          plugin: string
          state: ScMcExerciseProps['state'] | InputExerciseProps['data']
        }
      }
    }
  ]
}

interface SolutionData {
  children: [
    {
      type: string
      state: {
        prerequisite: {
          id: string
          title: string
        }
        strategy: unknown[]
        steps: unknown[]
      }
      children: {
        text?: string
      }
    }
  ]
}

export function Exercise(props: ExerciseProps) {
  const {
    task,
    solution,
    taskLicense,
    solutionLicense,
    grouped,
    positionInGroup,
    positionOnPage,
  } = props
  const [solutionVisible, setVisible] = React.useState(false)

  let taskValue = {}
  let solutionValue: unknown[] = []
  let interactiveComp = null

  if (
    task.children.length === 1 &&
    task.children[0].type === '@edtr-io/exercise'
  ) {
    const state = task.children[0].state
    taskValue = state.content
    if (state.interactive) {
      if (state.interactive.plugin === 'scMcExercise') {
        interactiveComp = (
          <ScMcExercise
            state={state.interactive.state as ScMcExerciseProps['state']}
            idBase={`ex-${positionOnPage}-${positionInGroup}-`}
          />
        )
      }
      if (state.interactive.plugin === 'inputExercise') {
        interactiveComp = (
          <InputExercise
            data={state.interactive.state as InputExerciseProps['data']}
          />
        )
      }
    }
  }

  if (
    solution.children.length === 1 &&
    solution.children[0].type === '@edtr-io/solution'
  ) {
    const state = solution.children[0].state
    const prereq = []
    if (state.prerequisite) {
      prereq.push({
        type: 'p',
        children: [
          {
            text: 'Für diese Aufgabe benötigst Du folgendes Grundwissen: ',
          },
          {
            type: 'a',
            href: `/${state.prerequisite.id}`,
            children: [{ text: state.prerequisite.title }],
          },
        ],
      })
    }
    const strategy = state.strategy
    const steps = state.steps
    solutionValue = [...prereq, ...strategy, ...steps]
  }
  const hasSolution = solution && solution.children[0].children?.text !== ''

  return (
    <Wrapper grouped={grouped}>
      {!grouped && <ExerciseNumbering index={positionOnPage} />}

      {/* @ts-expect-error */}
      {renderArticle(taskValue, false)}
      {interactiveComp}
      {taskLicense && <LicenseNotice minimal data={taskLicense} />}
      {hasSolution && (
        <SolutionToggle
          onClick={() => {
            setVisible(!solutionVisible)
          }}
          active={solutionVisible}
        >
          <StyledSpan>{solutionVisible ? '▾' : '▸'}&nbsp;</StyledSpan>Lösung{' '}
          {solutionVisible ? 'ausblenden' : 'anzeigen'}
        </SolutionToggle>
      )}
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

const Wrapper = styled.div<{ grouped?: boolean }>`
  border-top: 2px solid ${(props) => props.theme.colors.brand};
  padding-top: 30px;
  padding-bottom: 10px;

  ${(props) =>
    !props.grouped &&
    css`
      border-left: 8px solid
        ${(props) => props.theme.colors.lightBlueBackground};
      border-top: 0;

      @media (min-width: ${(props) => props.theme.breakpoints.mobile}) {
        ${makeMargin}
      }
      margin-bottom: 40px;
      padding-top: 7px;
    `};

  @media (hover: hover) {
    input {
      opacity: 0.2;
      transition: opacity 0.2s ease-in;
    }

    &:hover {
      input {
        opacity: 1;
      }
    }
  }
`

const SolutionToggle = styled.a<{ active: boolean }>`
  ${makeMargin}
  ${makeDefaultButton}
  padding-right: 9px;
  font-size: 1rem;
  display: inline-block;
  cursor: pointer;
  margin-bottom: 16px;
  word-wrap: normal;

  ${(props) =>
    props.active &&
    css`
      background-color: ${(props) => props.theme.colors.brand} !important;
      color: #fff !important;
    `}

  @media (hover: none) {
    &:hover {
      background-color: transparent;
      color: ${(props) => props.theme.colors.brand};
    }
  }
`

const SolutionBox = styled.div<{ visible: boolean }>`
  padding-top: 10px;
  padding-bottom: 10px;
  display: ${(props) => (props.visible ? 'block' : 'none')};
  ${makeMargin}
  margin-bottom: ${(props) => props.theme.spacing.mb.block};
  border-left: 8px solid ${(props) => props.theme.colors.brand};;
`
