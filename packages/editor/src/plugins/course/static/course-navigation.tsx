import { EditorCourseDocument } from '@editor/types/editor-plugins'
import { useRouter } from 'next/router'

import { CourseNavigationRenderer } from '../renderer/course-navigation'
import { cn } from '@/helper/cn'

export function CourseNavigation({
  pages,
  activePageId,
  courseNavOpen,
  setCourseNavOpen,
  pageUrls,
}: {
  pages: EditorCourseDocument['state']['pages']
  activePageId?: string
  courseNavOpen: boolean
  setCourseNavOpen: (open: boolean) => void
  pageUrls?: string[]
}) {
  const router = useRouter()
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

        return {
          key: id + title,
          element: (
            <a
              className={cn(
                'serlo-link text-lg leading-browser',
                active && 'font-semibold text-almost-black hover:no-underline'
              )}
              href={href}
              onClick={(e) => {
                e.preventDefault()
                if (!href) return
                void router.push(href, undefined, { shallow: true })
                setTimeout(() => {
                  document.title = title
                }, 100)
              }}
            >
              {title}
            </a>
          ),
        }
      })}
    />
  )
}
