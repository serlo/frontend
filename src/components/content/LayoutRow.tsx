import styled from 'styled-components'

const LayoutRow = styled.div`
  display: flex;
  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    flex-direction: column;
  }
`

export default LayoutRow
