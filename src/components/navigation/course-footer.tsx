import {
  faArrowCircleRight,
  faArrowCircleUp,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import * as React from 'react'

import { Link } from '../content/link'
import { useInstanceData } from '@/contexts/instance-context'

export interface CourseFooterProps extends CourseFooterData {
  onOverviewButtonClick: (e: React.MouseEvent<HTMLButtonElement>) => void
  nextHref: string
}

export interface CourseFooterData {
  nextHref: string
}

export function CourseFooter({
  nextHref,
  onOverviewButtonClick,
}: CourseFooterProps) {
  const onOverviewClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    location.href = '#course-overview'
    onOverviewButtonClick(e)
  }

  const { strings } = useInstanceData()

  return (
    <nav className="mt-10 mb-8 py-5 bg-brand-50 sm:bg-white">
      {nextHref ? (
        <Link
          href={nextHref}
          path={['coursenext']}
          className="serlo-button serlo-make-interactive-primary mx-side hover:no-underline"
        >
          <FontAwesomeIcon icon={faArrowCircleRight} /> {strings.course.next}
        </Link>
      ) : (
        <button
          className="serlo-button serlo-make-interactive-primary mx-side"
          onClick={onOverviewClick}
        >
          <FontAwesomeIcon icon={faArrowCircleUp} /> {strings.course.showPages}
        </button>
      )}
    </nav>
  )
}
