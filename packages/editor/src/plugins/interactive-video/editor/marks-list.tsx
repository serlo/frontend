import { faPencilAlt, faTrash } from '@fortawesome/free-solid-svg-icons'

import { type InteractiveVideoProps } from '..'
import { FaIcon } from '@/components/fa-icon'
import { useEditorStrings } from '@/contexts/logged-in-data-context'

export function MarksList({
  marks,
  onMarkClick,
}: {
  marks: InteractiveVideoProps['state']['marks']
  onMarkClick: (index: number) => void
}) {
  const pluginStrings = useEditorStrings().plugins.interactiveVideo
  return (
    <div className="mx-side">
      <ul>
        {marks.map((mark, index) => {
          const title = mark.title.value.length ? mark.title.value : 'type'
          return (
            <li key={index} className="mb-3 flex gap-1">
              <span>{mark.startTime.value}</span>
              <b className="grow">{title}</b>
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
