import { RenderLeafProps } from 'slate-react'

import { TextLeafRenderer } from './text-leaf-renderer'
import { useEditorStrings } from '@/contexts/logged-in-data-context'

export interface TextLeafWithPlaceholderProps {
  customPlaceholder?: string
}

export function TextLeafWithPlaceholder(
  props: TextLeafWithPlaceholderProps & RenderLeafProps
) {
  const { attributes, customPlaceholder } = props

  const pluginStrings = useEditorStrings().plugins

  const leafElement = (
    <span {...attributes}>
      <TextLeafRenderer {...props} />
    </span>
  )

  // @ts-expect-error for now
  if (!props.leaf.placeholder) return leafElement

  return (
    <>
      <span
        className="pointer-events-none absolute text-gray-300"
        contentEditable={false}
      >
        {customPlaceholder ?? pluginStrings.text.placeholder}{' '}
      </span>
      <span {...props.attributes}>
        <TextLeafRenderer {...props} />
      </span>
    </>
  )
}
