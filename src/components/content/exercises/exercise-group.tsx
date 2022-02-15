import { ReactNode, useState, useEffect } from 'react'

import { ExerciseNumbering } from './exercise-numbering'
import { useAuthentication } from '@/auth/use-authentication'
import { useLoggedInComponents } from '@/contexts/logged-in-components'

export interface ExerciseGroupProps {
  children: ReactNode
  license: ReactNode
  groupIntro: ReactNode
  positionOnPage?: number
  id: number
  href?: string
  unrevisedRevisions?: number
}

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
  const loggedInComponents = useLoggedInComponents()
  const ExerciseAuthorTools = loggedInComponents?.ExerciseAuthorTools

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
          <div className="grow">{groupIntro}</div>
          <div>{license}</div>
          {loaded && auth.current && ExerciseAuthorTools && (
            <ExerciseAuthorTools
              data={{
                type: '_ExerciseGroupInline',
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
