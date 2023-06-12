import { useMemo, useState } from 'react'
import { createEditor, Descendant } from 'slate'
import { Editable, Slate, withReact } from 'slate-react'

import { CustomElement, CustomText } from '@/serlo-editor/plugins/text'

const serialize = (value: Descendant[]): string => {
  return ((value[0] as CustomElement).children[0] as CustomText).text
}

const deserialize = (value: string): Descendant[] => [
  {
    type: 'p',
    children: [{ text: value }],
  },
]

export function InlineInput(props: {
  onChange: (value: string) => void
  onFocus?: () => void
  value: string
  placeholder: string
}) {
  const { onChange, value, placeholder } = props

  const initialValue = useMemo(
    () => deserialize(value),
    // initialValue should not be recalculated on rerender
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  )

  const [editor] = useState(() => withReact(createEditor()))

  return (
    <Slate
      editor={editor}
      value={initialValue}
      onChange={(newValue) => {
        onChange(serialize(newValue))
      }}
    >
      <Editable
        placeholder={placeholder}
        onFocus={() => {
          setTimeout(() => {
            if (typeof props.onFocus === 'function') {
              props.onFocus()
            }
          })
        }}
      />
    </Slate>
  )
}
