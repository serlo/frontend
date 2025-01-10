import { FaIcon } from '@editor/editor-ui/fa-icon'
import { useStaticStrings } from '@editor/i18n/static-strings-provider'
import { SerloOnlyFeaturesContext } from '@editor/package'
import { StaticRenderer } from '@editor/static-renderer/static-renderer'
import { EditorCourseDocument } from '@editor/types/editor-plugins'
import { cn } from '@editor/utils/cn'
import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons'
import { useState, MouseEvent, useContext } from 'react'

import { CourseFooter } from './course-footer'
import { CourseNavigation } from './course-navigation'
import { getCoursePageIdFromPath } from '../helper/get-course-id-from-path'

export function CourseStaticRenderer({
  state,
  serloContext,
}: EditorCourseDocument) {
  const { pages } = state

  const courseStrings = useStaticStrings().plugins.course
  const { isRevisionView } = useContext(SerloOnlyFeaturesContext)

  let asPath = ''
  if (typeof window !== 'undefined') {
    asPath =
      window.location.pathname + window.location.search + window.location.hash
  }
  const routerCourseId = getCoursePageIdFromPath(asPath)
  const queryPageId = routerCourseId ?? serloContext?.activeCoursePageId
  // load nav opened when only some entries
  const [courseNavOpen, setCourseNavOpen] = useState(
    pages.length < 4 || (isRevisionView ?? false)
  )

  const activePageIndex = queryPageId
    ? Math.max(
        pages.findIndex((page) => page.id.startsWith(queryPageId)),
        0
      )
    : 0
  const activePage = pages.at(activePageIndex)

  const openCourseNav = (e?: MouseEvent) => {
    e?.preventDefault()
    setCourseNavOpen(true)
  }

  const pageUrls = serloContext?.coursePageUrls
    ? serloContext.coursePageUrls
    : isRevisionView
      ? pages.map(({ id }) => `#${id.split('-')[0]}`)
      : undefined

  return (
    <>
      {pages.length ? null : (
        <div className="my-12 rounded-2xl bg-orange-200 p-4 font-bold">
          <FaIcon icon={faExclamationCircle} />
          {courseStrings.noPagesWarning}
        </div>
      )}
      <CourseNavigation
        {...state}
        activePageId={activePage?.id}
        courseNavOpen={courseNavOpen}
        setCourseNavOpen={setCourseNavOpen}
        pageUrls={pageUrls}
      />

      {pages.length ? (
        <>
          {renderCoursePageTitle()}
          <StaticRenderer document={activePage?.content} />
          <CourseFooter
            pages={pages}
            onOverviewButtonClick={openCourseNav}
            activePageIndex={activePageIndex}
            pageUrls={serloContext?.coursePageUrls}
          />
        </>
      ) : null}
    </>
  )

  function renderCoursePageTitle() {
    return (
      <h1 className="serlo-h1 mt-12" itemProp="name" id="course-title">
        <span
          className={cn(`
          -mt-1.5 mr-1.5 inline-block h-7 w-7 justify-center rounded-full
          bg-brand-200 text-center align-middle text-xl font-bold text-brand
        `)}
        >
          {activePageIndex + 1}
        </span>
        {activePage?.title}
      </h1>
    )
  }
}
