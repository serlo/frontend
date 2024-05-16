import { StaticRenderer } from '@editor/static-renderer/static-renderer'
import { EditorCourseDocument } from '@editor/types/editor-plugins'
import { isRowsDocument } from '@editor/types/plugin-type-guards'

import { CourseNavigation } from './course-navigation'
import { isEmptyTextDocument } from '../../text/utils/static-is-empty'
import { useInstanceData } from '@/contexts/instance-context'

export function CourseStaticRenderer({ state }: EditorCourseDocument) {
  const { content } = state

  const { strings } = useInstanceData()
  if (!content) return null

  const isEmptyContent =
    isRowsDocument(content) &&
    content.state.length === 1 &&
    isEmptyTextDocument(content.state[0])

  return (
    <>
      <CourseNavigation {...state} />
      {isEmptyContent ? (
        <div className="mt-6"></div>
      ) : (
        <StaticRenderer document={content} />
      )}

      {/* TODO: pages */}
    </>
  )
}
