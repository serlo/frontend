import {
  faArrowCircleRight,
  faArrowCircleUp,
} from '@fortawesome/free-solid-svg-icons'
import clsx from 'clsx'
import Head from 'next/head'
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
    <>
      <Head>
        {previousHref ? <link rel="prev" href={previousHref} /> : null}
        {nextHref ? <link rel="next" href={nextHref} /> : null}
      </Head>
      <nav className="mt-10 mb-8 py-5 bg-brand-50 sm:bg-white flex justify-between align-top">
        {previousHref && (
          <Link
            href={previousHref}
            className="serlo-button-light mx-side hover:no-underline h-fit"
          >
            <FaIcon icon={faArrowCircleRight} className="-scale-x-100" />{' '}
            {strings.course.back}
          </Link>
        )}
        {nextHref ? (
          <Link
            href={nextHref}
            className="ml-auto mr-side text-right hover:no-underline"
          >
            <div className="serlo-button-blue hover:no-underline mb-2">
              <FaIcon icon={faArrowCircleRight} /> {strings.course.next}
            </div>
            <div className="flex text-lg">
              <b
                className={clsx(
                  'text-center text-xs leading-tight text-brand bg-brand-200',
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
            className="serlo-button-blue mx-side"
            onClick={onOverviewClick}
          >
            <FaIcon icon={faArrowCircleUp} /> {strings.course.showPages}
          </button>
        )}
      </nav>
    </>
  )
}
