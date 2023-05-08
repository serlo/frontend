import { styled } from '../../ui'
import { colors, legacyEditorTheme } from '@/helper/colors'

export const HoveringToolbarButton = styled.button<{
  active?: boolean
}>(({ active }) => ({
  backgroundColor: active ? '#b6b6b6' : 'transparent',
  cursor: 'pointer',
  boxShadow: active ? 'inset 0 1px 3px 0 rgba(0,0,0,0.50)' : undefined,
  color: active ? '#b6b6b6' : legacyEditorTheme.color,
  outline: 'none',
  height: '25px',
  border: 'none',
  borderRadius: '4px',
  margin: '5px',
  padding: '0px',
  width: '25px',
  '&:hover': {
    color: colors.editorPrimary,
  },
}))
