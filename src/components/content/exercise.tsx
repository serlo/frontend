import React from 'react'
import styled, { css } from 'styled-components'

import {
  makeMargin,
  makeDefaultButton,
  makePadding,
  inputFontReset,
} from '../../helper/css'
import { renderArticle } from '../../schema/article-renderer'
import { AuthorTools } from './author-tools'
import { ExerciseNumbering } from './exercise-numbering'
import { InputExercise, InputExerciseProps } from './input-exercise'
import { LicenseNotice } from './license-notice'
import { ScMcExercise, ScMcExerciseProps } from './sc-mc-exercise'
import { useAuth } from '@/auth/use-auth'
import { useInstanceData } from '@/contexts/instance-context'
import { LicenseData, FrontendContentNode } from '@/data-types'

export interface ExerciseProps {
  type?: 'exercise' | '@edtr-io/exercise'
  task: TaskData
  solution: SolutionData
  taskLicense: LicenseData
  solutionLicense: LicenseData
  grouped: boolean
  positionInGroup: number
  positionOnPage?: number
}

/* Experiment to type out the EditorState */

export interface ExerciseChildData {
  type?: '@edtr-io/exercise'
  state: {
    content: FrontendContentNode[]
    interactive:
      | {
          plugin: 'scMcExercise'
          state: ScMcExerciseProps['state']
        }
      | {
          plugin: 'inputExercise'
          state: InputExerciseProps['data']
        }
  }
}

export interface TaskData {
  children: ExerciseChildData[]
}

export interface SolutionChildData {
  type?: '@edtr-io/solution'
  state: {
    prerequisite: {
      id: string
      title: string
    }
    strategy: FrontendContentNode[]
    steps: FrontendContentNode[]
  }
  children?: FrontendContentNode[]
}

interface SolutionData {
  children?: SolutionChildData[]
}

export function Exercise(props: ExerciseProps) {
  const { strings } = useInstanceData()
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

  const isEditorTask =
    task.children.length === 1 && task.children[0].type === '@edtr-io/exercise'

  const isEditorSolution =
    solution.children &&
    solution.children.length === 1 &&
    solution.children[0].type === '@edtr-io/solution'

  const auth = useAuth()
  const [loaded, setLoaded] = React.useState(false)
  React.useEffect(() => {
    setLoaded(true)
  }, [])

  return (
    <Wrapper grouped={grouped}>
      {!grouped && <ExerciseNumbering index={positionOnPage!} />}

      {renderExerciseTask()}
      {renderInteractive()}

      {renderToolsAndLicense()}

      {solutionVisible && renderSolutionBox()}
    </Wrapper>
  )

  function renderSolutionToggle() {
    if (!solution.children || solution.children[0].children?.length === 0)
      return null

    return (
      <SolutionToggle
        onClick={() => {
          setVisible(!solutionVisible)
        }}
        onPointerUp={(e) => e.currentTarget.blur()} //hack, use https://caniuse.com/#feat=css-focus-visible when supported
        active={solutionVisible}
      >
        <StyledSpan>{solutionVisible ? '▾' : '▸'}&nbsp;</StyledSpan>
        {strings.content.solution}{' '}
        {solutionVisible ? strings.content.hide : strings.content.show}
      </SolutionToggle>
    )
  }

  function renderSolutionBox() {
    return (
      <SolutionBox>
        {renderArticle(getSolutionContent(), false)}

        <SolutionTools>
          {solutionLicense && <LicenseNotice minimal data={solutionLicense} />}
          {loaded && auth.current && <AuthorTools />}
        </SolutionTools>
      </SolutionBox>
    )
  }

  function getSolutionContent(): FrontendContentNode[] {
    if (!solution.children) return []
    if (!isEditorSolution) {
      return solution.children
    }
    const state = solution.children[0].state
    const prereq = []
    if (state.prerequisite) {
      prereq.push({
        type: 'p',
        children: [
          {
            text: `${strings.content.prerequisite} `,
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
    return [...prereq, ...strategy, ...steps] as FrontendContentNode[]
  }

  function renderExerciseTask() {
    const children = isEditorTask
      ? task.children[0].state.content
      : task.children

    return renderArticle(children, false)
  }

  function renderInteractive() {
    if (!isEditorTask) return null

    const state = task.children[0].state

    if (state.interactive) {
      if (state.interactive.plugin === 'scMcExercise') {
        return (
          <ScMcExercise
            state={state.interactive.state}
            idBase={`ex-${
              positionOnPage ? positionOnPage : ''
            }-${positionInGroup}-`}
          />
        )
      }
      if (state.interactive.plugin === 'inputExercise') {
        return <InputExercise data={state.interactive.state} />
      }
    }
  }

  function renderToolsAndLicense() {
    return (
      <ExerciseTools>
        {renderSolutionToggle()}

        {taskLicense && <LicenseNotice minimal data={taskLicense} />}
        {loaded && auth.current && <AuthorTools />}
      </ExerciseTools>
    )
  }
}

const ExerciseTools = styled.div`
  display: flex;
`

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

const SolutionToggle = styled.button<{ active: boolean }>`
  ${makeMargin}
  ${inputFontReset}
  ${makeDefaultButton}
  margin-right: auto;
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

const SolutionBox = styled.div`
  padding-top: 10px;
  padding-bottom: 10px;
  ${makeMargin}
  margin-bottom: ${(props) => props.theme.spacing.mb.block};
  border-left: 8px solid ${(props) => props.theme.colors.brand};;
`

const SolutionTools = styled.div`
  ${makePadding}
`
