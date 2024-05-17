import { EditorCourseDocument } from '@editor/types/editor-plugins'
import {
  faArrowCircleRight,
  faArrowCircleUp,
} from '@fortawesome/free-solid-svg-icons'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { MouseEvent } from 'react'

import { FaIcon } from '@/components/fa-icon'
import { useInstanceData } from '@/contexts/instance-context'
import { useEntityData } from '@/contexts/serlo-entity-context'
import { cn } from '@/helper/cn'
import { scrollIfNeeded } from '@/helper/scroll'

export interface CourseFooterProps {
  activePageIndex: number
  pages: EditorCourseDocument['state']['pages']
  onOverviewButtonClick: (e: MouseEvent<HTMLButtonElement>) => void
}

export function CourseFooter({
  activePageIndex: index,
  pages,
  onOverviewButtonClick,
}: CourseFooterProps) {
  const onOverviewClick = (e: MouseEvent<HTMLButtonElement>) => {
    location.href = '#course-overview'
    onOverviewButtonClick(e)
  }
  const router = useRouter()
  const { entityId } = useEntityData()
  const previousIndex = index - 1
  const nextIndex = index + 1
  const previousPage = pages[previousIndex]
  const nextPage = pages[nextIndex]
  const previousHref = previousPage ? `?page=${previousPage.id}` : undefined
  const nextHref = nextPage ? `?page=${nextPage.id}` : undefined

  const { strings } = useInstanceData()

  function navigate(pageId: string) {
    // find a way to use alias or current path here
    void router.push(`/${entityId}?page=${pageId}`, undefined, {
      shallow: true,
    })
    scrollIfNeeded(document.querySelector('#course-title'))
  }

  return (
    <>
      <Head>
        {previousHref ? <link rel="prev" href={previousHref} /> : null}
        {nextHref ? <link rel="next" href={nextHref} /> : null}
      </Head>
      <nav className="mb-8 mt-10 flex justify-between bg-brand-50 py-5 align-top sm:bg-white">
        {previousPage && (
          <a
            href={previousHref}
            onClick={(e) => {
              e.preventDefault()
              navigate(previousPage.id)
            }}
            className="serlo-button-light mx-side h-fit hover:no-underline"
          >
            <FaIcon icon={faArrowCircleRight} className="-scale-x-100" />{' '}
            {strings.course.back}
          </a>
        )}
        {nextHref ? (
          <a
            href={nextHref}
            onClick={(e) => {
              e.preventDefault()
              navigate(nextPage.id)
            }}
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
              {nextPage.title}
            </div>
          </a>
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