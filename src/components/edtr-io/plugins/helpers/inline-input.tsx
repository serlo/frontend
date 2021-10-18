import * as React from 'react'
import Plain from 'slate-plain-serializer'
// @ts-expect-error missing types?
import { Editor as SlateEditor } from 'slate-react'

export function InlineInput(props: {
  onChange: (value: string) => void
  onFocus?: () => void
  value: string
  placeholder: string
}) {
  const { onChange, value, placeholder } = props
  const [state, setState] = React.useState(Plain.deserialize(value))
  React.useEffect(() => {
    if (Plain.serialize(state) !== value) {
      setState(Plain.deserialize(value))
    }
  }, [value, state])

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
      onChange={({ value }: any) => {
        setState(value)
        onChange(Plain.serialize(value))
      }}
    />
  )
}
