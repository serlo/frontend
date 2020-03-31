import styled from 'styled-components'

export const StyledLi = styled.li<{ mb?: boolean }>`
  margin-bottom: ${props => (props.mb ? '0' : props.theme.spacing.mb.li)};
`
