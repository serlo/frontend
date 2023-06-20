import styled from 'styled-components'

import { legacyEditorTheme } from '@/helper/colors'

export const Dropdown = styled.select({
  backgroundColor: legacyEditorTheme.backgroundColor,
  cursor: 'pointer',
  color: legacyEditorTheme.color,
  outline: 'none',
  height: '25px',
  border: 'none',
  borderRadius: '4px',
  margin: '5px',
  '&:hover': {
    color: legacyEditorTheme.primary.background,
  },
})

export const Option = styled.option<{
  active?: boolean
}>((props) => {
  return {
    backgroundColor: props.active
      ? '#b6b6b6'
      : legacyEditorTheme.backgroundColor,
    color: props.active
      ? legacyEditorTheme.backgroundColor
      : legacyEditorTheme.color,
    cursor: 'pointer',
    '&:hover': {
      color: legacyEditorTheme.primary.background,
    },
  }
})
