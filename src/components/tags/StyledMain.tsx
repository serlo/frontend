import styled from 'styled-components'

export interface MainProps {
  hide?: boolean
}

export const StyledMain = styled.main<MainProps>`
  margin-left: auto;
  margin-right: auto;
  max-width 700px;
  ${props => (props.hide ? 'overflow: hidden;' : '')}
`
