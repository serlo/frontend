import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { RenderLeafProps } from 'slate-react'

import { TextLeafRenderer } from './text-leaf-renderer'
import { FaIcon } from '@/components/fa-icon'
import { useEditorStrings } from '@/contexts/logged-in-data-context'
import { tw } from '@/helper/tw'
import { EditorTooltip } from '@/serlo-editor/editor-ui/editor-tooltip'

export function TextLeafWithPlaceholder(
  props: {
    customPlaceholder?: string
    onAdd?: () => void
  } & RenderLeafProps
) {
  const { attributes, customPlaceholder, leaf, onAdd } = props

  const textStrings = useEditorStrings().plugins.text

  const leafElement = (
    <span {...attributes} data-qa="plugin-text-leaf-element">
      <TextLeafRenderer {...props} />
    </span>
  )

  if (!leaf.showPlaceholder) return leafElement

  return (
    <>
      <span
        className="pointer-events-none absolute -mt-[5px] block w-full text-gray-400 [user-select:none]"
        contentEditable={false}
        data-qa="plugin-text-leaf-element-with-placeholder"
      >
        {customPlaceholder ?? textStrings.placeholder}{' '}
        {onAdd ? (
          <button
            className={tw`
              serlo-button-editor-secondary serlo-tooltip-trigger pointer-events-auto z-20
              h-8 w-8 focus-within:z-[22] hover:z-[22]
            `}
            onClick={onAdd}
          >
            <EditorTooltip
              text={textStrings.addButtonExplanation}
              hotkeys="/"
              className="-left-[200%]"
            />
            <FaIcon icon={faPlus} />
          </button>
        ) : null}
      </span>
      {leafElement}
    </>
  )
}
