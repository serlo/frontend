import { useEffect, useState } from 'react'

// FIXME: This place using a single instance of slate, because we want the hovering-overlay
// to work -> but we need to update it to the new version as well

// replacing it width text input to avoid build errors
// will need solution here

export function InlineInput(props: {
  onChange: (value: string) => void
  onFocus?: () => void
  value: string
  placeholder: string
}) {
  const { onChange, value, placeholder } = props
  const [state, setState] = useState(value)

  useEffect(() => {
    if (state !== value) {
      setState(value)
    }
    // only update when props change to avoid loops
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value])

  return (
    <input
      placeholder={placeholder}
      value={state}
      onFocus={() => {
        setTimeout(() => {
          if (typeof props.onFocus === 'function') {
            props.onFocus()
          }
        })
      }}
      onChange={(e) => {
        setState(e.target.value)
        onChange(e.target.value)
      }}
    />
  )
}
