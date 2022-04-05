import {
  faArrowCircleRight,
  faArrowCircleUp,
} from '@fortawesome/free-solid-svg-icons'
import clsx from 'clsx'
import { MouseEvent } from 'react'

import { Link } from '../content/link'
import { FaIcon } from '../fa-icon'
import { useInstanceData } from '@/contexts/instance-context'
import { CoursePagesData } from '@/data-types'

export interface CourseFooterProps {
  onOverviewButtonClick: (e: MouseEvent<HTMLButtonElement>) => void
  index: number
  pages: CoursePagesData
}

export function CourseFooter({
  index,
  pages,
  onOverviewButtonClick,
}: CourseFooterProps) {
  const onOverviewClick = (e: MouseEvent<HTMLButtonElement>) => {
    location.href = '#course-overview'
    onOverviewButtonClick(e)
  }
  const previousIndex = index - 1
  const nextIndex = index + 1
  const previousHref = pages[previousIndex]?.url
  const nextHref = pages[nextIndex]?.url

  const { strings } = useInstanceData()

  return (
    <nav className="mt-10 mb-8 py-5 bg-brand-50 sm:bg-white flex justify-between align-top">
      {previousHref && (
        <Link
          href={previousHref}
          path={['courseback']}
          className="serlo-button serlo-make-interactive-light mx-side hover:no-underline h-fit"
        >
          <FaIcon icon={faArrowCircleRight} className="-scale-x-100" />{' '}
          {strings.course.back}
        </Link>
      )}
      {nextHref ? (
        <Link
          href={nextHref}
          path={['coursenext']}
          className="ml-auto mr-side text-right hover:no-underline"
        >
          <button className="serlo-button serlo-make-interactive-primary hover:no-underline mb-2">
            <FaIcon icon={faArrowCircleRight} /> {strings.course.next}
          </button>
          <div className="flex text-lg">
            <b
              className={clsx(
                'text-center text-xs leading-tight text-brand bg-brand-150',
                'rounded-full pt-0.25 w-4 h-4 mt-1.5 mr-1.5'
              )}
            >
              {nextIndex + 1}
            </b>{' '}
            {pages[nextIndex].title}
          </div>
        </Link>
      ) : (
        <button
          className="serlo-button serlo-make-interactive-primary mx-side"
          onClick={onOverviewClick}
        >
          <FaIcon icon={faArrowCircleUp} /> {strings.course.showPages}
        </button>
      )}
    </nav>
  )
}
