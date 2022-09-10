import clsx from 'clsx'
import dynamic from 'next/dynamic'
import { useState, useEffect } from 'react'

import { LicenseNotice } from '../license/license-notice'
import { ExerciseNumbering } from './exercise-numbering'
import { InputExercise } from './input-exercise'
import { ScMcExercise } from './sc-mc-exercise'
import { useAuthentication } from '@/auth/use-authentication'
import { CommentAreaEntityProps } from '@/components/comments/comment-area-entity'
import { Lazy } from '@/components/content/lazy'
import { isPrintMode, printModeSolutionVisible } from '@/components/print-mode'
import { useInstanceData } from '@/contexts/instance-context'
import { useLoggedInComponents } from '@/contexts/logged-in-components'
import { ExerciseInlineType } from '@/data-types'
import { FrontendExerciseNode, FrontendNodeType } from '@/frontend-node-types'
import type { NodePath, RenderNestedFunction } from '@/schema/article-renderer'

export interface ExerciseProps {
  node: FrontendExerciseNode
  renderNested: RenderNestedFunction
  path?: NodePath
}

const CommentAreaEntity = dynamic<CommentAreaEntityProps>(() =>
  import('@/components/comments/comment-area-entity').then(
    (mod) => mod.CommentAreaEntity
  )
)

export function Exercise({ node, renderNested, path }: ExerciseProps) {
  const { strings } = useInstanceData()
  const [solutionVisible, setSolutionVisible] = useState(
    isPrintMode
      ? printModeSolutionVisible
      : typeof window === 'undefined'
      ? false
      : window.location.href.includes('#comment-')
  )
  const [randomId] = useState(Math.random().toString())

  const auth = useAuthentication()
  const [loaded, setLoaded] = useState(false)
  useEffect(() => {
    setLoaded(true)
  }, [])

  const loggedInComponents = useLoggedInComponents()
  const isRevisionView =
    path && typeof path[0] === 'string' && path[0].startsWith('revision')

  if (node.grouped)
    return (
      <li className="serlo-exercise-wrapper serlo-grouped-exercise-wrapper">
        {renderExerciseContent()}
      </li>
    )

  return (
    <div className="serlo-exercise-wrapper pt-2 mb-10">
      {renderExerciseContent()}
    </div>
  )

  function renderExerciseContent() {
    return (
      <>
        {node.grouped ? null : ( // grouped ex numbering solved in css
          <ExerciseNumbering
            index={node.positionOnPage!}
            href={node.href ? node.href : `/${node.context.id}`}
          />
        )}

        <div className="flex justify-between">
          <div>{renderExerciseTask()}</div>
          {renderToolsButton()}
        </div>

        {renderInteractive()}
        <div className="flex">
          {renderSolutionToggle()}
          {renderLicense()}
        </div>

        {solutionVisible && renderSolution()}
      </>
    )
  }

  function renderSolution() {
    const license = node.solution.license &&
      !node.solution.license.isDefault && (
        <LicenseNotice minimal data={node.solution.license} type="solution" />
      )
    const ExerciseAuthorTools = loggedInComponents?.ExerciseAuthorTools
    const authorTools = ExerciseAuthorTools && loaded && auth.current && (
      <ExerciseAuthorTools
        data={{
          type: ExerciseInlineType.Solution,
          id: node.context.solutionId!,
          parentId: node.context.id,
          grouped: node.grouped,
          unrevisedRevisions: node.unrevisedRevisions,
        }}
      />
    )

    return (
      <div className="serlo-solution-box">
        {authorTools && <div className="text-right -mt-2">{authorTools}</div>}
        {renderNested(
          [
            {
              type: FrontendNodeType.Solution,
              solution: node.solution,
              context: { id: node.context.solutionId! },
            },
          ],
          'tasksol'
        )}
        {license && <div className="px-side">{license}</div>}
        {node.context.solutionId && (
          <Lazy>
            <CommentAreaEntity entityId={node.context.solutionId} />
          </Lazy>
        )}
      </div>
    )
  }

  function renderSolutionToggle() {
    if (
      (!node.solution.edtrState && !node.solution.legacy) ||
      node.solution.trashed
    )
      return null
    if (isPrintMode && !printModeSolutionVisible) return null

    return (
      <button
        className={clsx(
          'serlo-button-blue-transparent text-base',
          'ml-side mr-auto mb-4 pr-2',
          solutionVisible && 'bg-brand text-white'
        )}
        onClick={() => {
          setSolutionVisible(!solutionVisible)
        }}
      >
        <span className="w-3.5">{solutionVisible ? '▾' : '▸'}&nbsp;</span>
        {strings.entities.solution}{' '}
        {solutionVisible ? strings.content.hide : strings.content.show}
      </button>
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
            isRevisionView={isRevisionView}
          />
        )
      }
      if (state.interactive.plugin === 'inputExercise') {
        return (
          <InputExercise
            data={state.interactive.state}
            path={path}
            renderNested={renderNested}
            isRevisionView={isRevisionView}
          />
        )
      }
    }
  }

  function renderToolsButton() {
    if (isRevisionView) return null
    const ExerciseAuthorTools = loggedInComponents?.ExerciseAuthorTools
    return (
      <>
        {loaded && auth.current && ExerciseAuthorTools && (
          <ExerciseAuthorTools
            data={{
              type: ExerciseInlineType.Exercise,
              trashed: node.trashed,
              id: node.context.id,
              grouped: node.grouped,
              unrevisedRevisions: node.unrevisedRevisions,
            }}
          />
        )}
      </>
    )
  }

  function renderLicense() {
    if (!node.task.license) return null
    return (
      <LicenseNotice minimal data={node.task.license} type="task" path={path} />
    )
  }
}
