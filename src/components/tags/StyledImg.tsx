import styled from 'styled-components'

export interface StyledImgProps {
  maxWidth?: number
  inline?: boolean
}

export const StyledImg = styled.img<StyledImgProps>`
  max-width: ${props => (props.maxWidth > 0 ? props.maxWidth + 'px' : '')};
  ${props =>
    props.inline
      ? `
        max-width: 100%;
        margin-left: auto;
        margin-right: auto;
      `
      : ''}
`
