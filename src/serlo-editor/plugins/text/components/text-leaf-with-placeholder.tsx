import { RenderLeafProps } from 'slate-react'

import { TextLeafRenderer } from './text-leaf-renderer'
import { useEditorStrings } from '@/contexts/logged-in-data-context'

export function TextLeafWithPlaceholder(
  props: {
    customPlaceholder?: string
  } & RenderLeafProps
) {
  const { attributes, customPlaceholder, leaf } = props

  const placeholderString = useEditorStrings().plugins.text.placeholder

  const leafElement = (
    <span {...attributes}>
      <TextLeafRenderer {...props} />
    </span>
  )

  if (!leaf.showPlaceholder) return leafElement

  return (
    <>
      <span
        className="pointer-events-none absolute block w-full text-gray-300 [user-select:none]"
        contentEditable={false}
      >
        {customPlaceholder ?? placeholderString}
      </span>
      {leafElement}
    </>
  )
}
