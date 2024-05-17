import { EditorCourseDocument } from '@editor/types/editor-plugins'
import { useRouter } from 'next/router'
import { useState, MouseEvent } from 'react'

import { CourseNavigationRenderer } from '../renderer/course-navigation'
import { useEntityData } from '@/contexts/serlo-entity-context'
import { cn } from '@/helper/cn'

export function CourseNavigation({
  pages,
  activePageId,
}: {
  pages: EditorCourseDocument['state']['pages']
  activePageId?: string
}) {
  const [courseNavOpen, setCourseNavOpen] = useState(pages?.length < 4)
  const { title, entityId } = useEntityData()
  const router = useRouter()
  if (!pages) return null

  const openCourseNav = (e?: MouseEvent) => {
    e?.preventDefault()
    setCourseNavOpen(!courseNavOpen)
  }

  return (
    <CourseNavigationRenderer
      open={courseNavOpen}
      onOverviewButtonClick={openCourseNav}
      title={title ?? ''}
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
                // find a way to use alias or current path here
                void router.push(`/${entityId}?page=${id}`, undefined, {
                  shallow: true,
                })
                setTimeout(() => {
                  setCourseNavOpen(false)
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
