import { useEffect, useState } from 'react'
import Plain from 'slate-plain-serializer'
// @ts-expect-error missing types?
import { Editor as SlateEditor } from 'slate-react'

import { Value } from '@/edtr-io/slate'

export function InlineInput(props: {
  onChange: (value: string) => void
  onFocus?: () => void
  value: string
  placeholder: string
}) {
  const { onChange, value, placeholder } = props
  const [state, setState] = useState(Plain.deserialize(value) as Value)

  useEffect(() => {
    if (Plain.serialize(state) !== value) {
      setState(Plain.deserialize(value) as Value)
    }
    // only update when props change to avoid loops
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value])

  return (
    <SlateEditor
      placeholder={placeholder}
      value={state}
      onFocus={(event: any, editor: any, next: () => void) => {
        setTimeout(() => {
          if (typeof props.onFocus === 'function') {
            props.onFocus()
          }
        })
        next()
      }}
      onChange={({ value }: { value: Value }) => {
        setState(value)
        onChange(Plain.serialize(value))
      }}
    />
  )
}
