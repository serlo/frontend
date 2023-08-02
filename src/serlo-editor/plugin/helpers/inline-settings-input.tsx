import { forwardRef } from 'react'

import { tw } from '@/helper/tw'

const InlineInputRefForward: React.ForwardRefRenderFunction<
  HTMLInputElement,
  InputProps
> = (props, ref) => {
  return (
    <input
      {...props}
      ref={ref}
      className={tw`
         border-2 border-editor-primary-200  border-transparent bg-editor-primary-200
        text-white focus:border-editor-primary focus:outline-none
      `}
    />
  )
}
export const InlineSettingsInput = forwardRef(InlineInputRefForward)

export interface InputProps
  extends React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  label?: string
  textfieldWidth?: string
  editorInputWidth?: string
}
