import styled from 'styled-components'

export interface ColProps {
  cSize: number
}

export const Col = styled.div<ColProps>`
  @media (min-width: ${props => props.theme.breakpoints.mobile}) {
    box-sizing: border-box;
    flex-basis: ${props => Math.floor((props.cSize * 100000) / 24) / 1000}%;
    width: ${props => Math.floor((props.cSize * 100000) / 24) / 1000}%;
    max-width: ${props => Math.floor((props.cSize * 100000) / 24) / 1000}%;
  }
`
