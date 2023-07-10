import dynamic from 'next/dynamic'
import { useState, useEffect } from 'react'

import { ExerciseNumbering } from './exercise-numbering'
import { InputExercise } from './input-exercise'
import { ScMcExercise } from './sc-mc-exercise'
import { Solution } from './solution'
import { useAuthentication } from '@/auth/use-authentication'
import type { MoreAuthorToolsProps } from '@/components/user-tools/foldout-author-menus/more-author-tools'
import { ExerciseInlineType } from '@/data-types'
import { FrontendExerciseNode } from '@/frontend-node-types'
import type { NodePath, RenderNestedFunction } from '@/schema/article-renderer'
import { H5pRenderer } from '@/serlo-editor/plugins/h5p/renderer'

export interface ExerciseProps {
  node: FrontendExerciseNode
  renderNested: RenderNestedFunction
  path?: NodePath
}

const AuthorToolsExercises = dynamic<MoreAuthorToolsProps>(() =>
  import(
    '@/components/user-tools/foldout-author-menus/author-tools-exercises'
  ).then((mod) => mod.AuthorToolsExercises)
)

export function Exercise({ node, renderNested, path }: ExerciseProps) {
  const auth = useAuthentication()
  const [loaded, setLoaded] = useState(false)
  useEffect(() => setLoaded(true), [])

  const isRevisionView =
    path && typeof path[0] === 'string' && path[0].startsWith('revision')

  if (node.grouped)
    return (
      <li className="serlo-exercise-wrapper serlo-grouped-exercise-wrapper">
        {renderExerciseContent()}
      </li>
    )

  return (
    <div className="serlo-exercise-wrapper mb-10 pt-2">
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
          <div className="w-full">{renderExerciseTask()}</div>
          {renderToolsButton()}
        </div>
        {renderInteractive()}
        <Solution node={node} loaded={loaded} renderNested={renderNested} />
      </>
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
              node.positionOnPage ? node.positionOnPage : node.context.id
            }-${
              node.positionInGroup ? node.positionInGroup : path?.join('') ?? ''
            }-`}
            renderNested={renderNested}
            isRevisionView={isRevisionView}
            context={{
              entityId: node.context.id,
              revisionId: node.context.revisionId,
            }}
          />
        )
      }
      if (state.interactive.plugin === 'inputExercise') {
        return (
          <InputExercise
            data={state.interactive.state}
            renderNested={renderNested}
            isRevisionView={isRevisionView}
            context={{
              entityId: node.context.id,
              revisionId: node.context.revisionId,
            }}
          />
        )
      }
      if (state.interactive.plugin === 'h5p') {
        return (
          <H5pRenderer
            url={state.interactive.state}
            context={{
              entityId: node.context.id,
              revisionId: node.context.revisionId,
            }}
          />
        )
      }
    }
  }

  function renderToolsButton() {
    if (isRevisionView) return null
    return (
      <>
        {loaded && auth && (
          <AuthorToolsExercises
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
}
