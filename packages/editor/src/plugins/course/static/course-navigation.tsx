import { EditorCourseDocument } from '@editor/types/editor-plugins'
import { useRouter } from 'next/router'

import { buildNewPathWithCourseId } from '../helper/get-course-id-from-path'
import { CourseNavigationRenderer } from '../renderer/course-navigation'
import { cn } from '@/helper/cn'

export function CourseNavigation({
  pages,
  activePageId,
  courseNavOpen,
  setCourseNavOpen,
}: {
  pages: EditorCourseDocument['state']['pages']
  activePageId?: string
  courseNavOpen: boolean
  setCourseNavOpen: (open: boolean) => void
}) {
  const router = useRouter()
  if (!pages) return null

  const toggleCourseNav = () => setCourseNavOpen(!courseNavOpen)

  return (
    <CourseNavigationRenderer
      open={courseNavOpen}
      onOverviewButtonClick={toggleCourseNav}
      pages={pages.map(({ id: rawId, title }) => {
        const id = rawId.split('-')[0]
        const active = activePageId && activePageId.startsWith(id)
        const href = active ? undefined : `?page=${id}`

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
                if (active) return

                const newPath = buildNewPathWithCourseId(
                  router.asPath,
                  title,
                  id
                )
                void router.push(newPath, undefined, {
                  shallow: true,
                })
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
