import { EditorTooltip } from '@editor/editor-ui/editor-tooltip'
import {
  faArrowCircleDown,
  faArrowCircleUp,
  faTrashAlt,
} from '@fortawesome/free-solid-svg-icons'

import { type CourseProps } from '..'
import { CourseNavigationRenderer } from '../renderer/course-navigation'
import { FaIcon } from '@/components/fa-icon'
import { useEditorStrings } from '@/contexts/logged-in-data-context'
import { cn } from '@/helper/cn'

const toolButtonClassnames = cn(
  'serlo-button-editor-secondary serlo-tooltip-trigger mr-1 opacity-0 group-focus-within:opacity-100 group-hover:opacity-100'
)

export function CourseNavigation({
  courseNavOpen,
  setCourseNavOpen,
  pages,
  activePageIndex,
  setActivePageIndex,
}: {
  courseNavOpen: boolean
  setCourseNavOpen: (open: boolean) => void
  pages: CourseProps['state']['pages']
  activePageIndex: number
  setActivePageIndex: (index: number) => void
}) {
  const templateStrings = useEditorStrings().templatePlugins

  function onRemove() {
    if (window.confirm(templateStrings.course.confirmDelete)) {
      pages.remove(activePageIndex)
    }
  }

  return (
    <CourseNavigationRenderer
      open={courseNavOpen}
      onOverviewButtonClick={() => setCourseNavOpen(!courseNavOpen)}
      pages={pages.map(({ title, id }, index) => {
        const isActive = activePageIndex === index

        return {
          key: id.value,
          element: (
            <div className="group">
              <button
                onClick={() => {
                  if (isActive) return
                  window.location.hash = `#${pages[index].id.value}`
                  setActivePageIndex(index)
                }}
                className={cn(
                  'serlo-link text-lg leading-browser',
                  isActive &&
                    'font-semibold text-almost-black hover:no-underline'
                )}
              >
                {title.value.trim().length ? title.value : '___'}
              </button>{' '}
              {renderPageTools(index)}
            </div>
          ),
        }
      })}
    />
  )

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

        <button className={toolButtonClassnames} onClick={onRemove}>
          <EditorTooltip text={templateStrings.course.removeCoursePage} />
          <FaIcon icon={faTrashAlt} />
        </button>
      </>
    )
  }
}
