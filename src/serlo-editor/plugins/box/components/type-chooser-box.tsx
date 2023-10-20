import type { BoxProps } from '..'
import { boxTypeIcons, types } from '../renderer'
import { FaIcon } from '@/components/fa-icon'
import { useInstanceData } from '@/contexts/instance-context'
import { useEditorStrings } from '@/contexts/logged-in-data-context'

interface TypeChooserProps {
  typeState: BoxProps['state']['type']
}

export function TypeChooserBox({ typeState }: TypeChooserProps) {
  const { strings } = useInstanceData()
  const editorStrings = useEditorStrings()

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
                onClick={(event) => {
                  event.preventDefault()
                  typeState.set(type)
                }}
                data-qa={`plugin-box-initial-type-chooser-option-${type}`}
              >
                {listIcon ? <FaIcon className="mr-1" icon={listIcon} /> : null}
                {strings.content.boxTypes[type]}
              </button>
            </li>
          )
        })}
      </ul>
    </figure>
  )
}
