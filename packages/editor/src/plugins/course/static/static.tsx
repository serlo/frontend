import { StaticRenderer } from '@editor/static-renderer/static-renderer'
import { EditorCourseDocument } from '@editor/types/editor-plugins'
import { isRowsDocument } from '@editor/types/plugin-type-guards'

import { CourseNavigation } from './course-navigation'
import { isEmptyTextDocument } from '../../text/utils/static-is-empty'
import { useInstanceData } from '@/contexts/instance-context'

export function CourseStaticRenderer({ state }: EditorCourseDocument) {
  const { content } = state

  // const [interactiveHidden, setInteractiveHidden] = useState(
  //   hideInteractiveInitially
  // )
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
      {/* {interactiveHidden ? (
        <button
          className="serlo-button-blue-transparent ml-side text-base hover:bg-brand-100 hover:text-brand-700"
          onClick={() => setInteractiveHidden(false)}
        >
          <FaIcon icon={faCircleCheck} />{' '}
          {strings.content.exercises.showHiddenInteractive}
        </button>
      ) : (
        <StaticRenderer document={interactive} />
      )} */}
      {/* <StaticRenderer document={solution} /> */}
    </>
  )
}
