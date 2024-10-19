import { FaIcon } from '@editor/editor-ui/fa-icon'
import { useStaticStrings } from '@editor/i18n/static-strings-provider'
import { EditorCourseDocument } from '@editor/types/editor-plugins'
import { cn } from '@editor/utils/cn'
import { scrollIfNeeded } from '@editor/utils/scroll'
import {
  faArrowCircleRight,
  faArrowCircleUp,
} from '@fortawesome/free-solid-svg-icons'
import { MouseEvent } from 'react'

import { type DummyNextRouter } from './static'

export function CourseFooter({
  activePageIndex: index,
  pages,
  onOverviewButtonClick,
  pageUrls,
  router,
}: {
  activePageIndex: number
  pages: EditorCourseDocument['state']['pages']
  onOverviewButtonClick: (e: MouseEvent<HTMLButtonElement>) => void
  pageUrls?: string[]
  router: DummyNextRouter
}) {
  const onOverviewClick = (e: MouseEvent<HTMLButtonElement>) => {
    location.href = '#course-overview'
    onOverviewButtonClick(e)
  }
  const previousIndex = index - 1
  const nextIndex = index + 1
  const previousPage = pages[previousIndex]
  const nextPage = pages[nextIndex]
  const previousHref = previousPage ? pageUrls?.[previousIndex] : undefined
  const nextHref = nextPage ? pageUrls?.[nextIndex] : undefined

  const courseStrings = useStaticStrings().plugins.course

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
            {courseStrings.back}
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
              <FaIcon icon={faArrowCircleRight} /> {courseStrings.next}
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
            <FaIcon icon={faArrowCircleUp} /> {courseStrings.showPages}
          </button>
        )}
      </nav>
    </>
  )
}
