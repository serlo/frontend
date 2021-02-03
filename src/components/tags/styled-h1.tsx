import styled from 'styled-components'

interface StyledH1Props {
  spaceAbove?: boolean
  extraSpaceAbove?: boolean
}

export const StyledH1 = styled.h1<StyledH1Props>`
  margin-top: ${(props) =>
    props.spaceAbove ? '46px' : props.extraSpaceAbove ? '80px' : '15px'};
  margin-left: 15px;
  font-size: 2rem;
  padding: 0;
  margin-right: 15px;
  margin-bottom: 38px;
  line-height: 1.22;
  hyphens: auto;
`
