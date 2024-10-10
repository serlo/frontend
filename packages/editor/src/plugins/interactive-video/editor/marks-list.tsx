import { useEditStrings } from '@editor/i18n/edit-strings-provider'
import { type EditorInteractiveVideoDocument } from '@editor/types/editor-plugins'
import { faPencilAlt, faTrash } from '@fortawesome/free-solid-svg-icons'
import { formatTime } from '@vidstack/react'

import { type InteractiveVideoProps } from '..'
import { getMarkFallbackTitle } from '../helpers/get-mark-fallback-title'
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
  const pluginsStrings = useEditStrings().plugins
  const pluginStrings = pluginsStrings.interactiveVideo

  function getTitle(index: number) {
    const staticMark = staticMarks[index]
    return staticMark.title.length
      ? staticMark.title
      : `(${getMarkFallbackTitle(staticMark.child, pluginsStrings)})`
  }

  return (
    <div className="mx-side">
      <ul>
        {marks.map((mark, index) => {
          return (
            <li key={index} className="mb-3 flex gap-1">
              <span className="mr-2 inline-block min-w-9 text-right text-gray-400">
                {formatTime(mark.startTime.value)}
              </span>
              <span className="grow">{getTitle(index)}</span>
              <button
                className="serlo-button-editor-secondary"
                onClick={() => onMarkClick(index)}
              >
                <span className="sr-only">{pluginStrings.editMark}</span>
                <FaIcon icon={faPencilAlt} />
              </button>
              <button
                className="serlo-button-editor-secondary"
                onClick={() => marks.remove(index)}
              >
                <span className="sr-only">{pluginStrings.removeMark}</span>
                <FaIcon icon={faTrash} />
              </button>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
