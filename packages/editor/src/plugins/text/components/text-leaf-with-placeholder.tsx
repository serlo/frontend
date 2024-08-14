import { useEditorStrings } from '@serlo/frontend/src/contexts/logged-in-data-context'
import { RenderLeafProps } from 'slate-react'

import { TextLeafRenderer } from './text-leaf-renderer'

export function TextLeafWithPlaceholder(
  props: {
    customPlaceholder?: string
  } & RenderLeafProps
) {
  const { attributes, customPlaceholder, leaf } = props

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
        className="pointer-events-none absolute -mt-1 block w-full select-none text-gray-400"
        contentEditable={false}
        data-qa="plugin-text-leaf-element-with-placeholder"
      >
        {customPlaceholder ?? textStrings.placeholder}{' '}
      </span>
      {leafElement}
    </>
  )
}
