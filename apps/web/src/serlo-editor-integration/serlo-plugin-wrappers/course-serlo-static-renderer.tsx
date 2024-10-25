import { useStaticStrings } from '@editor/i18n/static-strings-provider'
import { CourseStaticRenderer } from '@editor/plugins/course/static/static'
import { EditorCourseDocument } from '@editor/types/editor-plugins'
import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons'
import { useRouter } from 'next/router'
import { useContext } from 'react'

import { InfoPanel } from '@/components/info-panel'
import { RevisionViewContext } from '@/contexts/revision-view-context'

/**
 * This injects the next router. Right now Course is only used on serlo.org with next.js
 */
export function CourseSerloStaticRenderer(props: EditorCourseDocument) {
  const router = useRouter()
  const isRevisionView = useContext(RevisionViewContext)
  const { pages } = props.state

  const strings = useStaticStrings()

  return (
    <>
      {pages.length ? null : (
        <InfoPanel icon={faExclamationCircle} type="warning" doNotIndex>
          {strings.plugins.course.noPagesWarning}
        </InfoPanel>
      )}
      <CourseStaticRenderer
        {...props}
        router={router}
        isRevisionView={isRevisionView}
      />
    </>
  )
}
