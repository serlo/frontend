import { EditorCourseDocument } from '@editor/types/editor-plugins'
import { useRouter } from 'next/router'
import { useState } from 'react'

import { CourseNavigationRenderer } from '../renderer/course-navigation'
import { cn } from '@/helper/cn'

export function CourseNavigation({
  pages,
  activePageId,
}: {
  pages: EditorCourseDocument['state']['pages']
  activePageId?: string
}) {
  const [courseNavOpen, setCourseNavOpen] = useState(pages?.length < 4)
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
        const url = active ? undefined : `?page=${id}`

        return {
          key: id + title,
          element: (
            <a
              className={cn(
                'serlo-link text-lg leading-browser',
                active && 'font-semibold text-almost-black hover:no-underline'
              )}
              href={active ? undefined : url}
              onClick={(e) => {
                e.preventDefault()
                if (active) return

                const base = router.asPath.split('/').slice(0, -1).join('/')
                const slugTitle = title
                  .toLocaleLowerCase()
                  .replace(/['"`=+*&^%$#@!.<>?]/g, '')
                  .replace(/[[\]{}() ,;:/|-]+/g, '-')
                void router.push(`${base}/${id}-${slugTitle}`, undefined, {
                  shallow: true,
                })
                setTimeout(() => setCourseNavOpen(false), 100)
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
