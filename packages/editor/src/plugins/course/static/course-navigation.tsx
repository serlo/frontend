import { EditorCourseDocument } from '@editor/types/editor-plugins'
import { useState, MouseEvent, use } from 'react'

import { CourseNavigationRenderer } from '../renderer/course-navigation'
import { Link } from '@/components/content/link'
import { useEntityData } from '@/contexts/serlo-entity-context'
import { cn } from '@/helper/cn'

export function CourseNavigation({ pages }: EditorCourseDocument['state']) {
  const [courseNavOpen, setCourseNavOpen] = useState(pages?.length < 4)
  const { title } = useEntityData()

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
      pages={pages.map(({ id, title }) => {
        // TODO: check if empty?
        const active = false // TODO: get currently active page
        const url = active ? undefined : `/TODO:makeActualLink/${id}`

        return {
          key: id + title,
          element: (
            <Link
              className={cn(
                'text-lg leading-browser',
                active && 'font-semibold text-almost-black hover:no-underline'
              )}
              href={active ? undefined : url}
            >
              {title}
            </Link>
          ),
        }
      })}
    />
  )
}
