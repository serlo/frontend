import styled from 'styled-components'
import Menu from './headermenu'
import { menudata } from './menudata'
import Logo from './logo'
import { SearchInput } from './searchinput'

export default function Header() {
  return (
    <TopNavWrap>
      <PaddedBox>
        <StyledMenuWrapper links={menudata}></StyledMenuWrapper>
        <Logo subline={'Die freie Lernplattform'} />
      </PaddedBox>
      <SearchInput />
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

const StyledMenuWrapper = styled(Menu)`
  display: none;
  @media screen and (min-width: 52rem) {
    display: block;
  }
`
