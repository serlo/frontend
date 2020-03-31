import styled from 'styled-components'

export const SpoilerContainer = styled.div<{ hide?: boolean }>`
  width: 100%;
  display: flex;
  flex-direction: column;
  border-left: 4px solid ${props => props.theme.colors.brand};
  margin-bottom: ${props => props.theme.spacing.mb.block};
`
