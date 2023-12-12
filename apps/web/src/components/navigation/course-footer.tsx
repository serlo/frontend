import {
  faArrowCircleRight,
  faArrowCircleUp,
} from '@fortawesome/free-solid-svg-icons'
import { cn } from '@serlo/tailwind/helper/cn'
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
      <nav className="mb-8 mt-10 flex justify-between bg-brand-50 py-5 align-top sm:bg-white">
        {previousHref && (
          <Link
            href={previousHref}
            className="serlo-button-light mx-side h-fit hover:no-underline"
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
            <div className="serlo-button-blue mb-2 hover:no-underline">
              <FaIcon icon={faArrowCircleRight} /> {strings.course.next}
            </div>
            <div className="flex text-lg">
              <b
                className={cn(`
                  mr-1.5 mt-1.5 h-4 w-4 rounded-full
                  bg-brand-200 pt-0.25 text-center text-xs leading-tight text-brand
                `)}
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
