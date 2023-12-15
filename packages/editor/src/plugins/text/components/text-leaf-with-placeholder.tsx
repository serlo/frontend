import { EditorTooltip } from '@editor/editor-ui/editor-tooltip'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { FaIcon } from '@serlo/frontend/src/components/fa-icon'
import { useEditorStrings } from '@serlo/frontend/src/contexts/logged-in-data-context'
import { cn } from '@serlo/frontend/src/helper/cn'
import { RenderLeafProps } from 'slate-react'

import { TextLeafRenderer } from './text-leaf-renderer'

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
        className="pointer-events-none absolute -mt-1 block w-full text-gray-400 [user-select:none]"
        contentEditable={false}
        data-qa="plugin-text-leaf-element-with-placeholder"
      >
        {customPlaceholder ?? textStrings.placeholder}{' '}
        {onAdd ? (
          <button
            className={cn(`
              serlo-button-editor-secondary serlo-tooltip-trigger pointer-events-auto z-20
              h-[1.8rem] w-[1.8rem] px-0 pt-[5px] focus-within:z-[22] hover:z-[22]
            `)}
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
