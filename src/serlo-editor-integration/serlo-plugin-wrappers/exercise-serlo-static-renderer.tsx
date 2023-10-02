import dynamic from 'next/dynamic'
import { useEffect, useState } from 'react'

import type { EditorExercisePlugin } from '../types/editor-plugins'
import { useAuthentication } from '@/auth/use-authentication'
import { Lazy } from '@/components/content/lazy'
import type { MoreAuthorToolsProps } from '@/components/user-tools/foldout-author-menus/more-author-tools'
import { ExerciseInlineType } from '@/data-types'
import { ExerciseStaticRenderer } from '@/serlo-editor/plugins/exercise/static'

const AuthorToolsExercises = dynamic<MoreAuthorToolsProps>(() =>
  import(
    '@/components/user-tools/foldout-author-menus/author-tools-exercises'
  ).then((mod) => mod.AuthorToolsExercises)
)

// Special version for serlo.org with author tools and license
export function ExerciseSerloStaticRenderer(props: EditorExercisePlugin) {
  const auth = useAuthentication()
  const [loaded, setLoaded] = useState(false)
  useEffect(() => setLoaded(true), [])

  //TODO: if (isRevisionView) don't show

  // TODO: License

  const context = props.serloContext

  return (
    <div className="relative">
      {loaded && auth && context?.uuid ? (
        <Lazy>
          <div className="absolute -right-8 z-20">
            <AuthorToolsExercises
              data={{
                type: ExerciseInlineType.Exercise,
                id: context?.uuid,
                trashed: context?.trashed,
                grouped: context?.grouped,
                unrevisedRevisions: context?.unrevisedRevisions,
              }}
            />
          </div>
        </Lazy>
      ) : null}

      <ExerciseStaticRenderer {...props} />
    </div>
  )
}
