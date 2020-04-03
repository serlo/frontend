import styled from 'styled-components'

export const ToolLine = styled.div`
  margin-right: 16px;
  margin-top: -25px;
  margin-bottom: 15px;
  display: none;
  @media (max-width: ${props => props.theme.breakpoints.lg}) {
    display: flex;
  }
  justify-content: flex-end;
`
