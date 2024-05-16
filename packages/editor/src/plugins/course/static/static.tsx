import { StaticRenderer } from '@editor/static-renderer/static-renderer'
import { EditorCourseDocument } from '@editor/types/editor-plugins'
import { isRowsDocument } from '@editor/types/plugin-type-guards'
import { useRouter } from 'next/router'
import { useState, MouseEvent } from 'react'

import { CourseFooter } from './course-footer'
import { CourseNavigation } from './course-navigation'
import { isEmptyTextDocument } from '../../text/utils/static-is-empty'
import { cn } from '@/helper/cn'

export function CourseStaticRenderer({ state }: EditorCourseDocument) {
  const { content, pages } = state
  const router = useRouter()
  const queryPageId = router.query.page ? String(router.query.page) : undefined

  // courseNav: start opened when only some entries
  const [courseNavOpen, setCourseNavOpen] = useState(pages.length < 4 ?? false)

  const isEmptyContent =
    !content ||
    (isRowsDocument(content) &&
      content.state.length === 1 &&
      isEmptyTextDocument(content.state[0]))

  const activePageIndex = queryPageId
    ? pages.findIndex((page) => page.id.startsWith(queryPageId)) ?? 0
    : 0
  const activePage = pages[activePageIndex]

  if (!activePage) return null

  const openCourseNav = (e?: MouseEvent) => {
    e?.preventDefault()
    setCourseNavOpen(!courseNavOpen)
  }

  return (
    <>
      <CourseNavigation {...state} activePageId={activePage.id} />
      {isEmptyContent ? (
        <div className="mt-6"></div>
      ) : (
        <StaticRenderer document={content} />
      )}
      {/* renderNoCoursePages */}
      {renderCoursePageTitle()}
      <StaticRenderer document={activePage?.content} />
      <CourseFooter
        pages={pages}
        onOverviewButtonClick={openCourseNav}
        activePageIndex={activePageIndex}
      />
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
        {activePage.title}
      </h1>
    )
  }
}
