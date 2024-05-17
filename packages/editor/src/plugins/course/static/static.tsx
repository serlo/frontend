import { StaticRenderer } from '@editor/static-renderer/static-renderer'
import { EditorCourseDocument } from '@editor/types/editor-plugins'
import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useState, MouseEvent } from 'react'

import { CourseFooter } from './course-footer'
import { CourseNavigation } from './course-navigation'
import { InfoPanel } from '@/components/info-panel'
import { useInstanceData } from '@/contexts/instance-context'
import { useEntityData } from '@/contexts/serlo-entity-context'
import { cn } from '@/helper/cn'

export function CourseStaticRenderer({ state }: EditorCourseDocument) {
  const { pages } = state
  const router = useRouter()
  const queryPageId = router.query.page ? String(router.query.page) : undefined
  const { title: courseTitle } = useEntityData()
  // courseNav: start opened when only some entries
  const [courseNavOpen, setCourseNavOpen] = useState(pages.length < 4 ?? false)
  const { strings } = useInstanceData()

  const activePageIndex = queryPageId
    ? pages.findIndex((page) => page.id.startsWith(queryPageId)) ?? 0
    : 0
  const activePage = pages.at(activePageIndex)

  const openCourseNav = (e?: MouseEvent) => {
    e?.preventDefault()
    setCourseNavOpen(!courseNavOpen)
  }

  return (
    <>
      {/* TODO: Check in preview what title is displayed without js active */}
      <Head>
        <title>
          {activePage?.title} ({courseTitle})
        </title>
      </Head>
      <CourseNavigation {...state} activePageId={activePage?.id} />

      {pages.length ? (
        <>
          {renderCoursePageTitle()}
          <StaticRenderer document={activePage?.content} />
          <CourseFooter
            pages={pages}
            onOverviewButtonClick={openCourseNav}
            activePageIndex={activePageIndex}
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
