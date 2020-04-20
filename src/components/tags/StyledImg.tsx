import styled from 'styled-components'

interface StyledImgProps {
  maxWidth?: number
  inline?: boolean
}

const StyledImg = styled.img<StyledImgProps>`
  width: 100%;
`

export default StyledImg
