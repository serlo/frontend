import clsx from 'clsx'
import dynamic from 'next/dynamic'
import { useState, useEffect } from 'react'

import { LicenseNotice } from '../license-notice'
import { ExerciseNumbering } from './exercise-numbering'
import { InputExercise } from './input-exercise'
import { ScMcExercise } from './sc-mc-exercise'
import { useAuthentication } from '@/auth/use-authentication'
import { CommentAreaProps } from '@/components/comments/comment-area'
import { useInstanceData } from '@/contexts/instance-context'
import { useLoggedInComponents } from '@/contexts/logged-in-components'
import { FrontendExerciseNode } from '@/data-types'
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

      <div className="flex justify-between">
        {renderExerciseTask()}
        {renderToolsButton()}
      </div>

      {renderInteractive()}
      <div className="flex">
        {renderSolutionToggle()}
        {renderLicense()}
      </div>

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
        {authorTools && <div className="text-right -mt-2">{authorTools}</div>}
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
        {license && <div className="px-side">{license}</div>}
        <CommentArea id={node.context.solutionId!} />
      </div>
    )
  }

  function renderSolutionToggle() {
    if (!node.solution.edtrState && !node.solution.legacy) return null

    return (
      <button
        className={clsx(
          'serlo-button serlo-make-interactive-transparent-blue text-base',
          'ml-side mr-auto mb-4 pr-2',
          solutionVisible && 'bg-brand text-white'
        )}
        onClick={() => {
          if (!solutionVisible) {
            submitEventWithPath('opensolution', path)
          }
          setVisible(!solutionVisible)
        }}
        onPointerUp={(e) => e.currentTarget.blur()} //hack, use https://caniuse.com/#feat=css-focus-visible when supported
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

  function renderToolsButton() {
    const Comp = lic?.ExerciseAuthorTools
    return (
      <>
        {loaded && auth.current && Comp && (
          <Comp data={{ type: '_ExerciseInline', id: node.context.id }} />
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
