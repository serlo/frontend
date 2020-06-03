import styled from 'styled-components'

export const MaxWidthDiv = styled.div<{ maxWidth: number }>`
  ${(props) => (props.maxWidth > 0 ? `max-width: ${props.maxWidth}px` : '')}
`
