import { StaticRenderer } from '@editor/static-renderer/static-renderer'
import { EditorCourseDocument } from '@editor/types/editor-plugins'
import { cn } from '@editor/utils/cn'

import { CourseNavigationRenderer } from './renderer/course-navigation-renderer'
import { CoursePagesRenderer } from './renderer/course-pages-renderer'

export type Page = EditorCourseDocument['state']['pages'][number]

export function CourseStaticRenderer({ state }: EditorCourseDocument) {
  const { pages } = state
  return (
    <>
      <div className="mb-24">
        {pages ? (
          <CourseNavigationRenderer
            pages={pages.map(({ id, title }) => ({ id, title }))}
          />
        ) : null}

        <CoursePagesRenderer
          pages={pages.map((page, index) => {
            return {
              id: page.id,
              title: page.title,
              titleElement: renderCoursePageTitle(page, index),
              contentElement: <StaticRenderer document={page.content} />,
            }
          })}
        />
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
