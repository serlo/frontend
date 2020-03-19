import styled from 'styled-components'

export interface ColProps {
  size: number
}

export const Col = styled.div<ColProps>`
  @media (min-width: ${props => props.theme.breakpoints.mobile}) {
    box-sizing: border-box;
    flex-basis: ${props => Math.floor((props.size * 100) / 24)}%;
    width: ${props => Math.floor((props.size * 100) / 24)}%;
    max-width: ${props => Math.floor((props.size * 100) / 24)}%;
  }
`
