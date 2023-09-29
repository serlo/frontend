import clsx from 'clsx'

import type { BoxProps } from '..'
import { BoxType, boxTypeStyle, types } from '../renderer'
import { FaIcon } from '@/components/fa-icon'
import { useInstanceData } from '@/contexts/instance-context'
import { useEditorStrings } from '@/contexts/logged-in-data-context'

export function TypeChooserBox({
  borderColorClass,
  typeState,
}: {
  borderColorClass: string
  typeState: BoxProps['state']['type']
}) {
  const { strings } = useInstanceData()
  const editorStrings = useEditorStrings()

  return (
    <figure
      className={clsx(
        'relative mx-side rounded-xl border-3 p-4 pt-2',
        borderColorClass
      )}
    >
      <b className="block pb-3">{editorStrings.plugins.box.type}</b>
      <ul className="unstyled-list">{renderSettingsListItems()}</ul>
    </figure>
  )

  function renderSettingsListItems() {
    return types.map((boxType) => {
      const typedBoxType = boxType as BoxType
      const listStyle = boxTypeStyle[typedBoxType]
      const listIcon = Object.hasOwn(listStyle, 'icon')
        ? listStyle.icon
        : undefined

      return (
        <li key={typedBoxType} className="inline-block pb-3.5 pr-4">
          <button
            className="serlo-button-editor-secondary"
            onClick={(event) => {
              event.preventDefault()
              typeState.set(typedBoxType)
            }}
          >
            {listIcon ? <FaIcon className="mr-1" icon={listIcon} /> : null}
            {strings.content.boxTypes[typedBoxType]}
          </button>
        </li>
      )
    })
  }
}
