import { StaticRenderer } from '@editor/static-renderer/static-renderer'
import { EditorCourseDocument } from '@editor/types/editor-plugins'
import { cn } from '@editor/utils/cn'
import { useInstanceData } from '@editor/utils/use-instance-data'
import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons'
import { useRouter } from 'next/router'
import { useState, MouseEvent, useContext } from 'react'

import { CourseFooter } from './course-footer'
import { CourseNavigation } from './course-navigation'
import { getCoursePageIdFromPath } from '../helper/get-course-id-from-path'
import { InfoPanel } from '@/components/info-panel'
import { RevisionViewContext } from '@/contexts/revision-view-context'

export function CourseStaticRenderer({
  state,
  serloContext,
}: EditorCourseDocument) {
  const { pages } = state
  const router = useRouter()
  const routerCourseId = getCoursePageIdFromPath(router.asPath)
  const queryPageId = routerCourseId ?? serloContext?.activeCoursePageId
  // load nav opened when only some entries
  const isRevisionView = useContext(RevisionViewContext)
  const [courseNavOpen, setCourseNavOpen] = useState(
    pages.length < 4 || (isRevisionView ?? false)
  )
  const { strings } = useInstanceData()

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
      ) : (
        <InfoPanel icon={faExclamationCircle} type="warning" doNotIndex>
          {strings.course.noPagesWarning}
        </InfoPanel>
      )}
    </>
  )

  function renderCoursePageTitle() {
    return (
      <h1 className="serlo-h1 mt-12" itemProp="name" id="course-title">
        <span
          className={cn(`
          -mt-1.5 mr-1.5 inline-block h-7 w-7
          justify-center rounded-full bg-brand-200 text-center align-middle
          text-xl font-bold text-brand
        `)}
        >
          {activePageIndex + 1}
        </span>
        {activePage?.title}
      </h1>
    )
  }
}
