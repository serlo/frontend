import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'

import { ExerciseNumbering } from './exercise-numbering'
import { InputExercise } from './input-exercise'
import { ScMcExercise } from './sc-mc-exercise'
import { Solution } from './solution'
import { useAuthentication } from '@/auth/use-authentication'
import type { MoreAuthorToolsProps } from '@/components/user-tools/foldout-author-menus/more-author-tools'
import { useAB } from '@/contexts/ab'
import { ExerciseInlineType } from '@/data-types'
import type { FrontendExerciseNode } from '@/frontend-node-types'
import { exerciseSubmission } from '@/helper/exercise-submission'
import type { NodePath, RenderNestedFunction } from '@/schema/article-renderer'
import { H5pRenderer, parseH5pUrl } from '@/serlo-editor/plugins/h5p/renderer'
import { EditorPluginType } from '@/serlo-editor-integration/types/editor-plugin-type'

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
  const { asPath } = useRouter()
  const ab = useAB()

  useEffect(() => {
    if (!node.task.content) return
    const interactive = node.task.content.interactive
    if (!interactive || interactive.plugin !== EditorPluginType.H5p) return

    const id = parseH5pUrl(interactive.state)
    const handleSubmissionEvent = (e: Event) => {
      const e_id = (e as CustomEvent).detail as string

      if (e_id === id) {
        exerciseSubmission(
          {
            path: asPath,
            entityId: node.context.id,
            revisionId: node.context.revisionId,
            result: e.type === 'h5pExerciseCorrect' ? 'correct' : 'wrong',
            type: 'h5p',
          },
          ab
        )
      }
    }

    const { body } = window.document
    body.addEventListener('h5pExerciseCorrect', handleSubmissionEvent)
    body.addEventListener('h5pExerciseWrong', handleSubmissionEvent)

    return () => {
      // Unbind the event listener on clean up
      body.removeEventListener('h5pExerciseCorrect', handleSubmissionEvent)
      body.removeEventListener('h5pExerciseWrong', handleSubmissionEvent)
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

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
    if (node.task.content) {
      return renderNested(node.task.content.content, 'task')
    }
    return null
  }

  function renderInteractive() {
    if (!node.task.content) return null

    const state = node.task.content

    if (state.interactive) {
      if (state.interactive.plugin === EditorPluginType.ScMcExercise) {
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
      if (state.interactive.plugin === EditorPluginType.InputExercise) {
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
      if (state.interactive.plugin === EditorPluginType.H5p) {
        return <H5pRenderer url={state.interactive.state} />
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
