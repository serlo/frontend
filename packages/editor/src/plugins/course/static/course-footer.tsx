import { FaIcon } from '@editor/editor-ui/fa-icon'
import { EditorCourseDocument } from '@editor/types/editor-plugins'
import { cn } from '@editor/utils/cn'
import { useInstanceData } from '@editor/utils/use-instance-data'
import {
  faArrowCircleRight,
  faArrowCircleUp,
} from '@fortawesome/free-solid-svg-icons'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { MouseEvent } from 'react'

import { scrollIfNeeded } from '@/helper/scroll'

export function CourseFooter({
  activePageIndex: index,
  pages,
  onOverviewButtonClick,
  pageUrls,
}: {
  activePageIndex: number
  pages: EditorCourseDocument['state']['pages']
  onOverviewButtonClick: (e: MouseEvent<HTMLButtonElement>) => void
  pageUrls?: string[]
}) {
  const onOverviewClick = (e: MouseEvent<HTMLButtonElement>) => {
    location.href = '#course-overview'
    onOverviewButtonClick(e)
  }
  const router = useRouter()
  const previousIndex = index - 1
  const nextIndex = index + 1
  const previousPage = pages[previousIndex]
  const nextPage = pages[nextIndex]
  const previousHref = previousPage ? pageUrls?.[previousIndex] : undefined
  const nextHref = nextPage ? pageUrls?.[nextIndex] : undefined

  const { strings } = useInstanceData()

  function navigate(toPath: string, newIndex: number) {
    void router.push(toPath, undefined, { shallow: true })
    scrollIfNeeded(document.querySelector('#course-title'))

    void router.push(toPath, undefined, { shallow: true })
    setTimeout(() => {
      document.title = pages[newIndex].title
    }, 100)
  }

  return (
    <>
      <Head>
        {previousHref ? <link rel="prev" href={previousHref} /> : null}
        {nextHref ? <link rel="next" href={nextHref} /> : null}
      </Head>
      <nav className="mb-8 mt-10 flex justify-between bg-brand-50 py-5 align-top sm:bg-white">
        {previousHref ? (
          <a
            href={previousHref}
            onClick={(e) => {
              e.preventDefault()
              navigate(previousHref, previousIndex)
            }}
            className="serlo-button-light mx-side h-fit hover:no-underline"
          >
            <FaIcon icon={faArrowCircleRight} className="-scale-x-100" />{' '}
            {strings.course.back}
          </a>
        ) : null}
        {nextHref ? (
          <a
            href={nextHref}
            onClick={(e) => {
              e.preventDefault()
              navigate(nextHref, nextIndex)
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
