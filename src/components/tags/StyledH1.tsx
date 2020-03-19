import styled from 'styled-components'

export interface StyledH1Props {
  editMode?: boolean
}

export const StyledH1 = styled.h1<StyledH1Props>`
  margin-top: ${props => (props.editMode ? '15px' : '35px')};
  margin-left: 15px;
  font-size: 32px;
  padding: 0;
  margin-right: 15px;
  margin-bottom: ${props => (props.editMode ? '38px' : '20px')};
`
