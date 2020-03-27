import styled from 'styled-components'

export interface StyledH1Props {
  displayMode?: boolean
}

export const StyledH1 = styled.h1<StyledH1Props>`
  margin-top: ${props => (props.displayMode ? '46px' : '15px')};
  margin-left: 15px;
  font-size: 2rem;
  padding: 0;
  margin-right: 15px;
  margin-bottom: ${props => (props.displayMode ? '38px' : '38px')};
  line-height: 1.22;
  text-decoration: underline;
  text-decoration-color: ${props => props.theme.colors.orange};
`
