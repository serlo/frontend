import { EditorTooltip } from '@editor/editor-ui/editor-tooltip'
import { FaIcon } from '@editor/editor-ui/fa-icon'
import { useEditStrings } from '@editor/i18n/edit-strings-provider'
import { cn } from '@editor/utils/cn'
import {
  faArrowCircleDown,
  faArrowCircleUp,
  faTrashAlt,
} from '@fortawesome/free-solid-svg-icons'

import { type CourseProps } from '.'
import { CourseNavigationRenderer } from './renderer/course-navigation-renderer'

const toolButtonClassnames = cn(
  'serlo-button-edit-secondary serlo-tooltip-trigger mr-1 opacity-0 group-focus-within:opacity-100 group-hover:opacity-100'
)

export function EditorCourseNavigation({
  pages,
}: {
  pages: CourseProps['state']['pages']
}) {
  const templateStrings = useEditStrings().templatePlugins

  function handleRemove(index: number) {
    if (window.confirm(templateStrings.course.confirmDelete)) {
      pages.remove(index)
    }
  }

  const pagesData = pages.map(({ title, id }, index) => ({
    id: id.value,
    title: title.value.trim().length ? title.value : '___',
    afterLink: renderPageTools(index),
  }))

  return <CourseNavigationRenderer pages={pagesData} />

  function renderPageTools(index: number) {
    return (
      <>
        {index > 0 ? (
          <button
            className={toolButtonClassnames}
            onClick={() => {
              const newIndex = index - 1
              pages.move(index, newIndex)
            }}
          >
            <EditorTooltip text={templateStrings.entity.moveUpLabel} />
            <FaIcon icon={faArrowCircleUp} />
          </button>
        ) : null}
        {index < pages.length - 1 ? (
          <button
            className={toolButtonClassnames}
            onClick={() => {
              const newIndex = index + 1
              pages.move(index, newIndex)
            }}
          >
            <EditorTooltip text={templateStrings.entity.moveDownLabel} />
            <FaIcon icon={faArrowCircleDown} />
          </button>
        ) : null}
        {pages.length > 1 ? (
          <button
            className={toolButtonClassnames}
            onClick={() => handleRemove(index)}
          >
            <EditorTooltip text={templateStrings.course.removeCoursePage} />
            <FaIcon icon={faTrashAlt} />
          </button>
        ) : null}
      </>
    )
  }
}
