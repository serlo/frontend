import dynamic from 'next/dynamic'
import { ReactNode, useState, useEffect } from 'react'

import { ExerciseNumbering } from './exercise-numbering'
import { useAuthentication } from '@/auth/use-authentication'
import type { MoreAuthorToolsProps } from '@/components/user-tools/foldout-author-menus/more-author-tools'
import { ExerciseInlineType } from '@/data-types'

export interface ExerciseGroupProps {
  children: ReactNode
  license: ReactNode
  groupIntro: ReactNode
  positionOnPage?: number
  id: number
  href?: string
  unrevisedRevisions?: number
}

const AuthorToolsExercises = dynamic<MoreAuthorToolsProps>(() =>
  import(
    '@/components/user-tools/foldout-author-menus/author-tools-exercises'
  ).then((mod) => mod.AuthorToolsExercises)
)

export function ExerciseGroup({
  children,
  license,
  groupIntro,
  positionOnPage,
  id,
  href,
  unrevisedRevisions,
}: ExerciseGroupProps) {
  const [loaded, setLoaded] = useState(false)
  useEffect(() => {
    setLoaded(true)
  }, [])
  const auth = useAuthentication()

  return (
    <div className="pt-1">
      <div className="mb-3 pt-2">
        {positionOnPage !== undefined && (
          <ExerciseNumbering
            index={positionOnPage}
            href={href ? href : `/${id}`}
          />
        )}
        <div className="mb-0.5 flex">
          {/* explicitly set flex element width to 100% to pass it down to children */}
          <div className="w-full grow">{groupIntro}</div>
          <div>{license}</div>
          {loaded && auth && (
            <AuthorToolsExercises
              data={{
                type: ExerciseInlineType.ExerciseGroup,
                id,
                unrevisedRevisions,
              }}
            />
          )}
        </div>
      </div>
      <ol className="mb-2.5 ml-2 bg-white pb-3.5 [counter-reset:exercises] sm:pl-12">
        {children}
      </ol>
    </div>
  )
}
