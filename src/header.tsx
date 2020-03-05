import styled from 'styled-components'
import Menu from './headermenu'
import { menudata } from './menudata'

export default function Header() {
  return (
    <TopNavWrap>
      <PaddedBox>
        <StyledMenuWrapper links={menudata}></StyledMenuWrapper>
      </PaddedBox>
    </TopNavWrap>
  )
}

const TopNavWrap = styled.header`
  background-color: rgb(240, 247, 251);
  padding: 0;
  align-items: start;
  position: static;
`
const PaddedBox = styled.div`
  display: flex;
  box-sizing: border-box;
  outline: currentcolor none medium;
  max-width: 100%;
  margin: 0px;
  min-width: 0px;
  min-height: 0px;
  flex-direction: column;
  padding: 24px;
`

const StyledMenu = props => {
  return (
    <StyledMenuWrapper>
      <Menu {...props} />
    </StyledMenuWrapper>
  )
}

const StyledMenuWrapper = styled(Menu)`
  display: none;
  @media screen and (min-width: 52rem) {
    display: block;
  }
`
