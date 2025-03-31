import { FaIcon } from '@editor/editor-ui/fa-icon'
import { StaticRenderer } from '@editor/static-renderer/static-renderer'
import { EditorCourseDocument } from '@editor/types/editor-plugins'
import { cn } from '@editor/utils/cn'
import { faGraduationCap } from '@fortawesome/free-solid-svg-icons'

import { CourseFooter } from './course-footer'
import { CourseNavigation } from './course-navigation'

export type Page = EditorCourseDocument['state']['pages'][number]

export function CourseStaticRenderer({ state }: EditorCourseDocument) {
  const { pages } = state
  return (
    <>
      <div className="mb-24">
        <CourseNavigation pages={pages} />

        {pages.map((page, index) => {
          return (
            <div
              className="mt-24 flex min-h-[95vh] flex-col justify-between border-b-2 border-t-2 border-brand-200 pb-4 pt-10"
              key={page.id}
              id={page.id}
            >
              {renderCoursePageTitle(page, index)}
              <StaticRenderer document={page.content} />
              <CourseFooter index={index} pages={pages} />
            </div>
          )
        })}
      </div>
    </>
  )

  function renderCoursePageTitle(page: Page, index: number) {
    return (
      <h2 className="serlo-h1" itemProp="name" id={page.id}>
        <span
          className={cn(`
          -mt-1.5 mr-1.5 inline-block h-7 w-7 justify-center rounded-full
          bg-brand-200 text-center align-middle text-xl font-bold text-brand
        `)}
        >
          {index + 1}
        </span>{' '}
        {page.title}
      </h2>
    )
  }
}
