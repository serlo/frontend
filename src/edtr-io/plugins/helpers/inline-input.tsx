import { useEffect, useState } from 'react'
// @ts-expect-error Type mismatch between versions, fix someday
import { Value } from 'slate'
import Plain from 'slate-plain-serializer'
// @ts-expect-error Type mismatch between versions, fix someday
import { Editor as SlateEditor } from 'slate-react'

export function InlineInput(props: {
  onChange: (value: string) => void
  onFocus?: () => void
  value: string
  placeholder: string
}) {
  const { onChange, value, placeholder } = props
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const [state, setState] = useState(Plain.deserialize(value))

  useEffect(() => {
    if (Plain.serialize(state) !== value) {
      setState(Plain.deserialize(value))
    }
    // only update when props change to avoid loops
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value])

  return (
    <SlateEditor
      placeholder={placeholder}
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
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
