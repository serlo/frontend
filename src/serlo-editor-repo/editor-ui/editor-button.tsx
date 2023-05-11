import { styled } from '../ui'
import { legacyEditorTheme } from '@/helper/colors'

export const EditorButton = styled.button(() => {
  return {
    margin: '3px',
    backgroundColor: legacyEditorTheme.backgroundColor,
    outline: 'none',
    border: 'none',
    boxShadow: '0 1px 2px 0 rgba(0,0,0,0.50)',
    color: legacyEditorTheme.color,
    borderRadius: '4px',
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: legacyEditorTheme.primary.background,
      color: legacyEditorTheme.color,
      borderColor: legacyEditorTheme.primary.background,
    },
  }
})
