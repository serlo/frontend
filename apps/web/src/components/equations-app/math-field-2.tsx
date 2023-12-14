import type { MathfieldElement } from 'mathlive'
import { useState, useEffect, createRef, useRef } from 'react'

interface MathFieldProps {
  value?: string
  readonly?: boolean
  onChange?: (latex: string) => void
  onEnter?: () => void
}

export function MathField2(props: MathFieldProps) {
  const [value, setValue] = useState(props.value ?? '')

  // Customize the mathfield when it is mounted
  const mf = createRef<MathfieldElement>()

  const onEnter = useRef(props.onEnter)
  onEnter.current = props.onEnter
  useEffect(() => {
    if (mf.current) {
      mf.current.menuItems = []
      if (props.readonly) {
        mf.current.readOnly = true
      } else {
        // only run on mount
        // Read more about customizing the mathfield: https://cortexjs.io/mathlive/guides/customizing/
        // mf.current.smartFence = false
        mf.current.inlineShortcuts = {
          ...mf.current.inlineShortcuts,
          '*': '\\cdot',
        }
        mf.current.scriptDepth = 1

        mf.current.addEventListener('focusin', () => {
          window.mathVirtualKeyboard.show()
        })
        mf.current.addEventListener('focusout', () => {
          window.mathVirtualKeyboard.hide()
        })

        const beforeInputHandler = (ev: InputEvent) => {
          if (ev.inputType === 'insertLineBreak') {
            if (onEnter.current) {
              onEnter.current()
            }
          }
        }

        const mfc = mf.current

        mfc.addEventListener('beforeinput', beforeInputHandler)

        mf.current.keybindings = [
          ...mf.current.keybindings,
          { key: ':', command: ['insert', '\\div'] },
          { key: '[NumpadDivide]', command: ['insert', '\\div'] },
        ]
        //mf.current.focus()

        return () => {
          mfc.removeEventListener('beforeinput', beforeInputHandler)
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <math-field
      style={{ display: 'block' }}
      ref={mf}
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
