import { EditorCourseDocument } from '@editor/types/editor-plugins'

import { CourseNavigationRenderer } from '../renderer/course-navigation'

export function CourseNavigation({
  pages,
}: {
  pages: EditorCourseDocument['state']['pages']
}) {
  if (!pages) return null

  return (
    <CourseNavigationRenderer
      pages={pages.map(({ id, title }) => {
        return {
          key: id,
          element: (
            <a className="serlo-link text-lg leading-browser" href={`#${id}`}>
              {title}
            </a>
          ),
        }
      })}
    />
  )
}
