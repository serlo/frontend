import { forwardRef } from 'react'
import styled from 'styled-components'

import { OverlayInputProps } from '../plugin-toolbar'
import { colors } from '@/helper/colors'

export const OverlayInput = forwardRef<HTMLInputElement, OverlayInputProps>(
  function OverlayInput({ label, ...props }, ref) {
    return (
      <OverlayInputLabel>
        <OverlayInputLabelInner>{label}</OverlayInputLabelInner>
        <OverlayInputInner {...props} ref={ref} />
      </OverlayInputLabel>
    )
  }
) as unknown as React.ComponentType<OverlayInputProps>

const OverlayInputLabel = styled.label({
  color: 'rgba(51,51,51,0.95)',
  margin: '20px auto 0px',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
})

const OverlayInputLabelInner = styled.span({ width: '20%' })

const OverlayInputInner = styled.input({
  backgroundColor: '#ffffff',
  border: 'none',
  borderBottom: '2px solid rgba(51,51,51,0.95)',
  color: 'rgba(51,51,51,0.95)',
  width: '75%',
  '&:focus': {
    outline: 'none',
    borderBottom: `2px solid ${colors.editorPrimary}`,
  },
})
