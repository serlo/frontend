/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import MathfieldElement from 'mathlive/dist/types/mathfield-element'
import { useState, useEffect, createRef } from 'react'

interface MathFieldProps {
  value?: string
  onChange?: (latex: string) => void
  onEnter?: () => void
  lazy?: boolean
}

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      'math-field': React.DetailedHTMLProps<
        React.HTMLAttributes<MathfieldElement>,
        MathfieldElement
      >
    }
  }
}

export function ReadonlyMathField(props: MathFieldProps) {
  const [value, setValue] = useState(props.value ?? '')

  // Customize the mathfield when it is mounted
  const mf = createRef<MathfieldElement>()

  useEffect(() => {
    if (mf.current) {
      mf.current.menuItems = []
      mf.current.readOnly = true
      if (mf.current.registers) {
        // @ts-expect-error readonly?
        mf.current.registers.arraystretch = 1.5
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mf.current])

  return (
    <math-field
      style={{ display: 'block', backgroundColor: 'rgba(255,255,255,0)' }}
      ref={mf}
      onKeyDownCapture={(ev) => {
        if (ev.key === 'Enter' && props.onEnter) {
          props.onEnter()
        }
      }}
      onInput={(evt) => {
        const v = (evt.target as MathfieldElement).value
        setValue(v)
        if (props.onChange) {
          props.onChange(v)
        }
      }}
    >
      {value}
    </math-field>
  )
}
