import dynamic from 'next/dynamic'
import { useEffect, useState } from 'react'

import type { EditorSolutionPlugin } from '../types/editor-plugins'
import { useAuthentication } from '@/auth/use-authentication'
import type { CommentAreaEntityProps } from '@/components/comments/comment-area-entity'
import { Lazy } from '@/components/content/lazy'
import type { MoreAuthorToolsProps } from '@/components/user-tools/foldout-author-menus/more-author-tools'
import { ExerciseInlineType } from '@/data-types'
import { StaticSolutionRenderer } from '@/serlo-editor/plugins/solution/static'

const AuthorToolsExercises = dynamic<MoreAuthorToolsProps>(() =>
  import(
    '@/components/user-tools/foldout-author-menus/author-tools-exercises'
  ).then((mod) => mod.AuthorToolsExercises)
)
const CommentAreaEntity = dynamic<CommentAreaEntityProps>(() =>
  import('@/components/comments/comment-area-entity').then(
    (mod) => mod.CommentAreaEntity
  )
)

// Special version for serlo.org with author tools and license
export function SolutionSerloStaticRenderer(props: EditorSolutionPlugin) {
  const auth = useAuthentication()
  const [loaded, setLoaded] = useState(false)
  useEffect(() => setLoaded(true), [])

  // TODO: License

  const context = props.serloContext

  return (
    <div className="relative">
      {/* TODO: if (isRevisionView) don't show AuthorTools and Comments*/}
      <StaticSolutionRenderer
        beforeSlot={
          loaded && auth && context?.uuid ? (
            <Lazy>
              <div className="absolute -right-8 top-0 z-20">
                <AuthorToolsExercises
                  data={{
                    type: ExerciseInlineType.Solution,
                    id: context?.uuid,
                    parentId: context?.exerciseId,
                    trashed: context?.trashed,
                    unrevisedRevisions: context?.unrevisedRevisions,
                  }}
                />
              </div>
            </Lazy>
          ) : null
        }
        // TODO: check how this was set before
        solutionVisibleOnInit={false}
        {...props}
        afterSlot={
          context?.uuid ? (
            <Lazy>
              <CommentAreaEntity entityId={context.uuid} />
            </Lazy>
          ) : null
        }
      />
    </div>
  )
}
