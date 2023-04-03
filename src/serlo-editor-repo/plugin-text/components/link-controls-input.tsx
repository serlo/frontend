import * as React from 'react'

import { DeepPartial, styled } from '../../ui'
import type { TextEditorPluginConfig } from '../types'

interface InputProps
  extends React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  theme: DeepPartial<TextEditorPluginConfig['theme']>
  label?: string
  textfieldWidth?: string
  editorInputWidth?: string
}

const InputInner = styled.input(({ theme }) => ({
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
  backgroundColor: theme.backgroundColor,
  border: 'none',
  // eslint-disable-next-line @typescript-eslint/restrict-template-expressions, @typescript-eslint/no-unsafe-member-access
  borderBottom: `2px solid ${theme.color}`,
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
  color: theme.color,
  '&:focus': {
    outline: 'none',
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions, @typescript-eslint/no-unsafe-member-access
    borderBottom: `2px solid ${theme.hoverColor}`,
  },
}))

const InputRefForward: React.ForwardRefRenderFunction<
  HTMLInputElement,
  InputProps
> = (props, ref) => {
  return <InputInner {...props} ref={ref} />
}

export const LinkControlsInput = React.forwardRef(InputRefForward)
