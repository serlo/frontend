import styled from 'styled-components'

export const LayoutRow = styled.div`
  display: flex;
  @media (max-width: ${(props) => props.theme.breakpointsMax.mobile}) {
    flex-direction: column;
  }
`
