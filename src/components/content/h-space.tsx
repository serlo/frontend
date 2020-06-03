import styled from 'styled-components'

export interface HSpaceProps {
  amount?: number
}

export const HSpace = styled.div<HSpaceProps>`
  height: ${(props) => (props.amount ? props.amount : 30)}px;
`
