import { useEditStrings } from '@editor/i18n/edit-strings-provider'
import { getInteractiveItemByStaticState } from '@editor/plugins/rows/utils/plugin-menu'
import { type EditorInteractiveVideoDocument } from '@editor/types/editor-plugins'
import { faPencilAlt, faTrash } from '@fortawesome/free-solid-svg-icons'
import { formatTime } from '@vidstack/react'

import { type InteractiveVideoProps } from '..'
import { FaIcon } from '@/components/fa-icon'

export function MarksList({
  marks,
  staticMarks,
  onMarkClick,
}: {
  marks: InteractiveVideoProps['state']['marks']
  staticMarks: EditorInteractiveVideoDocument['state']['marks']
  onMarkClick: (index: number) => void
}) {
  const editStrings = useEditStrings()
  const pluginsStrings = editStrings.plugins
  const interactiveVideoStrings = pluginsStrings.interactiveVideo

  function getTitleAndIcon(index: number) {
    const staticMark = staticMarks[index]
    const menuItem = getInteractiveItemByStaticState(
      staticMark.child,
      editStrings
    )
    const title =
      staticMark.title || menuItem?.title || pluginsStrings.exercise.title

    const icon =
      menuItem && typeof menuItem?.icon !== 'string' ? (
        // @ts-expect-error 123
        (menuItem.icon() as JSX.Element)
      ) : (
        <div className="h-8 w-full rounded-sm bg-editor-primary-100" />
      )
    return { title, icon }
  }

  return (
    <div className="mx-side mb-12 border-b-2 border-b-gray-300 pb-12">
      <ul>
        {marks.map((mark, index) => {
          const { title, icon } = getTitleAndIcon(index)
          return (
            <li key={index} className="mb-3 flex gap-3">
              <div className="w-11">{icon}</div>
              <span className="mt-0.5 grow">{title}</span>
              <span className="inline-block min-w-9 text-right text-gray-400">
                {formatTime(mark.startTime.value)}
              </span>
              <div>
                <button
                  className="serlo-button-editor-secondary mr-2"
                  onClick={() => onMarkClick(index)}
                >
                  <span className="sr-only">
                    {interactiveVideoStrings.editMark}
                  </span>
                  <FaIcon icon={faPencilAlt} />
                </button>
                <button
                  className="serlo-button-editor-secondary"
                  onClick={() => marks.remove(index)}
                >
                  <span className="sr-only">
                    {interactiveVideoStrings.removeMark}
                  </span>
                  <FaIcon icon={faTrash} />
                </button>
              </div>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
