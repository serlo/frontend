import { forwardRef } from 'react'

const InlineInputRefForward: React.ForwardRefRenderFunction<
  HTMLInputElement,
  InputProps
> = (props, ref) => {
  return (
    <input
      {...props}
      ref={ref}
      className="my-2 rounded-xl border-3 border-editor-primary-50 bg-editor-primary-100 px-3 outline-none hover:border-editor-primary-100 focus:border-editor-primary-200"
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
