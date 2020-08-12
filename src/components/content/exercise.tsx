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
import { InputExercise } from './input-exercise'
import { LicenseNotice } from './license-notice'
import { ScMcExercise } from './sc-mc-exercise'
import { useAuth } from '@/auth/use-auth'
import { useInstanceData } from '@/contexts/instance-context'
import { FrontendContentNode, FrontendExerciseNode } from '@/data-types'

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
      {!node.grouped && <ExerciseNumbering index={node.positionOnPage!} />}

      {renderExerciseTask()}
      {renderInteractive()}

      {renderToolsAndLicense()}

      {solutionVisible && renderSolutionBox()}
    </Wrapper>
  )

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

  function renderSolutionBox() {
    return (
      <SolutionBox>
        {renderArticle(getSolutionContent(), false)}

        <SolutionTools>
          {node.solutionLicense && (
            <LicenseNotice minimal data={node.solutionLicense} />
          )}
          {loaded && auth.current && (
            <AuthorTools
              data={{
                type: '_SolutionInline',
                id: node.context.solutionId!,
                parentId: node.context.id,
                grouped: node.grouped,
              }}
            />
          )}
        </SolutionTools>
      </SolutionBox>
    )
  }

  function getSolutionContent(): FrontendContentNode[] {
    if (node.solutionLegacy) {
      return node.solutionLegacy
    }
    if (!node.solutionEdtrState) return []
    const state = node.solutionEdtrState
    const prereq: FrontendContentNode[] = []
    if (state.prerequisite) {
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
