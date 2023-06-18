import { forwardRef } from 'react'

import { styled } from '../editor-ui'
import { colors } from '@/helper/colors'

const Label = styled.label<{ width: string | undefined }>(({ width }) => {
  return {
    width,
    color: colors.almostBlack,
  }
})

const Input = styled.input<{ textWidth: string | undefined }>(
  ({ textWidth }) => {
    return {
      backgroundColor: colors.editorPrimary100,
      width: textWidth,
      borderRadius: '0.8rem',
      border: `2px solid ${colors.editorPrimary100}`,
      color: colors.almostBlack,
      padding: '3px 10px',
      '&:focus': {
        outline: 'none',
        border: `2px solid ${colors.editorPrimary}`,
      },
    }
  }
)

export const EditorInput = forwardRef<HTMLInputElement, EditorInputProps>(
  function EditorInput({ label, ...props }, ref) {
    return (
      <Label width={props.width}>
        {label ?? ''}
        <Input textWidth={props.inputWidth} {...props} ref={ref} />
      </Label>
    )
  }
)

export interface EditorInputProps
  extends React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  label?: string
  inputWidth?: string
  width?: string
}
