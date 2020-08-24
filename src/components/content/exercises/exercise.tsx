import React from 'react'
import styled, { css } from 'styled-components'

import {
  makeMargin,
  makeDefaultButton,
  makePadding,
  inputFontReset,
} from '../../../helper/css'
import { renderArticle } from '../../../schema/article-renderer'
import { AuthorTools } from '../author-tools'
import { LicenseNotice } from '../license-notice'
import { ExerciseNumbering } from './exercise-numbering'
import { InputExercise } from './input-exercise'
import { ScMcExercise } from './sc-mc-exercise'
import { useAuth } from '@/auth/use-auth'
import { useInstanceData } from '@/contexts/instance-context'
import {
  FrontendContentNode,
  FrontendExerciseNode,
  LicenseData,
  SolutionEdtrState,
} from '@/data-types'

export interface ExerciseProps {
  node: FrontendExerciseNode
}

export function Exercise({ node }: ExerciseProps) {
  const { strings } = useInstanceData()
  const [solutionVisible, setVisible] = React.useState(false)

  const auth = useAuth()
  const [loaded, setLoaded] = React.useState(false)
  React.useEffect(() => {
    setLoaded(true)
  }, [])

  return (
    <Wrapper grouped={node.grouped}>
      <ExerciseNumbering
        isChild={node.grouped}
        index={node.grouped ? node.positionInGroup! : node.positionOnPage!}
        href={node.href ? node.href : `/${node.context.id}`}
      />

      {renderExerciseTask()}
      {renderInteractive()}

      {renderToolsAndLicense()}

      {solutionVisible && renderSolution()}
    </Wrapper>
  )

  function renderSolution() {
    return (
      <Solution
        solutionEdtrState={node.solutionEdtrState}
        solutionLegacy={node.solutionLegacy}
        license={node.solutionLicense}
        authorTools={
          loaded &&
          auth.current && (
            <AuthorTools
              data={{
                type: '_SolutionInline',
                id: node.context.solutionId!,
                parentId: node.context.id,
                grouped: node.grouped,
              }}
            />
          )
        }
      />
    )
  }

  function renderSolutionToggle() {
    if (!node.solutionEdtrState && !node.solutionLegacy) return null

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

  function renderExerciseTask() {
    if (node.taskLegacy) {
      return renderArticle(node.taskLegacy, false)
    } else if (node.taskEdtrState) {
      return renderArticle(node.taskEdtrState.content, false)
    }
    return null
  }

  function renderInteractive() {
    if (!node.taskEdtrState) return null

    const state = node.taskEdtrState

    if (state.interactive) {
      if (state.interactive.plugin === 'scMcExercise') {
        return (
          <ScMcExercise
            state={state.interactive.state}
            idBase={`ex-${node.positionOnPage ? node.positionOnPage : ''}-${
              node.positionInGroup ? node.positionInGroup : ''
            }-`}
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

        {node.taskLicense && <LicenseNotice minimal data={node.taskLicense} />}
        {loaded && auth.current && (
          <AuthorTools
            data={{ type: '_ExerciseInline', id: node.context.id }}
          />
        )}
      </ExerciseTools>
    )
  }
}

export interface SolutionProps {
  license?: LicenseData
  authorTools?: React.ReactNode
  solutionEdtrState?: SolutionEdtrState
  solutionLegacy?: FrontendContentNode[]
}

export function Solution({
  license,
  authorTools,
  solutionEdtrState,
  solutionLegacy,
}: SolutionProps) {
  const { strings } = useInstanceData()

  return renderSolutionBox()

  function renderSolutionBox() {
    return (
      <SolutionBox>
        {renderArticle(getSolutionContent(), false)}

        <SolutionTools>
          {license && <LicenseNotice minimal data={license} />}
          {authorTools}
        </SolutionTools>
      </SolutionBox>
    )
  }

  function getSolutionContent(): FrontendContentNode[] {
    if (solutionLegacy) {
      return solutionLegacy
    }
    if (!solutionEdtrState) return []
    const state = solutionEdtrState
    const prereq: FrontendContentNode[] = []
    if (state.prerequisite && state.prerequisite.href) {
      prereq.push({
        type: 'p',
        children: [
          { type: 'text', text: `${strings.content.prerequisite} ` },
          {
            type: 'a',
            href: state.prerequisite.href,
            children: [{ type: 'text', text: state.prerequisite.title }],
          },
        ],
      })
    }
    const strategy = state.strategy
    const steps = state.steps
    return [...prereq, ...strategy, ...steps]
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
  margin-top: 40px;
  margin-bottom: 10px;

  ${(props) =>
    !props.grouped &&
    css`
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
  border-left: 8px solid ${(props) => props.theme.colors.lightBlueBackground};;
`

const SolutionTools = styled.div`
  ${makePadding}
`
