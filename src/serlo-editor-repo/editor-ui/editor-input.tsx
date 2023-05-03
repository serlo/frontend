import * as React from 'react'

import { styled } from '../ui'
import { colors } from '@/helper/colors'

const Label = styled.label<{ width: string | undefined }>(({ width }) => {
  return {
    width,
    color: colors.gray,
  }
})

const Input = styled.input<{ textWidth: string | undefined }>(
  ({ textWidth }) => {
    return {
      backgroundColor: colors.yellow100,
      width: textWidth,
      borderRadius: '0.8rem',
      border: `2px solid ${colors.yellow100}`,
      color: colors.gray,
      padding: '3px 10px',
      '&:focus': {
        outline: 'none',
        border: `2px solid ${colors.yellow}`,
      },
    }
  }
)

/** @public */
export const EditorInput = React.forwardRef<HTMLInputElement, EditorInputProps>(
  function EditorInput({ label, ...props }, ref) {
    return (
      <Label width={props.width}>
        {label ?? ''}
        <Input textWidth={props.inputWidth} {...props} ref={ref} />
      </Label>
    )
  }
)

/** @public */
export interface EditorInputProps
  extends React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  label?: string
  inputWidth?: string
  width?: string
}
