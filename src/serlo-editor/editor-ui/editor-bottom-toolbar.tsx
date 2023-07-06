import styled from 'styled-components'

import { legacyEditorTheme } from '@/helper/colors'

export const EditorBottomToolbar = styled.div({
  boxShadow: '0 2px 4px 0 rgba(0,0,0,0.50)',
  backgroundColor: legacyEditorTheme.backgroundColor,
  color: legacyEditorTheme.color,
  borderRadius: '4px',
  position: 'fixed',
  left: '50%',
  transform: 'translate(-50%,-50%)',
  bottom: '0',
  zIndex: 95,
  whiteSpace: 'nowrap',
})
