import styled from 'styled-components'

import { colors } from '@/helper/colors'

export const StyledIconContainer = styled.div({
  height: '30px',
  width: '30px',
  cursor: 'pointer',
  color: colors.almostBlack,
  borderRadius: '100rem',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',

  '&:hover': {
    backgroundColor: colors.editorPrimary200,
  },

  '& > svg': {
    margin: '0 !important',
  },
})
