import { forwardRef } from 'react'

import { tw } from '@/helper/tw'

interface EditorInputProps
  extends React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  label?: string
  inputWidth?: string
  width?: string
}

export const EditorInput = forwardRef<HTMLInputElement, EditorInputProps>(
  function EditorInput({ label, ...props }, ref) {
    const inputProps = { ...props }
    delete inputProps.inputWidth

    return (
      <label className="text-almost-black" style={{ width: props.width }}>
        {label ?? ''}
        <input
          {...inputProps}
          ref={ref}
          className={tw`
            rounded-xl border-2 border-editor-primary-100 bg-editor-primary-100
            px-2.5 py-[3px] text-almost-black focus:border-editor-primary focus:outline-none
          `}
          style={{ width: props.inputWidth }}
        />
      </label>
    )
  }
)
