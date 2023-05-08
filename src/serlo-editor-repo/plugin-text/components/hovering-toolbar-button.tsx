import { styled } from '../../ui'
import { colors } from '@/helper/colors'

export const HoveringToolbarButton = styled.button<{
  active?: boolean
}>(({ active }) => ({
  color: active ? colors.almostBlack : '#b6b6b6',
  backgroundColor: active ? colors.editorPrimary200 : 'transparent',
  cursor: 'pointer',
  boxShadow: active ? 'inset 0 1px 3px 0 rgba(0,0,0,0.50)' : undefined,
  outline: 'none',
  height: '25px',
  border: 'none',
  borderRadius: '4px',
  margin: '5px',
  padding: '0px',
  width: '25px',
  '&:hover': {
    color: active ? 'black' : colors.editorPrimary,
  },
}))
