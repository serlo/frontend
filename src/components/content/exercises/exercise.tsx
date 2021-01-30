import dynamic from 'next/dynamic'
import { useState, useEffect } from 'react';
import styled, { css } from 'styled-components'

import { LicenseNotice } from '../license-notice'
import { ExerciseNumbering } from './exercise-numbering'
import { InputExercise } from './input-exercise'
import { ScMcExercise } from './sc-mc-exercise'
import { useAuth } from '@/auth/use-auth'
import { CommentAreaProps } from '@/components/comments/comment-area'
import { useInstanceData } from '@/contexts/instance-context'
import { useLoggedInComponents } from '@/contexts/logged-in-components'
import { FrontendExerciseNode } from '@/data-types'
import { makeMargin, makeTransparentButton, makePadding } from '@/helper/css'
import { submitEventWithPath } from '@/helper/submit-event'
import type { NodePath, RenderNestedFunction } from '@/schema/article-renderer'

export interface ExerciseProps {
  node: FrontendExerciseNode
  renderNested: RenderNestedFunction
  path?: NodePath
}

const CommentArea = dynamic<CommentAreaProps>(() =>
  import('@/components/comments/comment-area').then((mod) => mod.CommentArea)
)

export function Exercise({ node, renderNested, path }: ExerciseProps) {
  const { strings } = useInstanceData()
  const [solutionVisible, setVisible] = useState(false)
  const [randomId] = useState(Math.random().toString())

  const auth = useAuth()
  const [loaded, setLoaded] = useState(false)
  useEffect(() => {
    setLoaded(true)
  }, [])

  const lic = useLoggedInComponents()

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
    const license = node.solution.license && !node.solution.license.default && (
      <LicenseNotice minimal data={node.solution.license} type="solution" />
    )
    const Comp = lic?.ExerciseAuthorTools
    const authorTools = Comp && loaded && auth.current && (
      <Comp
        data={{
          type: '_SolutionInline',
          id: node.context.solutionId!,
          parentId: node.context.id,
          grouped: node.grouped,
        }}
      />
    )

    return (
      <SolutionBox>
        {renderNested(
          [
            {
              type: 'solution',
              solution: node.solution,
              context: { id: node.context.solutionId! },
            },
          ],
          'tasksol'
        )}
        {
          /* compat: hide div if empty */
          (license || authorTools) && (
            <SolutionTools>
              {license}
              {authorTools}
            </SolutionTools>
          )
        }
        <CommentArea id={node.context.solutionId!} />
      </SolutionBox>
    )
  }

  function renderSolutionToggle() {
    if (!node.solution.edtrState && !node.solution.legacy) return null

    return (
      <SolutionToggle
        onClick={() => {
          if (!solutionVisible) {
            submitEventWithPath('opensolution', path)
          }
          setVisible(!solutionVisible)
        }}
        onPointerUp={(e) => e.currentTarget.blur()} //hack, use https://caniuse.com/#feat=css-focus-visible when supported
        active={solutionVisible}
      >
        <StyledSpan>{solutionVisible ? '▾' : '▸'}&nbsp;</StyledSpan>
        {strings.entities.solution}{' '}
        {solutionVisible ? strings.content.hide : strings.content.show}
      </SolutionToggle>
    )
  }

  function renderExerciseTask() {
    if (node.task.legacy) {
      return renderNested(node.task.legacy, 'task')
    } else if (node.task.edtrState) {
      return renderNested(node.task.edtrState.content, 'task')
    }
    return null
  }

  function renderInteractive() {
    if (!node.task.edtrState) return null

    const state = node.task.edtrState

    if (state.interactive) {
      if (state.interactive.plugin === 'scMcExercise') {
        return (
          <ScMcExercise
            state={state.interactive.state}
            idBase={`ex-${
              node.positionOnPage ? node.positionOnPage : randomId
            }-${node.positionInGroup ? node.positionInGroup : ''}-`}
            renderNested={renderNested}
            path={path}
          />
        )
      }
      if (state.interactive.plugin === 'inputExercise') {
        return <InputExercise data={state.interactive.state} path={path} />
      }
    }
  }

  function renderToolsAndLicense() {
    const Comp = lic?.ExerciseAuthorTools
    return (
      <ExerciseTools>
        {renderSolutionToggle()}

        {node.task.license && (
          <LicenseNotice minimal data={node.task.license} type="task" />
        )}
        {loaded && auth.current && Comp && (
          <Comp data={{ type: '_ExerciseInline', id: node.context.id }} />
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
  ${makeTransparentButton}
  margin-right: auto;
  padding-right: 9px;
  font-size: 1rem;
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
  border-left: 8px solid ${(props) => props.theme.colors.lightBlueBackground};
`

const SolutionTools = styled.div`
  ${makePadding}
`
