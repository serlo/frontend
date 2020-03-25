import styled from 'styled-components'

export const ToolLine = styled.div`
  margin-right: 16px;
  margin-top: 5px;
  display: none;
  @media (max-width: ${props => props.theme.breakpoints.lg}) {
    display: flex;
  }
  margin-bottom: 20px;
  justify-content: flex-end;
`
