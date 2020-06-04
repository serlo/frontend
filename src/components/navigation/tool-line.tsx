import styled from 'styled-components'

export const ToolLine = styled.div`
  display: none;
  @media (max-width: ${props => props.theme.breakpoints.lg}) {
    display: block;
    margin-right: 16px;
    margin-top: -35px;
    margin-bottom: 15px;
    display: flex;
    justify-content: flex-end;
  }
`
