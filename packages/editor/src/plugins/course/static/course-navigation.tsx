import { EditorCourseDocument } from '@editor/types/editor-plugins'
import { cn } from '@editor/utils/cn'

import { type DummyNextRouter } from './static'
import { CourseNavigationRenderer } from '../renderer/course-navigation'

export function CourseNavigation({
  pages,
  activePageId,
  courseNavOpen,
  setCourseNavOpen,
  pageUrls,
  router,
}: {
  pages: EditorCourseDocument['state']['pages']
  activePageId?: string
  courseNavOpen: boolean
  setCourseNavOpen: (open: boolean) => void
  pageUrls?: string[]
  router: DummyNextRouter
}) {
  if (!pages) return null

  const toggleCourseNav = () => setCourseNavOpen(!courseNavOpen)

  return (
    <CourseNavigationRenderer
      open={courseNavOpen}
      onOverviewButtonClick={toggleCourseNav}
      pages={pages.map(({ id: rawId, title }, index) => {
        const id = rawId.split('-')[0]
        const active = activePageId && activePageId.startsWith(id)
        const href = active ? undefined : pageUrls?.[index]

        function handleClick(e: React.MouseEvent) {
          e.preventDefault()
          if (!href) return
          void router.push(href, undefined, { shallow: true })
          setTimeout(() => {
            document.title = title
          }, 100)
        }

        return {
          key: id + title,
          element: (
            <a
              className={cn(
                'serlo-link text-lg leading-browser',
                active && 'font-semibold text-almost-black hover:no-underline'
              )}
              href={href}
              onClick={handleClick}
            >
              {title}
            </a>
          ),
        }
      })}
    />
  )
}
