import styled from 'styled-components'

interface StyledImgProps {
  maxWidth?: number
  inline?: boolean
}

const StyledImg = styled.img<StyledImgProps>`
  max-width: ${(props) =>
    props.maxWidth !== undefined && props.maxWidth > 0
      ? props.maxWidth + 'px'
      : '100%'};
  height: auto;
  ${(props) =>
    props.inline
      ? `
        max-width: 100%;
        margin-left: auto;
        margin-right: auto;
      `
      : ''}
`

export default StyledImg
