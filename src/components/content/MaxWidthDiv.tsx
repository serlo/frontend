import styled from 'styled-components'

const MaxWidthDiv = styled.div<{ maxWidth: number }>`
  ${(props) => (props.maxWidth > 0 ? `max-width: ${props.maxWidth}px` : '')}
`

export default MaxWidthDiv
