import { CustomElement, CustomText } from '@editor/plugins/text'
import { useMemo, useState } from 'react'
import { createEditor, Descendant } from 'slate'
import { Editable, Slate, withReact } from 'slate-react'


const slateToString = (value: Descendant[]): string => {
  return ((value[0] as CustomElement).children[0] as CustomText).text
}

const stringToSlate = (value: string): Descendant[] => [
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
    () => stringToSlate(value),
    // initialValue should not be recalculated on rerender
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  )

  const [editor] = useState(() => withReact(createEditor()))

  return (
    <Slate
      editor={editor}
      initialValue={initialValue}
      onChange={(newValue) => {
        onChange(slateToString(newValue))
      }}
    >
      <Editable
        placeholder={placeholder}
        onFocus={() => {
          setTimeout(() => {
            if (props.onFocus) props.onFocus()
          })
        }}
      />
    </Slate>
  )
}
