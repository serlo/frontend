import { FaIcon } from '@editor/editor-ui/fa-icon'
import { useContentStrings } from '@editor/utils/use-content-strings'
import { useEditorStrings } from '@editor/utils/use-editor-strings'

import type { BoxProps } from '..'
import { boxTypeIcons, types } from '../renderer'

interface TypeChooserProps {
  typeState: BoxProps['state']['type']
}

export function TypeChooserBox({ typeState }: TypeChooserProps) {
  const contentStrings = useContentStrings()
  const editorStrings = useEditorStrings()

  function handleTypeSelection(
    type: string,
    event: React.MouseEvent | React.KeyboardEvent
  ) {
    event.preventDefault()
    event.stopPropagation()
    typeState.set(type)
  }

  return (
    <figure
      className="relative mx-side rounded-xl border-3 p-4 pt-2"
      data-qa="plugin-box-initial-type-chooser"
    >
      <b className="block pb-3">{editorStrings.plugins.box.type}</b>

      <ul className="unstyled-list">
        {types.map((type) => {
          const listIcon = boxTypeIcons[type]
          return (
            <li key={type} className="inline-block pb-3.5 pr-4">
              <button
                className="serlo-button-editor-secondary"
                onClick={(event) => handleTypeSelection(type, event)}
                onKeyDown={(event) => {
                  if (event.key === 'Enter') {
                    handleTypeSelection(type, event)
                  }
                }}
                data-qa={`plugin-box-initial-type-chooser-option-${type}`}
              >
                {listIcon ? <FaIcon className="mr-1" icon={listIcon} /> : null}
                {contentStrings.boxTypes[type]}
              </button>
            </li>
          )
        })}
      </ul>
    </figure>
  )
}
