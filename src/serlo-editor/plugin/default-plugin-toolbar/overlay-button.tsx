import styled from 'styled-components'

import { OverlayButtonProps } from '../plugin-toolbar'
import { colors } from '@/helper/colors'

export function OverlayButton({
  children,
  label,
  ...props
}: OverlayButtonProps) {
  return (
    <Button {...props} title={label}>
      {children || label}
    </Button>
  )
}

const Button = styled.button({
  margin: '3px',
  backgroundColor: '#ffffff',
  outline: 'none',
  border: '2px solid rgba(51,51,51,0.95)',
  color: 'rgba(51,51,51,0.95)',
  padding: '10px',
  borderRadius: '4px',
  minWidth: '125px',
  cursor: 'pointer',
  '&:hover': {
    backgroundColor: 'transparent',
    color: 'rgb(70, 155, 255)',
    borderColor: colors.editorPrimary,
  },
})
