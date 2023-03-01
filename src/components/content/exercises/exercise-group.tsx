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
      <div className="pt-2 mb-3">
        {positionOnPage !== undefined && (
          <ExerciseNumbering
            index={positionOnPage}
            href={href ? href : `/${id}`}
          />
        )}
        <div className="flex mb-0.5">
          {/* explicitly set flex element width to 100% to pass it down to children */}
          <div className="grow w-full">{groupIntro}</div>
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
      <ol
        className="pb-3.5 bg-white mb-2.5 ml-2 sm:pl-12"
        style={{ counterReset: 'exercises' }}
      >
        {children}
      </ol>
    </div>
  )
}
