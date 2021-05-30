import styled, { css } from 'styled-components'

import { makeTransparentButton } from '@/helper/css'

const linkStyle = css`
  &:active,
  &:hover,
  &[aria-expanded='true'] {
    color: #fff;
    background-color: ${(props) => props.theme.colors.brand};
  }
`

export const SubButtonStyle = styled.span`
  display: block;
  ${linkStyle}
  ${makeTransparentButton}
  border-radius: 12px;
  font-size: 1rem;
  font-weight: normal;
  text-align: left;
`
