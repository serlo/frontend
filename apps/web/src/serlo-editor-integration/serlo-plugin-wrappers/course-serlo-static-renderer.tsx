import { CourseStaticRenderer } from '@editor/plugins/course/static/static'
import { EditorCourseDocument } from '@editor/types/editor-plugins'
import { useRouter } from 'next/router'
import { useContext } from 'react'

import { RevisionViewContext } from '@/contexts/revision-view-context'

/**
 * This injects the next router. Right now Course is only used on serlo.org with next.js
 */
export function CourseSerloStaticRenderer(props: EditorCourseDocument) {
  const router = useRouter()
  const isRevisionView = useContext(RevisionViewContext)
  return (
    <CourseStaticRenderer
      {...props}
      router={router}
      isRevisionView={isRevisionView}
    />
  )
}
