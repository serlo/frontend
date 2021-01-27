import styled from 'styled-components'

// This is only used for images
export const ImgMaxWidthDiv = styled.div<{ maxWidth: number }>`
  ${(props) => (props.maxWidth > 0 ? `max-width: ${props.maxWidth}px` : '')}
`
