import styled from 'styled-components'

interface SpoilerToggleProps {
  open: boolean
}

export function SpoilerToggle({ open }: SpoilerToggleProps) {
  return <StyledSpan>{open ? '▾ ' : '▸ '} </StyledSpan>
}

const StyledSpan = styled.span`
  display: inline-block;
  width: 1rem;
`
