import clsx from 'clsx'
import dynamic from 'next/dynamic'
import { useState, useEffect } from 'react'
import styled, { css } from 'styled-components'

import { LicenseNotice } from '../license-notice'
import { ExerciseNumbering } from './exercise-numbering'
import { InputExercise } from './input-exercise'
import { ScMcExercise } from './sc-mc-exercise'
import { useAuthentication } from '@/auth/use-authentication'
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

  const auth = useAuthentication()
  const [loaded, setLoaded] = useState(false)
  useEffect(() => {
    setLoaded(true)
  }, [])

  const lic = useLoggedInComponents()

  return (
    <div
      className={clsx('serlo-exercise-wrapper', {
        'pt-2 mb-10': !node.grouped,
      })}
    >
      <ExerciseNumbering
        isChild={node.grouped}
        index={node.grouped ? node.positionInGroup! : node.positionOnPage!}
        href={node.href ? node.href : `/${node.context.id}`}
      />

      {renderExerciseTask()}
      {renderInteractive()}

      {!node.grouped && (
        <div className="my-4">
          <a
            className="serlo-button serlo-make-interactive-transparent-blue"
            href={`/entity/repository/parents/${node.context.id}`}
            target="_blank"
            rel="noreferrer"
          >
            Zuordnungen anzeigen
          </a>
        </div>
      )}

      {renderToolsAndLicense()}

      {solutionVisible && renderSolution()}
    </div>
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
      <div className="serlo-solution-box">
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
      </div>
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
        return (
          <InputExercise
            data={state.interactive.state}
            path={path}
            renderNested={renderNested}
          />
        )
      }
    }
  }

  function renderToolsAndLicense() {
    const Comp = lic?.ExerciseAuthorTools
    return (
      <ExerciseTools>
        {renderSolutionToggle()}

        {node.task.license && (
          <LicenseNotice
            minimal
            data={node.task.license}
            type="task"
            path={path}
          />
        )}
        {loaded && auth.current && Comp && (
          <Comp data={{ type: '_ExerciseInline', id: node.context.id }} />
        )}
      </ExerciseTools>
    )
  }
}

const ExerciseTools = styled.div`
  @media (min-width: ${(props) => props.theme.breakpoints.mobile}) {
    display: flex;
  }
`

const StyledSpan = styled.span`
  display: inline-block;
  width: 0.9rem;
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
    `};

  @media (hover: none) {
    &:hover {
      background-color: transparent;
      color: ${(props) => props.theme.colors.brand};
    }
  }
`

const SolutionTools = styled.div`
  ${makePadding};
`
