import { styled } from '../editor-ui'
import { legacyEditorTheme } from '@/helper/colors'

export const Button = styled.button((props: { active?: boolean }) => {
  return {
    backgroundColor: props.active ? '#b6b6b6' : 'transparent',
    cursor: 'pointer',
    boxShadow: props.active ? 'inset 0 1px 3px 0 rgba(0,0,0,0.50)' : undefined,
    color: props.active
      ? legacyEditorTheme.backgroundColor
      : legacyEditorTheme.color,
    outline: 'none',
    height: '25px',
    border: 'none',
    borderRadius: '4px',
    margin: '5px',
    padding: '0px',
    width: '25px',
    '&:hover': {
      color: legacyEditorTheme.primary.background,
    },
  }
})
